"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  createZoneAction,
  createBusinessZoneAction,
  getQrCodeAction,
  getParentZonesAction,
  getBusinessZonesAction,
  getZoneDevicesAction,
  getParentZoneAction,
  getBusinessZoneAction,
  setAppLimitAction,
  blockAppAction,
  unblockAppAction,
  uninstallAppAction,
  getAppLimitsAction,
  getZoneAction,
  lockDeviceAction,
  unlockDeviceAction,
  wipeDeviceAction,
} from "../api/mdm-sync.actions";
import { useToast } from "@/shared/ui/toast";
import { AppRole } from "@/features/parents/ui/DeviceConfigurationSetup";
import { getDeviceAssignmentIdAction } from "@/entities/device/api/device-assignment.actions";
import { QueryOptions } from "@/shared/api/types";

export const mdmSyncKeys = {
  all: ["mdm-sync"] as const,
  zones: ["mdm-sync", "zones"] as const,
  parentZones: ["mdm-sync", "parentZones"] as const,
  parentZone: ["mdm-sync", "parentZone"] as const,
  businessZones: ["mdm-sync", "businessZones"] as const,
  businessZone: ["mdm-sync", "businessZone"] as const,
  zoneDevices: (zoneId: string) => ["mdm-sync", "zoneDevices", zoneId] as const,
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
  appLimits: (deviceId: string) => ["mdm-sync", "appLimits", deviceId] as const,
  deviceAssignmentId: (deviceId: string) => ["mdm-sync", "deviceAssignmentId", deviceId] as const,
};

export function useCreateZone() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(createZoneAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.all });
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
export function useParentZone(options?: { enabled?: boolean }) {
  return useServerActionQuery(mdmSyncKeys.parentZone, getParentZoneAction, [], {
    ...options,
    retry: 0,
  });
}

export function useCreateBusinessZone() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(createBusinessZoneAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.all });
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
export function useBusinessZone(options?: { enabled?: boolean }) {
  return useServerActionQuery(mdmSyncKeys.businessZone, getBusinessZoneAction, [], {
    ...options,
    retry: 0,
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

export function useZone(appRole: "PARENT" | "BUSINESS", options?: { enabled?: boolean }) {
  return useServerActionQuery(
    appRole === "PARENT" ? mdmSyncKeys.parentZone : mdmSyncKeys.businessZone,
    () => getZoneAction(appRole as AppRole),
    [],
    {
      ...options,
      retry: 0,
    }
  );
}

export function useSetAppLimit() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(setAppLimitAction, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mdmSyncKeys.appLimits(variables.deviceId) });
      toast({
        title: "Success",
        message: "App limit set successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to set app limit",
        type: "error",
      });
    },
  });
}

export function useGetAppLimit(deviceId: string | undefined, options?: { enabled?: boolean }) {
  return useServerActionQuery(
    mdmSyncKeys.appLimits(deviceId || ""),
    getAppLimitsAction,
    [deviceId as string],
    {
      ...options,
      retry: 0,
      enabled: !!deviceId && options?.enabled !== false,
    }
  );
}

export function useBlockApp() {
  const { toast } = useToast();

  return useServerActionMutation(blockAppAction, {
    onSuccess: () => {
      toast({
        title: "Success",
        message: "App blocked successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to block app",
        type: "error",
      });
    },
  });
}

export function useUnblockApp() {
  const { toast } = useToast();

  return useServerActionMutation(unblockAppAction, {
    onSuccess: () => {
      toast({
        title: "Success",
        message: "App unblocked successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to unblock app",
        type: "error",
      });
    },
  });
}

export function useUninstallApp() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useServerActionMutation(uninstallAppAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deviceDetail"] });
      toast({
        title: "Success",
        message: "App uninstall command sent successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to uninstall app",
        type: "error",
      });
    },
  });
}

export function useGetDeviceAssignmentId(
  options?: {
    enabled?: boolean;
    deviceId: string | undefined;
    userId: string | undefined;
  } & QueryOptions
) {
  return useServerActionQuery(
    mdmSyncKeys.deviceAssignmentId(options?.deviceId || ""),
    getDeviceAssignmentIdAction,
    [options?.deviceId as string, options?.userId as string],
    {
      ...options,
      retry: 0,
      enabled: !!options?.deviceId && options?.enabled !== false,
    }
  );
}

export function useLockDevice() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useServerActionMutation(lockDeviceAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deviceDetail"] });
      toast({
        title: "Success",
        message: "Device locked successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to lock device",
        type: "error",
      });
    },
  });
}

export function useUnlockDevice() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useServerActionMutation(unlockDeviceAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deviceDetail"] });
      toast({
        title: "Success",
        message: "Device unlocked successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to unlock device",
        type: "error",
      });
    },
  });
}

export function useWipeDevice() {
  const { toast } = useToast();

  return useServerActionMutation(wipeDeviceAction, {
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Wipe command sent successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to wipe device",
        type: "error",
      });
    },
  });
}
