import { TableColumn } from "@/shared/ui/Table/types";
import { capitalizeFirstLetters, formatDate, formatID } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { StaffDevice } from "@/entities/device";
import { DeviceHardwareDetails } from "./types";
import Badge2 from "@/shared/ui/Badge2";
import { BusinessRole } from "@/entities/user/model/user.schema";
import { cn } from "@/lib/utils";

export function getDevicesColumns(
  handleAssignDevice: (device: StaffDevice) => void,
  businessRole: BusinessRole,
  onShowToast: (message: string) => void
) {

  const devicesColumns: TableColumn<StaffDevice>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item) => (
        <div className="asset-cell">
          <div className="asset-swatch">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2"/></svg>
          </div>
          <div>
            <div className="name">{[item.manufacturer, item.model].filter(Boolean).join(" ") || "N/A"}</div>
            <div className="id">{item?.serialNumber ? formatID(item?.serialNumber) : "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      key: "assignmentStatus",
      label: "Assignment",
      className: "assign-cell",
      render: (item) =>
        !!item.currentUser && item.assignmentStatus !== "UNASSIGNED" ? (
          <>
            <div className="who">{`${item.currentUser?.firstName} ${item.currentUser?.lastName}`}</div>
            <div className="email">{item.currentUser?.email}</div>
          </>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={cn(
              "rounded-full",
              businessRole === "DEPARTMENT_MANAGER" && "cursor-not-allowed opacity-70"
            )}
            onClick={(e) => {
              e.stopPropagation();

              if (businessRole === "DEPARTMENT_MANAGER") {
                onShowToast("Device assignment is for Device Manager and Organization Admin only.");
                return;
              }
              handleAssignDevice(item);
            }}
          >
            Unassigned
          </Button>
        ),
    },
    {
      key: "imei",
      label: "IMEI",
      className: "mono",
      render: (item) => <>{item.imei}</>,
    },
    {
      key: "deviceStatus",
      label: "Status",
      render: (item) => (
        <span className={cn("status-pill", item.deviceStatus === "ACTIVE" ? "online" : "locked")}>
          <span className="dot"></span>{item.deviceStatus || "Unknown"}
        </span>
      ),
    },
    {
      key: "serialNumber",
      label: "Serial number",
      className: "mono",
      render: (item) => <>{item.serialNumber}</>,
    },
    {
      key: "macAddress",
      label: "MAC address",
      className: "mono",
      render: (item) => <>{item.macAddress}</>,
    },
    {
      key: "lastSynced",
      label: "Last synced",
      className: "mono",
      render: (item) => <>{formatDate(new Date(item.mdmLastSyncAt))}</>,
    },
  ];

  return devicesColumns;
}
export function getAssociatedDevicesColumns(
  handleOpenReassignDeviceModal: (device: DeviceHardwareDetails & { mdmLastSyncAt: string }) => void
) {
  const devicesColumns: TableColumn<DeviceHardwareDetails & { mdmLastSyncAt: string }>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item) => (
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">{item.model || "Model N/A"}</p>
          <p className="text-xs text-neutral-500">{item?.id ? formatID(item?.id) : "N/A"}</p>
        </div>
      ),
    },
    {
      key: "imeiNumber",
      label: "IMEI Number",
    },
    {
      key: "serialNumber",
      label: "Serial Number",
    },
    {
      key: "wifiMacAddr",
      label: "MAC Address",
    },
    {
      key: "lastSynced",
      label: "Last synced",
      render: (item) => <p>{formatDate(new Date(item.mdmLastSyncAt))}</p>,
    },
    {
      key: "",
      label: "Action",
      render: (item) => (
        <Button
          size="sm"
          variant="outlinePrimary"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenReassignDeviceModal(item);
          }}
        >
          Reassign
        </Button>
      ),
    },
  ];

  return devicesColumns;
}
