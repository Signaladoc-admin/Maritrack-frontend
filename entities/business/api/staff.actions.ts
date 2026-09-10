"use server";

import { BusinessRole } from "@/entities/user/model/user.schema";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { BusinessStaff, StaffMemberFiltersRequest, StaffMembersPaginatedResponse } from "../types";
import { ActionResult, ApiResponse, MessageResponse } from "@/shared/api/types";
import { UpdateStaffMemberValues } from "@/features/onboarding/business/schema";
import { getBusinessAction } from "./business.actions";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { AuthUserProfile } from "@/entities/user";

async function getStaffEndpoint(businessId?: string): Promise<string> {
  let id = businessId;
  if (!id) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (token) {
      try {
        const decoded = jwtDecode<AuthUserProfile>(token);
        id = decoded.businessId || undefined;
      } catch (e) {}
    }
  }

  if (id) {
    const res = await getBusinessAction(id);
    if (res.success) {
      const business = res.data?.data;

      if (business?.profile && (business.profile as any).type === "DEVICE_FINANCING") {
        return "/device-finance-user";
      }
    }
  }
  return "/staff";
}

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

    const baseEndpoint = await getStaffEndpoint(options?.businessId);

    const res = await apiClient<StaffMembersPaginatedResponse>(`${baseEndpoint}`, {
      method: "GET",
      noRedirect: true,
      params: params as Record<string, string>,
    });
    return res;
  }, "Failed to get staff members");
}
export async function getStaffMemberAction(id: string | null) {
  return withSafeAction(async () => {
    const baseEndpoint = await getStaffEndpoint();
    const res = await apiClient<ApiResponse<BusinessStaff>>(`${baseEndpoint}/${id}`, {
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
    const baseEndpoint = await getStaffEndpoint();
    const isDeviceFinance = baseEndpoint === "/device-finance-user";
    
    // For device finance user, we just send the fields directly. 
    // The dto requires email, firstName, lastName, location.
    const payload = isDeviceFinance 
      ? { email, location, firstName: rest.firstName || "N/A", lastName: rest.lastName || "N/A", ...rest }
      : { email, location, ...rest };

    const res = await apiClient(`${baseEndpoint}`, {
      method: "POST",
      body: JSON.stringify(payload),
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
    const baseEndpoint = await getStaffEndpoint();
    const isDeviceFinance = baseEndpoint === "/device-finance-user";
    
    // device-finance-user requires 'deviceFinanceUsers' array, staff requires 'staff' array.
    // Also, DeviceFinanceUser requires firstName and lastName
    const formattedData = data.map(item => ({
      ...item,
      firstName: item.firstName || "N/A",
      lastName: item.lastName || "N/A"
    }));

    const payload = isDeviceFinance 
      ? { deviceFinanceUsers: formattedData } 
      : { staff: data };

    const res = await apiClient(`${baseEndpoint}/multiple`, {
      method: "POST",
      body: JSON.stringify(payload),
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
    const baseEndpoint = await getStaffEndpoint();
    const res = await apiClient(`${baseEndpoint}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      noRedirect: true,
    });
    return res;
  }, "Failed to update staff member");
}

export async function deleteStaffMemberAction(id: string) {
  return withSafeAction(async () => {
    const baseEndpoint = await getStaffEndpoint();
    const res = await apiClient(`${baseEndpoint}/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete staff member");
}
