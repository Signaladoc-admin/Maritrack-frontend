"use server";

import { apiClient } from "@/shared/lib/api-client";

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
