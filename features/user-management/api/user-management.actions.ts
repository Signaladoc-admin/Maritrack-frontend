"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { UserProfile, AdminUpdateProfileDto } from "@/entities/user/model/user.schema";
import type { ActionResult, QueryOptions } from "@/shared/api/types";

// --- CRUD Actions (conforming to ResourceActions interface) ---

export async function getAllUsersAction(
  options?: QueryOptions
): Promise<ActionResult<UserProfile[]>> {
  try {
    const searchParams = new URLSearchParams();
    if (options?.page) searchParams.set("page", String(options.page));
    if (options?.limit) searchParams.set("limit", String(options.limit));
    if (options?.search) searchParams.set("search", options.search);

    const qs = searchParams.toString();
    const response = await apiClient(`/users/all-users${qs ? `?${qs}` : ""}`, {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch users" };
  }
}

export async function getUserByIdAction(id: string): Promise<ActionResult<UserProfile>> {
  try {
    const response = await apiClient(`/users/user/${id}`, {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch user" };
  }
}

export async function adminUpdateUserAction(
  id: string,
  data: AdminUpdateProfileDto
): Promise<ActionResult<UserProfile>> {
  try {
    const response = await apiClient(`/users/user/admin/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update user" };
  }
}

export async function adminDeleteUserAction(id: string): Promise<ActionResult<void>> {
  try {
    await apiClient(`/users/admin-delete/${id}`, {
      method: "DELETE",
    });
    return { success: true, data: undefined };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete user" };
  }
}

// --- Additional Admin Actions ---

export async function deleteUserAction(id: string): Promise<ActionResult<void>> {
  try {
    await apiClient(`/users/delete/${id}`, {
      method: "DELETE",
    });
    return { success: true, data: undefined };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to delete user" };
  }
}

export async function initiateDeleteAction(id: string): Promise<ActionResult<void>> {
  try {
    await apiClient(`/users/initiate-delete/${id}`, {
      method: "DELETE",
    });
    return { success: true, data: undefined };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to initiate deletion" };
  }
}

export async function deactivateUserAction(id: string): Promise<ActionResult<void>> {
  try {
    const response = await apiClient(`/users/deactivate-user/${id}`, {
      method: "GET",
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to deactivate user" };
  }
}
