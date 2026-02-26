"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  UserProfile,
  UpdateProfileDto,
  SupportRequestDto,
  UserFilterParams,
  IUserProfile,
} from "../model/user.schema";
import { cookies } from "next/headers";

// --- Session ---

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

// --- Profile ---

export async function getProfileAction(): Promise<IUserProfile> {
  const response = await apiClient("/users/user", {
    method: "GET",
  });
  return response.data;
}

export async function getUserByIdAction(id: string): Promise<UserProfile> {
  const response = await apiClient(`/users/user/${id}`, {
    method: "GET",
  });
  return response.data;
}

export async function updateProfileAction(data: UpdateProfileDto): Promise<UserProfile> {
  const response = await apiClient("/users/user/update", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return response.data;
}

// --- Search & Filter ---

export async function searchUsersAction(query: string): Promise<UserProfile[]> {
  const response = await apiClient(`/users/search?q=${encodeURIComponent(query)}`, {
    method: "GET",
  });
  return response.data;
}

export async function filterUsersAction(params: UserFilterParams): Promise<UserProfile[]> {
  const searchParams = new URLSearchParams();
  if (params.name) searchParams.set("name", params.name);
  if (params.status) searchParams.set("status", params.status);
  if (params.role) searchParams.set("role", params.role);

  const response = await apiClient(`/users/filter?${searchParams.toString()}`, {
    method: "GET",
  });
  return response.data;
}

// --- Email Check ---

export async function checkEmailAction(email: string): Promise<{ exists: boolean }> {
  const response = await apiClient(`/users/check/${encodeURIComponent(email)}`, {
    method: "GET",
  });
  return response.data;
}

// --- Support ---

export async function supportRequestAction(data: SupportRequestDto): Promise<void> {
  return apiClient("/users/support", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
