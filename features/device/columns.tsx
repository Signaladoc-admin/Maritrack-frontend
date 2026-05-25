import { TableColumn } from "@/shared/ui/Table/types";
import { formatDate, formatID } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Device, StaffDevice } from "@/entities/device";

export function getDevicesColumns(handleAssignDevice: (device: StaffDevice) => void) {
  const devicesColumns: TableColumn<StaffDevice>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item) => (
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">
            {[item.manufacturer, item.model].filter(Boolean).join(" ") || "N/A"}
          </p>
          <p className="text-xs text-neutral-500">{formatID(item.serialNumber)}</p>
        </div>
      ),
    },
    {
      key: "assignmentStatus",
      label: "Assignment",
      render: (item) =>
        item.assignmentStatus === "ASSIGNED" ? (
          <span className="text-sm text-neutral-600">Assigned</span>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleAssignDevice(item);
            }}
          >
            Assign
          </Button>
        ),
    },
    {
      key: "imei",
      label: "IMEI",
      render: (item) => <p>{item.imei}</p>,
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
  handleOpenReassignDeviceModal: (device: StaffDevice) => void
) {
  const devicesColumns: TableColumn<StaffDevice>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item) => (
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">{item.model || "Model N/A"}</p>
          <p className="text-xs text-neutral-500">{formatID(item.mdmDeviceId)}</p>
        </div>
      ),
    },
    {
      key: "serialNumber",
      label: "Serial Number",
    },
    {
      key: "macAddress",
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
