import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import { useAuth } from "@/shared/auth/AuthProvider";
import { formatID } from "@/shared/lib/utils";
import { useEffect, useMemo } from "react";
import Table from "@/shared/ui/Table/Table";
import { TableColumn } from "@/shared/ui/Table/types";
import { useGetFullBusinessDetails } from "@/features/onboarding/business/model/useGetBusinessDetails";
import { cn } from "@/shared/lib/utils";
import { Smartphone } from "lucide-react";
import { isDeviceFinancingOrRetailerRole } from "@/entities/user/model/user.schema";

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
  const { business } = useGetFullBusinessDetails();

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

  const isDeviceFinance = useMemo(() => {
    return (
      isDeviceFinancingOrRetailerRole(user?.businessRole) ||
      (business?.profile as any)?.type === "DEVICE_FINANCING" ||
      staffMembers.some((item: any) => item?.isDeviceFinanced !== undefined || !!item?.onDeviceFinancing || !!item?.retailer)
    );
  }, [user?.businessRole, business?.profile, staffMembers]);

  useEffect(() => {
    if (usersData?.data && typeof usersData.data === "object" && !Array.isArray(usersData.data) && (usersData.data as any).totalPages !== undefined) {
      setSelectedTabTotalPages((usersData.data as any).totalPages);
    } else if (Array.isArray(dataPayload)) {
      setSelectedTabTotalPages(Math.max(1, Math.ceil(dataPayload.length / 10)));
    }
  }, [usersData?.data, dataPayload, setSelectedTabTotalPages]);

  const columns: TableColumn<any>[] = useMemo(() => {
    if (isDeviceFinance) {
      return [
        {
          key: "user",
          label: "User",
          render: (item) => {
            const initials = `${item?.user?.firstName?.[0] || ""}${item?.user?.lastName?.[0] || ""}`.toUpperCase() || "-";
            const fullName = `${item?.user?.firstName || ""} ${item?.user?.lastName || ""}`.trim() || "-";
            return (
              <div className="account-row no-bg">
                <div className="avatar" style={{ background: '#05E0E5', color: '#002147' }}>{initials}</div>
                <div className="who">
                  <div className="name font-medium">{fullName}</div>
                  <div className="email text-xs text-muted-foreground">{item?.user?.email || item?.user?.phone || formatID(item?.userId || item?.id)}</div>
                </div>
              </div>
            );
          },
        },
        {
          key: "device",
          label: "Financed Device",
          render: (item) => {
            const financing = item?.onDeviceFinancing || item?.deviceFinancing;
            const deviceName = financing
              ? `${financing.deviceBrand || ""} ${financing.deviceModel || ""}`.trim()
              : item?.device?.name || "No device assigned";
            const specs = financing
              ? [financing.deviceMemory, financing.deviceColour].filter(Boolean).join(" • ")
              : null;
            return (
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <Smartphone className="size-3.5 text-primary shrink-0" />
                  <span>{deviceName}</span>
                </div>
                {specs && <div className="text-xs text-muted-foreground">{specs}</div>}
              </div>
            );
          },
        },
        {
          key: "retailer",
          label: "Retailer",
          render: (item) => {
            const retailer = item?.retailer;
            const legalName = retailer?.legalName || "N/A";
            const branch = retailer?.branchName ? `(${retailer.branchName})` : "";
            return (
              <div className="space-y-0.5">
                <div className="font-medium text-foreground">{`${legalName} ${branch}`.trim()}</div>
                {retailer?.referenceNumber && (
                  <div className="text-xs text-muted-foreground">{retailer.referenceNumber}</div>
                )}
              </div>
            );
          },
        },
        {
          key: "location",
          label: "Location",
          render: (item) => (
            <span className="text-sm text-muted-foreground">{item?.location || item?.address || "N/A"}</span>
          ),
        },
        {
          key: "plan",
          label: "Plan & Payment",
          render: (item) => {
            const financing = item?.onDeviceFinancing || item?.deviceFinancing;
            if (!financing) return <span className="text-xs text-muted-foreground">No plan</span>;
            const remainingKobo = Number(financing.remainingPaymentInKobo || 0);
            const remainingNaira = (remainingKobo / 100).toLocaleString();
            const planStatus = financing.paymentStatus || "PENDING";
            return (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-foreground">₦{remainingNaira} left</div>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold",
                    planStatus === "PAID"
                      ? "bg-green-500/20 text-green-400"
                      : planStatus === "PENDING"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-red-500/20 text-red-400"
                  )}
                >
                  {planStatus}
                </span>
              </div>
            );
          },
        },
        {
          key: "status",
          label: "Status",
          render: (item) => {
            const status = (item?.user?.status || item?.activationCode?.status || "ACTIVE").toUpperCase();
            const isOnline = status === "ACTIVE";
            return (
              <span className={cn("status-pill", isOnline ? "online" : "locked")}>
                <span className="dot"></span>
                {status === "ACTIVE" ? "Active" : status}
              </span>
            );
          },
        },
      ];
    }

    // Default regular staff columns
    return [
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
        render: (item) => <>{item?.role || item?.position || "Staff"}</>,
      },
      {
        key: "status",
        label: "Status",
        render: () => (
          <span className="status-pill online"><span className="dot"></span>Active</span>
        ),
      },
    ];
  }, [isDeviceFinance]);

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
