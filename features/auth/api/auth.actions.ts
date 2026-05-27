"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetForgottenPasswordDto,
  ResetPasswordDto,
  UserProfile,
} from "@/entities/user/model/user.schema";
import { cookies } from "next/headers";
import { withSafeAction } from "@/shared/lib/safe-action";
import { RequestTokenRequest, ValidateOTPRequest, ValidateOTPResponse, VerificationTokenMethod } from "../types";
import { ApiResponse, MessageResponse } from "@/shared/api/types";




// --- Verify Account ---

export async function verifyEmailAction(payload: { email: string; token: string }) {
  return apiClient("/users/verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Password Operations ---

export async function forgotPasswordAction(data: ForgotPasswordDto) {
  return apiClient("/users/forgot-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resetForgottenPasswordAction(data: ResetForgottenPasswordDto) {
  return apiClient("/users/forgot/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function resetPasswordAction(data: ResetPasswordDto) {
  return apiClient("/users/reset-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function changePasswordAction(data: ChangePasswordDto) {
  return withSafeAction(async () => {
    return apiClient("/users/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }, "Failed to change password");
}

// --- Verification Token ---

export async function requestTokenAction(method: VerificationTokenMethod, payload: RequestTokenRequest) {
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

export async function validateOtpAction(payload: ValidateOTPRequest) {
  return withSafeAction(async () => apiClient<ApiResponse<ValidateOTPResponse>>("/users/validate-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  }), "Failed to validate OTP");
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