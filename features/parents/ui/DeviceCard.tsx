import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { DeviceUsageCard } from "@/shared/ui/DeviceStatusCard/DeviceStatusCard";
import React from "react";

const DeviceCard = ({
  device,
  childName,
  onClick,
  hardwareData: initialHardwareData,
}: {
  device: any;
  childName?: string;
  onClick: () => void;
  hardwareData?: any;
}) => {
  const { data: fetchedHardwareData } = useDeviceDetail(device.deviceId || "", "hardware", {
    enabled: !!device.deviceId && !initialHardwareData,
  });

  const hardwareData = initialHardwareData || fetchedHardwareData;
  const batteryLevel = hardwareData?.data?.realTimeStats?.batteryLevel ?? 0;

  // Extract osType from hardwareData or device details
  const osType =
    hardwareData?.data?.osType ||
    (hardwareData?.deviceDetails as any)?.osType ||
    device?.osType ||
    device?.operatingSystem;

  return (
    <DeviceUsageCard
      deviceName={childName ? `${childName}'s phone` : device.manufacturer}
      status="active"
      percentage={batteryLevel}
      device={device.model || "N/A"}
      isRow={false}
      osType={osType}
      onClick={onClick}
      className="h-full"
    />
  );
};

export default DeviceCard;
