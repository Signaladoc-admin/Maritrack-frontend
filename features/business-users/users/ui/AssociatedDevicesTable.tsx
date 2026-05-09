import { getAssociatedDevicesColumns } from "@/features/device/columns";
import { useState } from "react";
import ReassignDeviceModal from "./ReassignDeviceModal";
import DevicesTable from "./DevicesTable";
import { useGetStaffMemberDevices } from "@/entities/business/model/useDevices";
import { StaffDevice } from "@/entities/device";

export default function AssociatedDevicesTable({ staffId }: { staffId?: string }) {
  const devices = useGetStaffMemberDevices(staffId!);
  const [isShowingReassignDeviceModal, setIsShowingReassignDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<StaffDevice | null>(null);

  function handleOpenReassignDeviceModal(device: StaffDevice) {
    setIsShowingReassignDeviceModal(true);
    setSelectedDevice(device);
  }

  return (
    <>
      <DevicesTable
        columns={getAssociatedDevicesColumns(handleOpenReassignDeviceModal)}
        data={devices}
      />
      <ReassignDeviceModal
        open={isShowingReassignDeviceModal}
        onOpenChange={setIsShowingReassignDeviceModal}
        selectedDevice={selectedDevice}
      />
    </>
  );
}
