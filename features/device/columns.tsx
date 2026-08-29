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
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">
            {[item.manufacturer, item.model].filter(Boolean).join(" ") || "N/A"}
          </p>
          <p className="text-xs text-neutral-500">
            {item?.serialNumber ? formatID(item?.serialNumber) : "N/A"}
          </p>
        </div>
      ),
    },
    {
      key: "assignmentStatus",
      label: "Assignment",
      render: (item) =>
        !!item.currentUser && item.assignmentStatus !== "UNASSIGNED" ? (
          <div className="space-y-1.5 leading-tight">
            <p className="font-semibold text-neutral-900">{`${item.currentUser?.firstName} ${item.currentUser?.lastName}`}</p>
            <p className="text-neutral-500">{item.currentUser?.email}</p>
            {item?.assignmentStatus === "RETURNED" && (
              <Badge2
                content={capitalizeFirstLetters(item.assignmentStatus)}
                variant="destructive"
                className="text-xs!"
              />
            )}
          </div>
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
      render: (item) => <p>{item.imei}</p>,
    },
    {
      key: "deviceStatus",
      label: "Status",
      render: (item) => <p>{item.deviceStatus}</p>,
    },
    {
      key: "serialNumber",
      label: "Serial Number",
      render: (item) => <p>{item.serialNumber}</p>,
    },
    {
      key: "macAddress",
      label: "MAC Address",
      render: (item) => <p>{item.macAddress}</p>,
    },
    {
      key: "lastSynced",
      label: "Last Synced",
      render: (item) => <p>{formatDate(new Date(item.mdmLastSyncAt))}</p>,
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
