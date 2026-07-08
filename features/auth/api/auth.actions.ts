"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ChangePasswordDto } from "@/entities/user/model/user.schema";
import { cookies } from "next/headers";
import { withSafeAction } from "@/shared/lib/safe-action";
import {
  ForgotPasswordRequest,
  RefreshTokenResponse,
  RequestTokenRequest,
  ResetPasswordRequest,
  ValidateOTPResponse,
  VerificationTokenMethod,
  VerifyUserRequest,
} from "../types";
import { ApiResponse, MessageResponse } from "@/shared/api/types";
import { UserProfile } from "@/entities/user";

// --- Password Operations ---

export async function changePasswordAction(data: ChangePasswordDto) {
  return withSafeAction(async () => {
    return apiClient("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }, "Failed to change password");
}

export async function forgotPasswordAction(payload: ForgotPasswordRequest) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<MessageResponse>>("/users/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to request password reset"
  );
}
export async function resetForgottenPasswordAction(payload: ResetPasswordRequest) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<MessageResponse>>("/users/forgot/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to reset forgotten password"
  );
}
export async function resetPasswordAction(payload: ResetPasswordRequest) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<ValidateOTPResponse>>("/users/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to reset password"
  );
}

// --- Verification Token ---

export async function requestTokenAction(
  method: VerificationTokenMethod = "email",
  payload: RequestTokenRequest
) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<MessageResponse>>(`/users/request-token/${method}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to request token"
  );
}

export async function resendVerificationAction(
  method: VerificationTokenMethod = "email",
  payload: RequestTokenRequest
) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<MessageResponse>>(`/users/resend-verification/${method}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to resend verification"
  );
}

export async function verifyUserAction(payload: VerifyUserRequest) {
  return withSafeAction(
    async () =>
      apiClient<ApiResponse<MessageResponse>>(`/users/verify`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    "Failed to verify user"
  );
}

export async function logoutAction() {
  return withSafeAction(async () => {
    const cookieStore = await cookies();

    await apiClient("/users/logout", {
      method: "POST",
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("isOnboarded");
    cookieStore.delete("isEmailVerified");
    cookieStore.delete("zoneId");

    return { success: true };
  }, "Failed to logout");
}

export async function refreshAccessTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return withSafeAction(async () => {
    return apiClient<ApiResponse<RefreshTokenResponse>>("/users/refreshToken", {
      method: "POST",
      skipAuth: true,
      params: { token: refreshToken },
    });
  }, "Failed to refresh access token");
}

export async function getSessionAction(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value || cookieStore.get("refreshToken")?.value;

  if (!token) return null;

  try {
    const response = await apiClient("/users/user", {
      method: "GET",
      noRedirect: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
