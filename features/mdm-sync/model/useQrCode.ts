"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getQrCodeAction } from "../api/mdm-sync.actions";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useBusinessZones, useParentZones } from "./useMdmSync";
import { useGetChildren } from "@/features/child-profile/model/useGetChildrenProfile";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
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
  entityId: string, // child or staff member id
  overrides?: { zoneId?: string; onboardingCode?: string }
) {
  const { user } = useAuth();

  console.log(user?.appRole);

  const isParent = !!user?.id && user?.appRole === 'PARENT';
  const isBusiness = !!user?.id && user?.appRole === 'BUSINESS';

  const { data: parentZones } = useParentZones({ enabled: isParent });
  const { data: businessZones } = useBusinessZones({ enabled: isBusiness });
  const { data: parentChildren } = useParentChildren({ enabled: isParent });
  const { data: staffMembers } = useGetStaffMembers(undefined, { enabled: isBusiness });

  console.log("staffMembers", staffMembers);
  console.log("parentChildren", parentChildren);
  console.log("businessZones", businessZones);
  console.log("parentZones", parentZones);

  const zoneWithChild = parentZones?.find((zone) =>
    parentChildren?.data?.some((pc) => pc.id === entityId)
  )?.id;
  const zoneWithStaffMember = businessZones?.find((zone) =>
    staffMembers?.staff?.some((sm) => sm.user?.id === entityId)
  )?.id;

  const derivedOnboardingCode = parentChildren?.data?.find(
    (pc: any) => pc.id === entityId
  )?.onboardingCode;

  const onboardingCode = overrides?.onboardingCode ?? derivedOnboardingCode;
  const zoneId = overrides?.zoneId ?? zoneWithChild ?? zoneWithStaffMember;

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
  const { data: parentZonesRes } = useParentZones();
  const { data: children } = useGetChildren();

  console.log("children", children);

  const onboardingCode =
    children?.find((child: any) => child.id === childId)?.onboardingCode ?? null;

  const activeZoneId = user?.zoneId?.[0]?.id || parentZonesRes?.[0]?.id;

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(activeZoneId || "", onboardingCode ?? ""),
    getQrCodeAction,
    [activeZoneId as string, onboardingCode as string],
    {
      // Both values must be ready — previously only checked activeZoneId,
      // which caused the query to fire with onboardingCode=null before parentZonesRes loaded.
      enabled: !!activeZoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return { ...query, qrCodeSrc: toQrCodeSrc(query.data) };
}
