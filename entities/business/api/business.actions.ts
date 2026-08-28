"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { ApiResponse, CreatedItemResponse, QueryOptions } from "@/shared/api/types";
import { Business, RegisterBusinessRequest } from "../types";
import { UpdateBusinessDto } from "../schema";

export async function getBusinessesAction(params?: QueryOptions): Promise<Business[]> {
  const searchParams = new URLSearchParams();
  if (params?.name) searchParams.set("name", params.name);

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/businesses?${queryString}` : "/businesses";

  const response = await apiClient(endpoint, {
    method: "GET",
  });
  return response.data;
}

export async function getBusinessAction(id: string, token?: string) {
  try {
    const res = await apiClient<ApiResponse<Business>>(`/businesses/${id}`, {
      method: "GET",
      noRedirect: true,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error };
  }
}
export async function createBusinessAction(data: RegisterBusinessRequest) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<CreatedItemResponse>>(`/businesses`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to create business");
}

export async function deleteBusinessAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/businesses/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete business");
}

export async function updateBusinessAction({
  id,
  ...data
}: UpdateBusinessDto & { id: string }): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/businesses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to update business");
}

export async function getBusinessProfileAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/business-profiles/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get business");
}
export async function createBusinessProfileAction({
  ...data
}: {
  profile: string;
  type?: string;
  departments?: string[];
  locations?: string[];
}): Promise<any> {
  return withSafeAction(async () => {
    
    const res = await apiClient(`/business-profiles`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to create business profile");
}

export async function updateBusinessProfileAction({
  id,
  ...data
}: {
  id: string;
  profile?: string;
  type?: string;
  departments?: string[];
  locations?: string[];
}): Promise<any> {
  return withSafeAction(async () => {
    
    const res = await apiClient(`/business-profiles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to update business profile");
}

export async function deleteBusinessProfileAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/business-profiles/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete business profile");
}
