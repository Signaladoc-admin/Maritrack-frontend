"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { requestTokenAction } from "@/features/auth/api/auth.actions";
import { ApiResponse, CreatedItemResponse } from "@/shared/api/types";

export async function registerParentAction(data: FormData) {
  return withSafeAction(async () => {
    const registerRes = await apiClient<ApiResponse<CreatedItemResponse>>("/users/register/parent", {
      method: "POST",
      body: data,
    });
    if (!registerRes.status) throw new Error(registerRes.message || 'Registration failed')

    const email = String(data.get('email') ?? '')
    const requestTokenRes = await requestTokenAction('email', { email })

    if (!requestTokenRes.success) {
      throw new Error(requestTokenRes.error);
    }

    return registerRes.data
  }, "Registration failed");
}
