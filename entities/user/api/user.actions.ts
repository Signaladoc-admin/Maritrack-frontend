"use server";

import { apiClient } from "@/shared/lib/api-client";
import { cookies } from "next/headers";
import type {
  UserProfile,
  UpdateProfileDto,
  SupportRequestDto,
  UserFilterParams,
  IUserProfile,
} from "../model/user.schema";

// --- Profile ---

export async function getProfileAction(): Promise<IUserProfile | null> {
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

export async function getUserByIdAction(id: string): Promise<UserProfile> {
  const response = await apiClient(`/users/user/${id}`, {
    method: "GET",
  });
  return response.data;
}

export async function updateProfileAction(data: UpdateProfileDto): Promise<UserProfile> {
  const formData = new FormData();
  if (data.firstName) formData.append("firstName", data.firstName);
  if (data.lastName) formData.append("lastName", data.lastName);
  if (data.phone) formData.append("phone", data.phone);
  if (data.status) formData.append("status", data.status);
  if (data.profilePicture instanceof File) {
    formData.append("profilePicture", data.profilePicture);
  } else if (typeof data.profilePicture === "string") {
    formData.append("profilePicture", data.profilePicture);
  }

  const response = await apiClient("/users/user/update", {
    method: "PATCH",
    body: formData,
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
