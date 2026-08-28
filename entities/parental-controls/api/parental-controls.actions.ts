"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ParentalControlDto,
  ParentalControlResponse,
} from "../model/parental-controls.schema";
import { ApiResponse } from "@/shared/api/types";

export async function createParentalControlAction(
  data: ParentalControlDto
): Promise<ParentalControlResponse> {
  const response = await apiClient("/parental-controls", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function updateParentalControlAction(
  data: Partial<ParentalControlDto>
): Promise<ParentalControlResponse> {
  const response = await apiClient(`/parental-controls`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.data;
}

export async function getParentalControlByParentIdAction(
  parentId: string
): Promise<ParentalControlResponse> {
  const response = await apiClient(`/parental-controls/parent/${parentId}`, {
    method: "GET",
  });
  return response.data;
}

export async function getMdmPolicyByParentIdAction(parentId: string): Promise<any> {
  const response = await apiClient(`/parental-controls/policy/${parentId}`, {
    method: "GET",
  });
  return response.data;
}

export async function getParentalControlMeAction(token?: string) {
  try {
    const response = await apiClient<ApiResponse<ParentalControlResponse>>("/parental-controls/me", {
      method: "GET",
      noRedirect: true,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
}
