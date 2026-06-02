import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetStaffMembers } from "./useStaffMembers";

export function useAllTeamMembers(params?: { search: string }) {
  const { data: staffMembers } = useGetStaffMembers(params);

  const allTeamMembers = staffMembers?.data?.staff?.map((member) => ({
    id: member.id,
    email: member?.user?.email || "",
    location: member?.location || "",
  }));

  return { allTeamMembers };
}

export function useOtherTeamMembers(params?: { search: string }) {
  const { data: staffMembersData, isLoading } = useGetStaffMembers(params);
  const { user } = useAuth();
  const staffMembers = staffMembersData?.data?.staff || [];

  const otherTeamMembers = staffMembers?.filter((member) => member?.user?.email !== user?.email);

  return { otherTeamMembers, isLoading };
}

export function useOtherStaffMembersExceptStaff({
  excludeUserId,
  ...params
}: {
  excludeUserId: string;
  search?: string;
}) {
  const { data: staffMembersData, isLoading } = useGetStaffMembers(params);
  const staffMembers = staffMembersData?.data?.staff || [];
  const otherTeamMembers = staffMembers?.filter((member) => member?.user?.id !== excludeUserId);

  return { otherTeamMembers, isLoading };
}
