"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function getBusinessAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/businesses/${id}`, {
      method: "GET",
      noRedirect: true,
    });
  }, "Failed to get business");
}
export async function createBusinessAction(data: any): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/businesses`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
  }, "Failed to create business");
}

export async function deleteBusinessAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/businesses/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
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
    return apiClient(`/businesses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
  }, "Failed to update business");
}

export async function createBusinessProfileAction({
  ...data
}: {
  profile: string;
  departments?: string[];
  locations?: string[];
}): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/business-profiles`, {
      method: "POST",
      body: JSON.stringify(data),
      noRedirect: true,
    });
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
    return apiClient(`/business-profiles/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
  }, "Failed to update business profile");
}
