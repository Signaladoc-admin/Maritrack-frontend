"use client";

import BusinessPairingQRContent from "@/entities/business/ui/PairingQRBusinessModal";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
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
  const { data: staffMember, isLoading } = useGetStaffMember(staffId);

  if (isLoading || !staffMember) {
    return (
      <div className="flex h-72 items-center justify-center">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <BusinessPairingQRContent
      staffMember={staffMember}
      onBack={onBack}
      onComplete={onComplete}
    />
  );
}
