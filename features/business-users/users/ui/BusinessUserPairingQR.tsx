"use client";

import PairingQRStep from "@/features/onboarding/personal/ui/PairingQRStep";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { Skeleton } from "@/shared/ui/skeleton";

export default function BusinessUserPairingQR({
  staffId,
  onBack,
  onComplete,
}: {
  staffId: string;
  onBack: () => void;
  onComplete: () => void;
}) {
  const { data: staffMember, isLoading: isLoadingMember } = useGetStaffMember(staffId);
  const { data: businessZones, isLoading: isLoadingZone } = useBusinessZones();

  const zoneId = (businessZones as any)?.[0]?.id;
  const userName =
    staffMember?.user?.firstName || staffMember?.user?.lastName
      ? `${staffMember.user.firstName ?? ""} ${staffMember.user.lastName ?? ""}`.trim()
      : (staffMember?.user?.email ?? "Team member");

  if (isLoadingMember || isLoadingZone) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  return (
    <PairingQRStep
      entityId={staffId}
      entityName={userName}
      onboardingCode={staffMember?.user?.id ?? staffId}
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
