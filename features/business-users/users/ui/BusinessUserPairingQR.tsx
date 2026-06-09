"use client";

import PairingQRStep from "@/features/onboarding/personal/ui/PairingQRStep";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";

export default function BusinessUserPairingQR({
  staffId,
  onBack,
  onComplete,
}: {
  staffId: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const { data: staffMember } = useGetStaffMember(staffId);

  const userName =
    staffMember?.user?.firstName || staffMember?.user?.lastName
      ? `${staffMember.user.firstName ?? ""} ${staffMember.user.lastName ?? ""}`.trim()
      : (staffMember?.user?.email ?? "Team member");

  return (
    <PairingQRStep
      entityId={staffId}
      entityName={userName}
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
