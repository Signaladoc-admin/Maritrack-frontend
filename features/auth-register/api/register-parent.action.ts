"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { UserProfile } from "@/entities/user/model/user.schema";

export async function registerParentAction(data: FormData): Promise<UserProfile> {
  return apiClient("/users/register/parent", {
    method: "POST",
    body: data,
  });
}
