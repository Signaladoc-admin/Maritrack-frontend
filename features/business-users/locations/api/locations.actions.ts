"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { UpdateLocationDto, CreateLocationDto } from "../types";

export async function getAllLocationsAction(filters: {
  search?: string;
  businessId: string;
  name?: string;
  mdmLocationId?: string;
  zone?: string;
  page?: string;
  sort?: string;
  limit?: string;
}): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(
      `/locations?${new URLSearchParams({
        businessId: filters.businessId,
        ...(filters.search && { search: filters.search }),
        ...(filters.name && { name: filters.name }),
        ...(filters.mdmLocationId && { mdmLocationId: filters.mdmLocationId }),
        ...(filters.zone && { zone: filters.zone }),
        ...(filters.page && { page: filters.page }),
        ...(filters.sort && { sort: filters.sort }),
        ...(filters.limit && { limit: filters.limit }),
      })}`,
      {
        method: "GET",
        noRedirect: true,
      }
    );
    return res.data ?? res;
  }, "Failed to get locations");
}
export async function getLocationAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/locations/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get location");
}
export async function createLocationAction(data: CreateLocationDto): Promise<any> {
  return withSafeAction(
    async () =>
      await apiClient(`/locations`, {
        method: "POST",
        body: JSON.stringify(data),
        noRedirect: true,
      }),
    "Failed to create location"
  );
}

export async function deleteLocationAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/locations/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete location");
}

export async function updateLocationAction({
  id,
  ...data
}: UpdateLocationDto & { id: string }): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/locations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to update location");
}
