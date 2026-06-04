import Badge2 from "@/shared/ui/Badge2";
import { MDMDeviceDetailsResponse } from "../types";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { ReactNode } from "react";

export default function DeviceHardwareDetailsCard({
  device,
}: {
  device: MDMDeviceDetailsResponse;
}) {
  const { data: hardwareDetails, deviceDetails } = device || {};
  const { model, osType, imeiNumber, wifiMacAddr, serialNumber } = hardwareDetails || {};

  return (
    <CardWrapper className="h-full" padding="lg">
      <div className="space-y-8">
        <p className="text-sm font-medium text-slate-400">Device details</p>
        <h3 className="text-primary text-xl font-semibold">{model}</h3>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <DevicePropertyItem title={`${hardwareDetails?.osType} ID`} value={hardwareDetails?.id} />
          <DevicePropertyItem title="IMEI number" value={imeiNumber} />
          <DevicePropertyItem title="MAC Address" value={wifiMacAddr} />
          <DevicePropertyItem title="Zone" value={serialNumber} />
          <DevicePropertyItem title="Model & Manufacturer" value={serialNumber} />
          <DevicePropertyItem title="OS Version" value={serialNumber} />
          <DevicePropertyItem
            title="Status"
            value={
              <Badge2
                variant={deviceDetails?.deviceStatus === "ACTIVE" ? "success" : "destructive"}
                content={
                  deviceDetails?.deviceStatus[0].toUpperCase() +
                  deviceDetails?.deviceStatus?.slice(1).toLowerCase()
                }
              />
            }
          />
        </div>
      </div>
    </CardWrapper>
  );
}

function DevicePropertyItem({ title, value }: { title: string; value: string | ReactNode }) {
  return (
    <div className="space-y-3 font-medium">
      <p className="text-xs text-slate-400">{title}</p>
      <div className="break-all text-sm">{value}</div>
    </div>
  );
}
