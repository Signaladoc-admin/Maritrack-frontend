import { TableColumn } from "@/shared/ui/Table/types";
import { Device } from "./types";
import { formatDate, formatID } from "@/shared/lib/utils";

export const devicesColumns: TableColumn<Device>[] = [
  {
    key: "asset",
    label: "Asset",
    render: (item: Device) => (
      <div className="space-y-1">
        <p className="font-semibold text-neutral-800">{item.model}</p>
        <p className="text-sm text-neutral-500">{formatID(item.serialNumber)}</p>
      </div>
    ),
  },
  {
    key: "processor",
    label: "Processor",
    render: (item: Device) => (
      <div className="space-y-1">
        <p className="font-semibold text-neutral-800">{item?.possesor?.name}</p>
        <p className="text-sm text-neutral-500">{item?.possesor?.email}</p>
      </div>
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
