"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { UpdateDepartmentDto, CreateDepartmentDto } from "../types";

export async function getAllDepartmentsAction(filters?: {
  search?: string;
  businessId?: string;
  name?: string;
  mdmDepartmentId?: string;
  zone?: string;
  page?: string | number;
  sort?: string;
  limit?: string | number;
}): Promise<any> {
  return withSafeAction(async () => {
    const params = new URLSearchParams();
    if (filters?.businessId && filters.businessId !== "undefined") {
      params.append("businessId", filters.businessId);
    }
    if (filters?.search) params.append("search", filters.search);
    if (filters?.name) params.append("name", filters.name);
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.limit) params.append("limit", String(filters.limit));

    const queryString = params.toString();
    const endpoint = `/departments${queryString ? `?${queryString}` : ""}`;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
      const res = await apiClient(endpoint, {
        method: "GET",
        noRedirect: true,
      });

      // console.log("[getAllDepartmentsAction] Response:", res);
      // console.log("[getAllDepartmentsAction] Full Response JSON:\n", JSON.stringify(res, null, 2));

      return res.data ?? res;
    } catch (err: any) {
      // console.error("[getAllDepartmentsAction] Error:", {
      //   endpoint,
      //   url: fullUrl,
      //   error: err?.message || err,
      //   status: err?.status,
      //   responseData: err?.responseData,
      // });
      throw err;
    }
  }, "Failed to get department");
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
  const path = `/departments`;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const fullUrl = `${baseUrl}${path}`;

  // In Swagger spec, CreateDepartmentDto only accepts { name: string }.
  // Sending extra unexpected fields (e.g. zone: "", businessId) causes backend unhandled exceptions.
  const payload: { name: string } = {
    name: data.name,
  };

  const requestDetails = {
    path,
    url: fullUrl,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  };

  // console.log("createDepartmentAction Request:", requestDetails);

  return withSafeAction(async () => {
    try {
      const res = await apiClient(path, {
        method: "POST",
        body: JSON.stringify(payload),
        noRedirect: true,
      });
      // console.log("createDepartmentAction Response:", res);
      return res;
    } catch (error: any) {
      // console.error("createDepartmentAction Error:", {
      //   path,
      //   url: fullUrl,
      //   error: error?.message || error,
      //   status: error?.status,
      //   responseData: error?.responseData,
      // });
      throw error;
    }
  }, "Failed to create department");
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
    const payload: { name?: string } = {
      name: data.name,
    };
    const res = await apiClient(`/departments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      noRedirect: true,
    });
    return res;
  }, "Failed to update department");
}
