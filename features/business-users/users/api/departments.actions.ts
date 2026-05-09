"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { UpdateDepartmentDto, CreateDepartmentDto } from "../types";

export async function getAllDepartmentsAction(filters: {
  search?: string;
  businessId: string;
  name?: string;
  mdmDepartmentId?: string;
  zone?: string;
  page?: string;
  sort?: string;
  limit?: string;
}): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(
      `/departments?${new URLSearchParams({
        businessId: filters.businessId,
        ...(filters.search && { search: filters.search }),
        ...(filters.name && { name: filters.name }),
        ...(filters.mdmDepartmentId && { mdmDepartmentId: filters.mdmDepartmentId }),
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
  }, "Failed to get departments");
}
export async function getDepartmentAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/departments/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get department");
}
export async function createDepartmentAction(data: CreateDepartmentDto): Promise<any> {
  return withSafeAction(
    async () =>
      await apiClient(`/departments`, {
        method: "POST",
        body: JSON.stringify(data),
        noRedirect: true,
      }),
    "Failed to create department"
  );
}

export async function deleteDepartmentAction(id: string): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/departments/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete department");
}

export async function updateDepartmentAction({
  id,
  ...data
}: UpdateDepartmentDto & { id: string }): Promise<any> {
  return withSafeAction(async () => {
    const res = await apiClient(`/departments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to update department");
}
