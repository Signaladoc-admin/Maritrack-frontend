"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { UserProfile } from "@/entities/user/model/user.schema";

export async function registerParentAction(data: FormData) {
  return withSafeAction<UserProfile>(
    () => apiClient("/users/register/parent", { method: "POST", body: data }),
    "Registration failed. Please try again."
  );
}
