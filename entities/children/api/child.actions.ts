"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ChildProfile, CreateChildDto, UpdateChildDto, ChildFilterParams } from "../schema";

export async function createChildAction(data: CreateChildDto): Promise<ChildProfile> {
  const response = await apiClient("/children", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function getChildrenAction(params?: ChildFilterParams): Promise<ChildProfile[]> {
  const searchParams = new URLSearchParams();
  if (params?.parentId) searchParams.set("parentId", params.parentId);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/children?${queryString}` : "/children";

  const response = await apiClient(endpoint, {
    method: "GET",
  });
  return response.data;
}

export async function getChildByIdAction(id: string): Promise<ChildProfile> {
  const response = await apiClient(`/children/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  return response.data;
}

export async function updateChildAction(id: string, data: UpdateChildDto): Promise<ChildProfile> {
  const response = await apiClient(`/children/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function deleteChildAction(id: string): Promise<void> {
  return apiClient(`/children/${id}`, {
    method: "DELETE",
  });
}
