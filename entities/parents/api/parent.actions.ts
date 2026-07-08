"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ParentProfile,
  CreateParentDto,
  UpdateParentDto,
  ParentFilterParams,
} from "../schema";

export async function createParentAction(data: CreateParentDto): Promise<ParentProfile> {
  const response = await apiClient("/parents", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function getParentsAction(params?: ParentFilterParams): Promise<ParentProfile[]> {
  const searchParams = new URLSearchParams();
  if (params?.name) searchParams.set("name", params.name);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/parents?${queryString}` : "/parents";

  const response = await apiClient(endpoint, {
    method: "GET",
  });
  return response.data;
}

export async function getParentByIdAction(id: string): Promise<ParentProfile> {
  const response = await apiClient(`/parents/${id}`, {
    method: "GET",
  });
  return response.data;
}

export async function updateParentAction(
  id: string,
  data: UpdateParentDto
): Promise<{ status: boolean; message: string; data: ParentProfile }> {
  return apiClient(`/parents/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteParentAction(id: string): Promise<void> {
  return apiClient(`/parents/${id}`, {
    method: "DELETE",
  });
}
