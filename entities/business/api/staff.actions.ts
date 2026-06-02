import { BusinessRole } from "@/entities/user/model/user.schema";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { BusinessStaff, StaffMemberFiltersRequest } from "../types";
import { ApiResponse, PaginatedResponse } from "@/shared/api/types";

export async function getStaffMembersAction(options?: StaffMemberFiltersRequest) {
  return withSafeAction(async () => {
    const res = await apiClient<PaginatedResponse<{
      staff: BusinessStaff[]
    }>>(`/staff`, {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string>,
    });
    return res;
  }, "Failed to get staff members");
}
export async function getStaffMemberAction(id: string) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<BusinessStaff>>(`/staff/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get staff member");
}

export async function createStaffMemberAction({
  email,
  location,
  ...rest
}: {
  // Required fields (for when inviting via email)
  email: string;
  location: string;

  // Optional fields (for when user fills up their profile)
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  role?: string;
  position?: string;
  departmentId: string;
}) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff`, {
      method: "POST",
      body: JSON.stringify({
        email,
        location,
        ...rest,
      }),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to create staff member");
}

export async function createStaffsBulkAction(
  data: {
    email: string;
    firstName?: string;
    lastName?: string;
    businessRole?: BusinessRole;
    location: string;
    position?: string;
    departmentId?: string;
    phone?: string;
  }[]
) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/multiple`, {
      method: "POST",
      body: JSON.stringify({
        staff: data,
      }),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to create staff member");
}

export async function updateStaffMemberAction(
  id: string,
  {
    email,
    location,
  }: {
    email: string;
    location: string;
  }
) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ email, location }),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to update staff member");
}

export async function deleteStaffMemberAction(id: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete staff member");
}
