"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { UpdateBusinessDto } from "../schema";
import { ApiResponse, QueryOptions } from "@/shared/api/types";
import { Business } from "../types";
import { requestTokenAction } from "@/features/auth/api/auth.actions";

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

export async function getBusinessAction(id: string) {
  try {
    const res = await apiClient<ApiResponse<Business>>(`/businesses/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return { success: true, data: res };
  } catch (error) {
    return { success: false, error };
  }
}
export async function createBusinessAction(data: any): Promise<any> {
  return withSafeAction(async () => {
    const registerRes = await apiClient(`/businesses`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });

    if (!registerRes.status) throw new Error(registerRes.message || 'Registration failed')

    const requestTokenRes = await requestTokenAction('email', { email: data.email })
    if (!requestTokenRes) throw new Error("Request token failed")

    if (!requestTokenRes.success) {
      throw new Error(requestTokenRes.error);
    }

    return { ...requestTokenRes, status: true, data: requestTokenRes.data }
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
  profile: string;
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
