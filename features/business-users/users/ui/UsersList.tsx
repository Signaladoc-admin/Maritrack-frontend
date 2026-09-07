import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect } from "react";

export default function UsersList({
  searchTerm,
  currentPage,
  setSelectedTabTotalPages,
}: {
  searchTerm: string;
  currentPage: number;
  setSelectedTabTotalPages: (totalPages: number) => void;
}) {
  const { user } = useAuth();

  const { data: usersData, isLoading } = useGetStaffMembers({
    businessId: user?.businessId!,
    search: searchTerm,
    page: currentPage,
    limit: 5,
  });
  const dataPayload = usersData?.data as any;
  const staffMembers = Array.isArray(dataPayload) 
    ? dataPayload 
    : (dataPayload?.staff || dataPayload?.deviceFinanceUsers || []);

  useEffect(() => {
    if (usersData?.data?.totalPages !== undefined) {
      setSelectedTabTotalPages(usersData.data.totalPages);
    }
  }, [usersData?.data?.totalPages, setSelectedTabTotalPages]);

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
          No users found
        </div>
      )}
    </div>
  );
}
