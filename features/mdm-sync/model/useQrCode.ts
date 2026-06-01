"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getQrCodeAction } from "../api/mdm-sync.actions";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useGetChildren } from "@/features/child-profile/model/useGetChildrenProfile";
import { useChild } from "@/entities/children/model/useChildren";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import { useAuth } from "@/shared/auth/AuthProvider";

export const mdmSyncKeys = {
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
};

function toQrCodeSrc(data: string | null | undefined): string | null {
  if (!data) return null;
  return data.startsWith("data:image") ? data : `data:image/png;base64,${data}`;
}

export function useQrCode(
  userTypeId: string, // child id or staff member id
) {
  const { user } = useAuth();

  const isParent = !!user?.id && user?.appRole === 'PARENT';

  const { data: child } = useChild(userTypeId, { enabled: isParent })
  const { data: staffMember } = useGetStaffMember(userTypeId, { enabled: !isParent })

  const onboardingCode = isParent ? child?.onboardingCode : staffMember?.onboardingCode;
  const zoneId = user?.zoneId;

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(zoneId || "", onboardingCode || ""),
    getQrCodeAction,
    [zoneId as string, onboardingCode as string],
    {
      enabled: !!zoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return {
    ...query,
    qrCodeSrc: toQrCodeSrc(query.data),
    isPending: !zoneId || !onboardingCode,
  };
}

export function useChildQrCode({ childId }: { childId: string }) {
  const { data: user } = useUserProfile();
  const { user: authUser } = useAuth();
  const { data: children } = useGetChildren();

  const onboardingCode =
    children?.find((child: any) => child.id === childId)?.onboardingCode ?? null;

  const activeZoneId = authUser?.zoneId || user?.zone?.id

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(activeZoneId || "", onboardingCode ?? ""),
    getQrCodeAction,
    [activeZoneId as string, onboardingCode as string],
    {
      enabled: !!activeZoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return { ...query, qrCodeSrc: toQrCodeSrc(query.data) };
}
