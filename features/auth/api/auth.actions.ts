"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ChangePasswordDto,
} from "@/entities/user/model/user.schema";
import { cookies } from "next/headers";
import { withSafeAction } from "@/shared/lib/safe-action";
import { ForgotPasswordRequest, RequestTokenRequest, ResetPasswordRequest, ValidateOTPRequest, ValidateOTPResponse, VerificationTokenMethod, VerifyUserRequest } from "../types";
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
  return withSafeAction(async () => apiClient<ApiResponse<MessageResponse>>("/users/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to request password reset");
}
export async function resetForgottenPasswordAction(payload: ResetPasswordRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<MessageResponse>>("/users/forgot/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to reset forgotten password");
}
export async function resetPasswordAction(payload: ResetPasswordRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<ValidateOTPResponse>>("/users/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to reset password");
}

// --- Verification Token ---

export async function requestTokenAction(method: VerificationTokenMethod = 'email', payload: RequestTokenRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<MessageResponse>>(`/users/request-token/${method}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to request token");
}

export async function resendVerificationAction(method: VerificationTokenMethod = 'email', payload: RequestTokenRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<MessageResponse>>(`/users/resend-verification/${method}`, {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to resend verification");
}

export async function verifyUserAction(payload: VerifyUserRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<MessageResponse>>(`/users/verify`, {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to verify user");
}

export async function validateOtpAction(payload: ValidateOTPRequest) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<ValidateOTPResponse>>("/users/validate-otp", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    // NUDGE: Remove justVerified temporary bypass once isEmailVerified is correctly handled on backend
    const cookieStore = await cookies();
    cookieStore.set("justVerified", "true", { maxAge: 60, path: "/" });

    return res
  }, "Failed to validate OTP");
}


export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    await apiClient("/users/logout", {
      method: "POST",
    });
  } catch (error) {
    console.error("Backend logout failed:", error);
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("isOnboarded");
  cookieStore.delete('isEmailVerified');
  cookieStore.delete("userMeta");

  return { success: true };
}

export async function refreshAccessTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  return withSafeAction(async () => {
    return apiClient("/users/refreshToken", {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
      noRedirect: true,
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