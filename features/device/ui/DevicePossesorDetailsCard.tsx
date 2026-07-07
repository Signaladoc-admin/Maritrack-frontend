import { CardWrapper } from "@/shared/ui/card-wrapper";
import { MDMDeviceDetailsResponse } from "../types";
import { formatID } from "@/shared/lib/utils";
import { useGetUserById } from "@/features/user-management/model/useUserManagement";

export default function DevicePossesorDetailsCard({
  device,
}: {
  device: MDMDeviceDetailsResponse;
}) {
  const { currentUserId } = device?.deviceDetails || {};

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserById(currentUserId || null);

  const staffMember = userInfo;

  return (
    <CardWrapper className="rounded-[32px] bg-[#F8F9FA]" padding="lg">
      <div className="space-y-2 flex flex-col justify-center h-full">
        <p className="text-sm font-medium text-slate-400">Possessor</p>
        <h3 className="text-primary text-2xl font-semibold">
          {staffMember?.firstName} {staffMember?.lastName}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <p title={staffMember?.id}>{staffMember?.id ? formatID(staffMember.id) : "N/A"}</p>
          <p className="break-all">{staffMember?.email}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
