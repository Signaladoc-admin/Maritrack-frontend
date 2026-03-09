"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getQrCodeAction } from "../api/mdm-sync.actions";

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
