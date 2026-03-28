"use server";

import { ActionResult } from "@/shared/api/types";
import { apiClient } from "@/shared/lib/api-client";

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
export async function getParentChildrenAction(): Promise<ActionResult<any>> {
  try {
    const response = await apiClient("/children/parent", {
      method: "GET",
    });
    return { success: true, data: response.data };
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
