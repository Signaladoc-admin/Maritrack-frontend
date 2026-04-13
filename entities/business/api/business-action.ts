"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { BusinessProfile } from "../types";

export async function getBusinessProfileAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/business-profiles/${id}`, {
      method: "GET",
      noRedirect: true,
    }) as Promise<BusinessProfile>;
  }, "Failed to get business profile");
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

export async function updateBusinessAction({
  id,
  ...data
}: {
  id: string;
  name: string;
  email: string;
  estimatedDevices: number;
  country: string;
  state: string;
}): Promise<any> {
  return withSafeAction(async () => {
    return apiClient(`/businesses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
  }, "Failed to update business");
}
