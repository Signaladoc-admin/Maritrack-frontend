"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { RegisterValues, UserProfile } from "@/entities/user/model/user.schema";
import { ApiResponse } from "@/shared/api/types";
import { requestTokenAction } from "@/features/auth/api/auth.actions";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function registerAction(data: RegisterValues) {
  return withSafeAction(async () => {
    const registerRes = await apiClient<ApiResponse<UserProfile>>("/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!registerRes.status) throw new Error(registerRes.message || 'Registration failed')

    const requestTokenRes = await requestTokenAction('email', { email: data.email })
    if (!requestTokenRes) throw new Error("Request token failed")

    if (!requestTokenRes.success) {
      throw new Error(requestTokenRes.error);
    }
    
    return { ...requestTokenRes, status: true, data: requestTokenRes.data }
  }, "Registration failed");
}
