"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getQrCodeAction } from "../api/mdm-sync.actions";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParentZones } from "./useMdmSync";

export const mdmSyncKeys = {
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
};

export function useQrCode(zoneId?: string, onboardingCode?: string) {
  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(zoneId || "", onboardingCode || ""),
    getQrCodeAction,
    [zoneId as string, onboardingCode as string],
    {
      enabled: !!zoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 1,
    }
  );

  const qrCodeSrc = query.data
    ? query.data.startsWith("data:image")
      ? query.data
      : `data:image/png;base64,${query.data}`
    : null;

  return {
    ...query,
    qrCodeSrc,
  };
}

export function useChildQrCode({ childId }: { childId: string }) {
  const { data: user } = useUserProfile();
  const { data: parentZonesRes } = useParentZones();

  const onboardingCode =
    parentZonesRes?.[0].parentChildren.find((child: any) => child.childId === childId)?.child
      ?.onboardingCode || null;

  const activeZoneId = user?.zoneId?.[0]?.id || parentZonesRes?.[0]?.id;

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(activeZoneId || "", onboardingCode),
    getQrCodeAction,
    [activeZoneId as string, onboardingCode],
    {
      enabled: !!activeZoneId,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 1,
    }
  );

  const qrCodeSrc = query.data
    ? query.data.startsWith("data:image")
      ? query.data
      : `data:image/png;base64,${query.data}`
    : null;

  return {
    ...query,
    qrCodeSrc,
  };
}
