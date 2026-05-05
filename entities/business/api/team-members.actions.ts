import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function getTeamMembersAction(options?: {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  businessId?: string;
  position?: string;
}) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff`, {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string>,
    });
    return res.data ?? res;
  }, "Failed to get team members");
}
export async function getTeamMemberAction(id: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/${id}`, {
      method: "GET",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to get team member");
}

export async function createTeamMemberAction({
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
  }, "Failed to create team member");
}

export async function createTeamMembersAction(data: { email: string; location: string }[]) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/multiple`, {
      method: "POST",
      body: JSON.stringify({
        staff: data,
      }),
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to create team members");
}

export async function updateTeamMemberAction(
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
  }, "Failed to update team member");
}

export async function deleteTeamMemberAction(id: string) {
  return withSafeAction(async () => {
    const res = await apiClient(`/staff/${id}`, {
      method: "DELETE",
      noRedirect: true,
    });
    return res.data ?? res;
  }, "Failed to delete team member");
}
