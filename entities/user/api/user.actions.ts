"use server";

import { apiClient } from "@/shared/lib/api-client";
import { cookies } from "next/headers";
import type {
  UpdateProfileDto,
  SupportRequestDto,
  UserFilterParams,
} from "../model/user.schema";
import { UserDetails, UserProfile } from "../model/types";
import { ApiResponse, MessageResponse } from "@/shared/api/types";
import { withSafeAction } from "@/shared/lib/safe-action";

// --- Profile ---

export async function getProfileAction(): Promise<UserProfile | null> {
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

export async function getUserByIdAction(id: string) {
  return withSafeAction(async () => {
    const response = await apiClient<ApiResponse<UserDetails>>(`/users/user/${id}`, {
      method: "GET",
    });
    return response.data;
  }, "Failed to get user details")
}

export async function updateProfileAction(data: UpdateProfileDto): Promise<ApiResponse<MessageResponse>> {
  const formData = new FormData();
  if (data.firstName) formData.append("firstName", data.firstName);
  if (data.lastName) formData.append("lastName", data.lastName);
  if (data.phone) formData.append("phone", data.phone);
  if (data.status) formData.append("status", data.status);
  if (data.imageUrl) {
    formData.append("imageUrl", data.imageUrl);
  } else if (data.profilePicture instanceof File) {
    formData.append("profilePicture", data.profilePicture);
  }

  const response = await apiClient("/users/user/update", {
    method: "PATCH",
    body: formData,
  });
  console.log(response)
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

export async function checkIfEmailExistsAction(email: string): Promise<boolean> {
  const response = await apiClient(`/users/check/${encodeURIComponent(email)}`, {
    method: "GET",
  });
  return response.message.toLowerCase().includes("email exists");
}
