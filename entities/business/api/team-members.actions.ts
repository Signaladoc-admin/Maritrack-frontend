import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";

export async function createTeamMember({ email, location }: { email: string; location: string }) {
  return withSafeAction(async () => {
    return apiClient(`/team-members`, {
      method: "POST",
      body: JSON.stringify({ email, location }),
      noRedirect: true,
    });
  }, "Failed to create team member");
}

export async function createTeamMembers(data: { email: string; location: string }[]) {
  return withSafeAction(async () => {
    return apiClient(`/staff/multiple`, {
      method: "POST",
      body: JSON.stringify({
        staff: data,
      }),
      noRedirect: true,
    });
  }, "Failed to create team members");
}
