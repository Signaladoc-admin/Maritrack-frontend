import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import React from "react";

const DeviceCard = ({ device, onClick }: { device: any; onClick: () => void }) => {
  const { data: hardwareData } = useDeviceDetail(device.deviceId || "", "hardware", {
    enabled: !!device.deviceId,
  });
  const batteryLevel = hardwareData?.data?.realTimeStats?.batteryLevel ?? 0;

  console.log(device);

  return (
    <DeviceUsageCard
      deviceName={device.manufacturer}
      status="active"
      percentage={batteryLevel}
      device={device.manufacturer}
      isRow={true}
      onClick={onClick}
    />
  );
};

export default DeviceCard;
