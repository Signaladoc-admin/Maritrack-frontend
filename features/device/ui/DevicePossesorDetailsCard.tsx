import { CardWrapper } from "@/shared/ui/card-wrapper";
import { MDMDeviceDetailsResponse } from "../types";
import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import { formatID } from "@/shared/lib/utils";

export default function DevicePossesorDetailsCard({
  device,
}: {
  device: MDMDeviceDetailsResponse;
}) {
  const { currentUserId } = device?.deviceDetails || {};

  const { data: staffMemberData } = useGetStaffMembers({
    userId: currentUserId,
  });

  const staffMember = staffMemberData?.data?.staff[0];

  return (
    <CardWrapper className="rounded-[32px] bg-[#F8F9FA]" padding="lg">
      <div className="space-y-2 flex flex-col justify-center h-full">
        <p className="text-sm font-medium text-slate-400">Possessor</p>
        <h3 className="text-primary text-2xl font-semibold">
          {staffMember?.user?.firstName} {staffMember?.user?.lastName}
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <p title={staffMember?.id}>{staffMember?.id ? formatID(staffMember.id) : "N/A"}</p>
          <p className="break-all">{staffMember?.user?.email}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
