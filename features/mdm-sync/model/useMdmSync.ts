import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import { createZoneAction, getQrCodeAction, getParentZonesAction } from "../api/mdm-sync.actions";

export const mdmSyncKeys = {
  all: ["mdm-sync"] as const,
  zones: ["mdm-sync", "zones"] as const,
  parentZones: ["mdm-sync", "parentZones"] as const,
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
};

export function useCreateZone() {
  const queryClient = useQueryClient();

  return useServerActionMutation(createZoneAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.zones });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

export function useGetQrCode(zoneId: string | undefined, onboardingCode: string | undefined) {
  return useServerActionQuery(
    mdmSyncKeys.qrcode(zoneId || "", onboardingCode || ""),
    getQrCodeAction,
    [zoneId as string, onboardingCode as string],
    { enabled: !!zoneId && !!onboardingCode }
  );
}

export function useParentZones() {
  return useServerActionQuery(mdmSyncKeys.parentZones, getParentZonesAction, []);
}
