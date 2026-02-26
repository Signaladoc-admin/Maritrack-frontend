"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetForgottenPasswordDto,
  ResetPasswordDto,
} from "@/entities/user/model/user.schema";

// --- Existing ---

interface ValidateOtpPayload {
  email: string;
  token: string;
  otp: string;
}

export async function validateOtpAction(payload: ValidateOtpPayload) {
  return apiClient("/users/validate-otp", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// --- Verify Account ---

export async function verifyAccountAction(payload: { email: string; token: string }) {
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
  return apiClient("/users/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// --- Verification Token ---

export async function requestTokenAction(method: string) {
  return apiClient(`/users/request-token/${method}`, {
    method: "POST",
  });
}

export async function resendVerificationAction(method: string) {
  return apiClient(`/users/resend-verification/${method}`, {
    method: "POST",
  });
}
