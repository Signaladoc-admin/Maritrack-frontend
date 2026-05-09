import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export default function UsersList({ searchTerm }: { searchTerm: string }) {
  const { user } = useAuth();
  const { data: usersData, isLoading } = useGetStaffMembers({
    businessId: user?.businessId!,
    search: searchTerm,
  });
  const staffMembers = usersData?.staff || [];

  if (isLoading)
    return (
      <div className="space-y-3 p-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );

  return (
    <div className="space-y-1">
      {staffMembers && staffMembers.length > 0 ? (
        staffMembers?.map((staffMember: any) => (
          <EntityListItem
            key={staffMember?.id}
            id={staffMember?.id}
            title={`${staffMember?.user?.firstName || "-"} ${!staffMember?.user?.firstName && !staffMember?.user?.lastName ? "-" : ""}`}
            subtitle={formatID(staffMember?.user?.id) || "N/A"}
          />
        ))
      ) : (
        <div className="text-muted-foreground flex h-full items-center justify-center">
          No staff members found
        </div>
      )}
    </div>
  );
}
