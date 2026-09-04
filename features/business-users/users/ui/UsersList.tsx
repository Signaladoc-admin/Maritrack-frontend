import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect } from "react";

import Table from "@/shared/ui/Table/Table";
import { TableColumn } from "@/shared/ui/Table/types";
import { Badge } from "@/shared/ui/badge";

export default function UsersList({
  searchTerm,
  currentPage,
  setSelectedTabTotalPages,
  onRowClick,
}: {
  searchTerm: string;
  currentPage: number;
  setSelectedTabTotalPages: (totalPages: number) => void;
  onRowClick?: (id: string) => void;
}) {
  const { user } = useAuth();

  const { data: usersData, isLoading } = useGetStaffMembers({
    businessId: user?.businessId!,
    search: searchTerm,
    page: currentPage,
    limit: 10,
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

  const columns: TableColumn<any>[] = [
    {
      key: "user",
      label: "User",
      render: (item) => {
        const initials = `${item?.user?.firstName?.[0] || ""}${item?.user?.lastName?.[0] || ""}`.toUpperCase() || "-";
        return (
          <div className="account-row no-bg">
            <div className="avatar" style={{ background: '#05E0E5', color: '#002147' }}>{initials}</div>
            <div className="who">
              <div className="name">{`${item?.user?.firstName || ""} ${item?.user?.lastName || ""}`.trim() || "-"}</div>
              <div className="email text-muted-foreground">{item?.user?.email || formatID(item?.user?.id) || "N/A"}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: "role",
      label: "Role",
      render: (item) => <>{item?.role || "Staff"}</>
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span className="status-pill online"><span className="dot"></span>Active</span>
      )
    }
  ];

  return (
    <Table
      data={staffMembers || []}
      columns={columns}
      loading={isLoading}
      isPaginated={false}
      onItemClick={(item) => onRowClick?.(item.id)}
      emptyMessage="No users found"
    />
  );
}
