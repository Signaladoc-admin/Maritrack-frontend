"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ChildProfile, CreateChildDto, UpdateChildDto } from "../schema";
import { Child } from "@/features/child-profile/model/types";
import { ApiResponse, MessageResponse } from "@/shared/api/types";

export async function createChildAction(data: CreateChildDto) {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.age !== undefined) formData.append("age", String(data.age));
  if (data.gender) formData.append("gender", data.gender);
  if (data.parentId) formData.append("parentId", data.parentId);
  if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
  if (data.profilePicture instanceof File) formData.append("profilePicture", data.profilePicture);

  const response = await apiClient<ApiResponse<MessageResponse>>("/children", {
    method: "POST",
    body: formData,
  });
  return response.data;
}

export async function getChildrenAction(): Promise<Child[]> {
  const endpoint = "/children/parent";
  const response = await apiClient(endpoint, {
    method: "GET",
  });
  return response.data;
}

export async function getChildByIdAction(id: string): Promise<Child> {
  const response = await apiClient(`/children/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  return response.data;
}

export async function updateChildAction(id: string, data: UpdateChildDto): Promise<ChildProfile> {
  // Use FormData so an updated profile picture (a File) can be uploaded. Only append
  // the fields that are present so the PATCH stays partial.
  const formData = new FormData();
  if (data.name !== undefined) formData.append("name", data.name);
  if (data.age !== undefined) formData.append("age", String(data.age));
  if (data.gender !== undefined) formData.append("gender", data.gender);
  if (data.profilePicture instanceof File) formData.append("profilePicture", data.profilePicture);

  const response = await apiClient(`/children/${id}`, {
    method: "PATCH",
    body: formData,
  });
  return response.data;
}

export async function deleteChildAction(id: string): Promise<void> {
  return apiClient(`/children/${id}`, {
    method: "DELETE",
  });
}
