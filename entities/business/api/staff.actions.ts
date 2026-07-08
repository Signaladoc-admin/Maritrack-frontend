import { BusinessRole } from "@/entities/user/model/user.schema";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { BusinessStaff, StaffMemberFiltersRequest, StaffMembersPaginatedResponse } from "../types";
import { ActionResult, ApiResponse, MessageResponse } from "@/shared/api/types";
import { UpdateStaffMemberValues } from "@/features/onboarding/business/schema";

export async function getStaffMembersAction(options?: StaffMemberFiltersRequest) {
  return withSafeAction(async () => {
    const params = {
      ...(options?.businessId && { businessId: options.businessId }),
      ...(options?.search && { search: options.search }),
      ...(options?.role && { role: options.role }),
      ...(options?.status && { status: options.status }),
      ...(options?.page && { page: options.page }),
      ...(options?.limit && { limit: options.limit }),
    };

    const res = await apiClient<StaffMembersPaginatedResponse>(`/staff`, {
      method: "GET",
      noRedirect: true,
      params: params as Record<string, string>,
    });
    return res;
  }, "Failed to get staff members");
}
export async function getStaffMemberAction(id: string | null) {
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
}): Promise<ActionResult<ApiResponse<MessageResponse>>> {
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
    return res;
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
    return res;
  }, "Failed to create staff member");
}

export async function updateStaffMemberAction(
  id: string,
  data: UpdateStaffMemberValues
): Promise<ActionResult<ApiResponse<MessageResponse>>> {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
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
