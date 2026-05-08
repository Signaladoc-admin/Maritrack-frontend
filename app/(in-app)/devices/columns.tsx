import { TableColumn } from "@/shared/ui/Table/types";
import { Device } from "./types";
import { formatDate, formatID } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export function getDevicesColumns(handleAssignDevice: (device: Device) => void) {
  const devicesColumns: TableColumn<Device>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item: Device) => (
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">{item.model}</p>
          <p className="text-xs text-neutral-500">{formatID(item.serialNumber)}</p>
        </div>
      ),
    },
    {
      key: "possessor",
      label: "Possessor",
      render: (item: Device) =>
        item.possessor ? (
          <div className="space-y-1 leading-tight">
            <p className="font-semibold text-neutral-800">{item?.possessor?.name}</p>
            <p className="text-sm text-neutral-500">{item?.possessor?.email}</p>
          </div>
        ) : (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full rounded-full"
            onClick={(e) => {
              e.stopPropagation();
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
      render: (item: Device) => <p>{item.imei}</p>,
    },
    {
      key: "serialNumber",
      label: "Serial Number",
      render: (item: Device) => <p>{item.serialNumber}</p>,
    },
    {
      key: "macAddress",
      label: "MAC Address",
      render: (item: Device) => <p>{item.macAddress}</p>,
    },
    {
      key: "lastSynced",
      label: "Last Synced",
      render: (item: Device) => <p>{formatDate(item.lastSynced)}</p>,
    },
  ];

  return devicesColumns;
}
export function getAssociatedDevicesColumns(handleReassignDevice: (device: Device) => void) {
  const devicesColumns: TableColumn<Device>[] = [
    {
      key: "asset",
      label: "Asset",
      render: (item: Device) => (
        <div className="space-y-1 leading-tight">
          <p className="font-semibold text-neutral-800">{item.model}</p>
          <p className="text-xs text-neutral-500">{formatID(item.serialNumber)}</p>
        </div>
      ),
    },
    {
      key: "serialNumber",
      label: "Serial Number",
      render: (item: Device) => <p>{item.serialNumber}</p>,
    },
    {
      key: "macAddress",
      label: "MAC Address",
      render: (item: Device) => <p>{item.macAddress}</p>,
    },
    {
      key: "lastSynced",
      label: "Last synced",
      render: (item: Device) => <p>{item.lastSynced}</p>,
    },
    {
      key: "",
      label: "Action",
      render: (item: Device) => (
        <Button
          size="sm"
          variant="outlinePrimary"
          onClick={(e) => {
            e.stopPropagation();
            handleReassignDevice(item);
          }}
        >
          Reassign
        </Button>
      ),
    },
  ];

  return devicesColumns;
}
