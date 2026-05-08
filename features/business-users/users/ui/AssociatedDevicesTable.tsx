import { getAssociatedDevicesColumns } from "@/app/(in-app)/devices/columns";
import { Device } from "@/app/(in-app)/devices/types";
import { useState } from "react";
import ReassignDeviceModal from "./ReassignDeviceModal";
import DevicesTable from "./DevicesTable";

export default function AssociatedDevicesTable({ userId }: { userId?: string }) {
  const [isShowingReassignDeviceModal, setIsShowingReassignDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  function handleReassignDevice(device: Device) {
    setIsShowingReassignDeviceModal(true);
    setSelectedDevice(device);
  }

  return (
    <>
      <DevicesTable columns={getAssociatedDevicesColumns(handleReassignDevice)} />
      <ReassignDeviceModal
        open={isShowingReassignDeviceModal}
        onOpenChange={setIsShowingReassignDeviceModal}
        deviceId={selectedDevice?.id}
        deviceName={selectedDevice?.model}
        currentOwnerName={selectedDevice?.possessor?.name}
      />
    </>
  );
}
