import { getAssociatedDevicesColumns } from "@/features/device/columns";
import { useState } from "react";
import ReassignDeviceModal from "./ReassignDeviceModal";
import DevicesTable from "./DevicesTable";

import { StaffDevice, useDevice } from "@/entities/device";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { DeviceHardwareDetails, MDMDeviceDetailsResponse } from "@/features/device/types";
import { BusinessStaff } from "@/entities/business/types";

export type AssociatedDevice = DeviceHardwareDetails & {
  mdmLastSyncAt: string;
  staff?: BusinessStaff;
};

export default function AssociatedDevicesTable({ staffId }: { staffId?: string }) {
  const {
    data: staffMember,
    isPending: isStaffMemberPending,
    refetch: refetchStaffMember,
  } = useGetStaffMember(staffId || "");
  const mdmDeviceId = staffMember?.device?.mdmDeviceId || "";
  const staffHasDevice = !!staffMember?.device;

  const {
    data: hardwareData,
    isLoading: isHardwarePending,
    refetch: refetchDeviceDetail,
  } = useDeviceDetail(mdmDeviceId, "hardware", { enabled: !!mdmDeviceId });

  const hardwareDetails: MDMDeviceDetailsResponse = hardwareData;

  const [isShowingReassignDeviceModal, setIsShowingReassignDeviceModal] = useState(false);
  // The modal needs the device *record* (currentUserId, currentUser, mdmDeviceId,
  // assignmentStatus, etc.) to drive reassignment — that's `staffMember.device`,
  // not the hardware-details row built for display in the table below.
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const { data: deviceData, refetch: refetchDevice } = useDevice(selectedDeviceId as string);

  const device = {
    ...hardwareDetails?.data,
    deviceDetails: deviceData,
    mdmLastSyncAt: hardwareDetails?.deviceDetails?.mdmLastSyncAt,
  };

  function handleOpenReassignDeviceModal() {
    setIsShowingReassignDeviceModal(true);
    setSelectedDeviceId(staffMember?.device?.id ?? null);
  }

  async function handleRefetch() {
    // Await all so the table re-renders with the now-deviceless staff member
    // before the modal closes — i.e. the device visibly disappears immediately.
    // refetchDevice also refreshes the device's deviceAssignmentId so a retry
    // after a failed unassignment uses the current id, not a stale one.
    await Promise.all([refetchStaffMember(), refetchDeviceDetail(), refetchDevice()]);
  }

  return (
    <>
      <DevicesTable
        columns={getAssociatedDevicesColumns(handleOpenReassignDeviceModal)}
        data={staffHasDevice ? [device] : []}
        isLoading={isStaffMemberPending || isHardwarePending}
      />
      <ReassignDeviceModal
        open={isShowingReassignDeviceModal}
        onOpenChange={setIsShowingReassignDeviceModal}
        selectedDevice={deviceData}
        type="REASSIGN"
        refetch={handleRefetch}
      />
    </>
  );
}
