import { useGetTeamMembers } from "@/entities/business/model/useTeamMembers";
import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function UsersList({ searchTerm }: { searchTerm: string }) {
  const { user } = useAuth();
  const { data: usersData } = useGetTeamMembers({
    businessId: user?.businessId!,
    search: searchTerm,
  });
  const staffMembers = usersData?.staff;

  return (
    <div className="space-y-1">
      {staffMembers?.map((staffMember: any) => (
        <EntityListItem
          key={staffMember?.id}
          id={staffMember?.id}
          title={`${staffMember?.user?.firstName || "-"} ${!staffMember?.user?.firstName && !staffMember?.user?.lastName ? "-" : ""}`}
          subtitle={staffMember?.user?.email || "N/A"}
        />
      ))}
    </div>
  );
}
