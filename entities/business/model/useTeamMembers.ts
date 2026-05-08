import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetStaffMembers } from "./useStaffMembers";

export function useAllTeamMembers() {
  const { data: staffMembers } = useGetStaffMembers();

  const allTeamMembers = staffMembers?.staff?.map((member) => ({
    id: member.id,
    email: member?.user?.email || "",
    location: member?.location || "",
  }));

  return { allTeamMembers };
}

export function useOtherTeamMembers() {
  const { allTeamMembers } = useAllTeamMembers();
  const { user } = useAuth(); // get user email to filter it out from the list of staff members

  const otherTeamMembers = allTeamMembers?.filter((member) => member.email !== user?.email);

  return { otherTeamMembers };
}
