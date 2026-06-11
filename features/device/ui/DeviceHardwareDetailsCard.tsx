import Badge2 from "@/shared/ui/Badge2";
import { MDMDeviceDetailsResponse } from "../types";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { ReactNode } from "react";
import { useBusinessZone } from "@/features/mdm-sync/model/useMdmSync";
import { capitalizeFirstLetters } from "@/shared/lib/utils";

export default function DeviceHardwareDetailsCard({
  device,
}: {
  device: MDMDeviceDetailsResponse;
}) {
  const { data: hardwareDetails, deviceDetails } = device || {};
  const { model, osType, imeiNumber, wifiMacAddr } = hardwareDetails || {};
  const { macAddress } = deviceDetails || {};

  const { data: zoneRes } = useBusinessZone();

  return (
    <CardWrapper className="h-full rounded-[32px] bg-[#F8F9FA]" padding="lg">
      <div className="space-y-8">
        <p className="text-sm font-medium text-slate-400">Device details</p>
        <h3 className="text-primary text-2xl font-semibold">{model}</h3>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <DevicePropertyItem
            title={`${hardwareDetails?.osType || ""} ID`}
            value={hardwareDetails?.deviceId}
          />
          <DevicePropertyItem title="IMEI number" value={imeiNumber} />
          <DevicePropertyItem title="MAC Address" value={macAddress || wifiMacAddr} />
          <DevicePropertyItem title="Zone" value={zoneRes?.business.address} />
          <DevicePropertyItem
            title="Model & Manufacturer"
            value={`${hardwareDetails?.model || "N/A"} / ${hardwareDetails?.manufacturer || "N/A"}`}
          />
          <DevicePropertyItem title="OS Version" value={osType} />
          <DevicePropertyItem
            title="Status"
            value={
              <Badge2
                variant={deviceDetails?.deviceStatus === "ACTIVE" ? "success" : "destructive"}
                content={
                  deviceDetails?.assignmentStatus === "RETURNED"
                    ? capitalizeFirstLetters(deviceDetails?.assignmentStatus)
                    : capitalizeFirstLetters(deviceDetails?.deviceStatus)
                }
              />
            }
          />
          {device?.deviceDetails?.assignmentStatus === "RETURNED" && (
            <DevicePropertyItem title="Comment" value={device?.deviceDetails?.flagReason} />
          )}
        </div>
      </div>
    </CardWrapper>
  );
}

function DevicePropertyItem({ title, value }: { title: string; value: string | ReactNode }) {
  return (
    <div className="space-y-3 font-medium">
      <p className="text-sm text-slate-400">{title}</p>
      <div className="break-all">{value || "N/A"}</div>
    </div>
  );
}
