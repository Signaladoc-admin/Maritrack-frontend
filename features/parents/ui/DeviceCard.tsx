import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import React from "react";

const DeviceCard = ({ device, childName, onClick }: { device: any; childName?: string; onClick: () => void }) => {
  const { data: hardwareData } = useDeviceDetail(device.deviceId || "", "hardware", {
    enabled: !!device.deviceId,
  });
  const batteryLevel = hardwareData?.data?.realTimeStats?.batteryLevel ?? 0;

  return (
    <DeviceUsageCard
      deviceName={childName ? `${childName}'s phone` : device.manufacturer}
      status="active"
      percentage={batteryLevel}
      device={device.model || "iPhone 14 Pro"}
      isRow={false}
      onClick={onClick}
      className="h-full"
    />
  );
};

export default DeviceCard;
