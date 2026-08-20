import { TableColumn } from "@/shared/ui/Table/types";
import { capitalizeFirstLetters, formatDate } from "@/shared/lib/utils";
import Badge2 from "@/shared/ui/Badge2";
import { AuditLog } from "./types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar";

export function getAuditLogColumns(): TableColumn<AuditLog>[] {
  return [
    {
      key: "activity",
      label: "Activity",
      render: (item) => (
        <div className="space-y-1">
          <p className="font-semibold text-neutral-800">{item.activity}</p>
          {item.activityType && (
            <p className="text-xs text-neutral-500">{capitalizeFirstLetters(item.activityType)}</p>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date & Time",
      render: (item) => (
        <div className="text-neutral-600">
          {item.createdAt ? format(new Date(item.createdAt), "MMM d, yyyy h:mm a") : "N/A"}
        </div>
      ),
    },
    {
      key: "user",
      label: "User",
      render: (item) => {
        const initials = `${item.user?.firstName?.charAt(0) || ""}${item.user?.lastName?.charAt(0) || ""}`;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={item.user?.avatarUrl} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="font-semibold text-neutral-900">
                {item.user?.firstName} {item.user?.lastName}
              </p>
              <p className="text-xs text-neutral-500">{item.user?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "role",
      label: "Role",
      render: (item) => (
        <p className="text-neutral-600">{capitalizeFirstLetters(item.role?.replace(/_/g, " ") || "N/A")}</p>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => {
        let variant: "success" | "warning" | "destructive" | "default" = "default";
        const status = item.status?.toUpperCase() || "";

        if (status === "SUCCESS") variant = "success";
        else if (status === "FAILED") variant = "destructive";
        else if (status === "PENDING") variant = "warning";

        return (
          <Badge2
            content={capitalizeFirstLetters(status || "N/A")}
            variant={variant}
          />
        );
      },
    },
  ];
}
