"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  createZoneAction,
  createBusinessZoneAction,
  getQrCodeAction,
  getParentZonesAction,
  getBusinessZonesAction,
  assignUserToDeviceAction,
  getZoneDevicesAction,
} from "../api/mdm-sync.actions";
import { useToast } from "@/shared/ui/toast";

export const mdmSyncKeys = {
  all: ["mdm-sync"] as const,
  zones: ["mdm-sync", "zones"] as const,
  parentZones: ["mdm-sync", "parentZones"] as const,
  businessZones: ["mdm-sync", "businessZones"] as const,
  zoneDevices: (zoneId: string) => ["mdm-sync", "zoneDevices", zoneId] as const,
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
};

export function useCreateZone() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(createZoneAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.zones });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to create zone",
        type: "error",
      });
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

export function useParentZones(options?: { enabled?: boolean }) {
  return useServerActionQuery(mdmSyncKeys.parentZones, getParentZonesAction, [], {
    ...options,
    retry: 0,
  });
}

export function useCreateBusinessZone() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(createBusinessZoneAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.businessZones });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to create business zone",
        type: "error",
      });
    },
  });
}

export function useBusinessZones(options?: { enabled?: boolean }) {
  return useServerActionQuery(mdmSyncKeys.businessZones, getBusinessZonesAction, [], {
    ...options,
    retry: 0,
  });
}

export function useAssignUserToDevice() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(assignUserToDeviceAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.businessZones });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to assign user to device",
        type: "error",
      });
    },
  });
}

// export function useGetZoneDevices(zoneId: string | undefined, options?: { enabled?: boolean }) {
export function useZoneDevices(zoneId: string | undefined, options?: { enabled?: boolean }) {
  return useServerActionQuery(
    mdmSyncKeys.zoneDevices(zoneId || ""),
    getZoneDevicesAction,
    [zoneId as string],
    {
      ...options,
      retry: 0,
      enabled: !!zoneId,
    }
  );
}
