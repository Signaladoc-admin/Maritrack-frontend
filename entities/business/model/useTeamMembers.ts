import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetStaffMembers } from "./useStaffMembers";

export function useAllTeamMembers(params?: { search: string }) {
  const { data: staffMembers } = useGetStaffMembers(params);

  const allTeamMembers = staffMembers?.staff?.map((member) => ({
    id: member.id,
    email: member?.user?.email || "",
    location: member?.location || "",
  }));

  return { allTeamMembers };
}

export function useOtherTeamMembers(params?: { search: string }) {
  const { data: staffMembersData, isLoading } = useGetStaffMembers(params);
  const { user } = useAuth();
  const staffMembers = staffMembersData?.staff || [];

  const otherTeamMembers = staffMembers?.filter((member) => member?.user?.email !== user?.email);

  const userEmail = user?.email;
  const staffUserEmail = staffMembers?.find((member) => member?.user?.email === userEmail);

  console.log(staffUserEmail, "staffUserEmail");
  console.log(userEmail, "userEmail");

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
  const staffMembers = staffMembersData?.staff || [];
  const otherTeamMembers = staffMembers?.filter((member) => member?.user?.id !== excludeUserId);

  return { otherTeamMembers, isLoading };
}
