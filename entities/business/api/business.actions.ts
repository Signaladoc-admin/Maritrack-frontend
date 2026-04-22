"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function getBusinessAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/businesses/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get business");
}
export async function createBusinessAction(data: any): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/businesses`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res.data ?? res;
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
}: {
  id: string;
  name: string;
  email: string;
  address: string;
  state: string;
  country: string;
  organizationSize: string;
  estimatedDevices: number;
}): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/businesses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res.data ?? res;
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
