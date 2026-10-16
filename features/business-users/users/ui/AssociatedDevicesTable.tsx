import { getAssociatedDevicesColumns } from "@/features/device/columns";
import { useState } from "react";
import ReassignDeviceModal from "./ReassignDeviceModal";
import DevicesTable from "./DevicesTable";

import { StaffDevice, useDevice } from "@/entities/device";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { DeviceHardwareDetails, MDMDeviceDetailsResponse } from "@/features/device/types";
import { BusinessStaff } from "@/entities/business/types";
import { useAuth } from "@/shared/auth/AuthProvider";
import { BusinessRole } from "@/entities/user/model/user.schema";
import { Smartphone } from "lucide-react";

export type AssociatedDevice = DeviceHardwareDetails & {
  mdmLastSyncAt: string;
  staff?: BusinessStaff;
};

export default function AssociatedDevicesTable({ staffId }: { staffId?: string }) {
  const { user } = useAuth();
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

  const { data: deviceData } = useDevice(selectedDeviceId as string);

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
    // Await both so the table re-renders with the now-deviceless staff member
    // before the modal closes — i.e. the device visibly disappears immediately.
    await Promise.all([refetchStaffMember(), refetchDeviceDetail()]);
  }

  const financing = staffMember?.onDeviceFinancing || staffMember?.deviceFinancing;

  return (
    <>
      {!staffHasDevice && financing && (
        <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 space-y-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Smartphone className="size-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">
                Financed Device Assigned ({financing.deviceBrand} {financing.deviceModel})
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {[financing.deviceType, financing.deviceColour, financing.deviceMemory, financing.deviceRam]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-[var(--card-line)]">
            <div>
              <span className="text-muted-foreground block text-[11px]">Enrollment Status</span>
              <span className="font-semibold text-amber-400">Pending Agent Enrolment</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Activation Code</span>
              <span className="font-mono font-medium text-foreground">
                {staffMember?.activationCode?.code || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px]">Financing Plan</span>
              <span className="font-medium text-foreground">
                {financing.paymentPlanDuration} Months ({financing.paymentStatus || "PENDING"})
              </span>
            </div>
          </div>
        </div>
      )}

      <DevicesTable
        columns={getAssociatedDevicesColumns(
          handleOpenReassignDeviceModal,
          user?.businessRole as BusinessRole
        )}
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
