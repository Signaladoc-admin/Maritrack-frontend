"use server";

import { ActionResult, ApiResponse } from "@/shared/api/types";
import { apiClient } from "@/shared/lib/api-client";
import { Child } from "../model/types";

export async function getChildrenAction(): Promise<ActionResult<any>> {
  try {
    const response = await apiClient("/children", {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch children" };
  }
}
export async function getParentChildrenAction() {
  try {
    const response = await apiClient<ApiResponse<{ children: Child[] }>>("/children/parent", {
      method: "GET",
    });
    return { success: true, data: response.data.children };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch children" };
  }
}

export async function getChildAction(childId: string): Promise<ActionResult<any>> {
  try {
    const response = await apiClient(`/children/${childId}`, {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch child" };
  }
}

export async function updateChildAction(
  childId: string,
  data: { name?: string; age?: number; gender?: string; profilePicture?: File }
): Promise<ActionResult<any>> {
  try {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.age !== undefined) formData.append("age", String(data.age));
    if (data.gender) formData.append("gender", data.gender);
    if (data.profilePicture instanceof File)
      formData.append("profilePicture", data.profilePicture);

    const response = await apiClient(`/children/${childId}`, {
      method: "PATCH",
      body: formData,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update child" };
  }
}

export async function deleteChildAction(childId: string): Promise<ActionResult<void>> {
  try {
    await apiClient(`/children/${childId}`, {
      method: "DELETE",
    });
    return { success: true, data: undefined };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete child" };
  }
}
