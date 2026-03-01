"use server";

import { apiClient } from "@/shared/lib/api-client";
import type {
  ParentalControlDto,
  ParentalControlResponse,
} from "../model/parental-controls.schema";

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
  id: string,
  data: Partial<ParentalControlDto>
): Promise<ParentalControlResponse> {
  const response = await apiClient(`/parental-controls/${id}`, {
    method: "PATCH",
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
