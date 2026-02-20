"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { UserProfile } from "../model/user.schema";
import { cookies } from "next/headers";

export async function refreshSessionAction(): Promise<UserProfile> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  return apiClient(`/users/refreshToken?token=${refreshToken}`, {
    method: "POST",
  });
}

export async function logoutAction(): Promise<void> {
  return apiClient("/users/logout", {
    method: "POST",
  });
}

export async function getProfileAction(): Promise<UserProfile> {
  const response = await apiClient("/users/user", {
    method: "GET",
  });
  return response.data;
}
