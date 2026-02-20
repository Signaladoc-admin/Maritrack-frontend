"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { RegisterValues, UserProfile } from "@/entities/user/model/user.schema";

export async function registerAction(data: RegisterValues): Promise<UserProfile> {
  return apiClient("/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
