"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  exportDevicesAction,
  getDeviceAction,
  getDevicesAction,
  markDeviceAsReturnedAction,
  bulkActionDevicesAction,
  getDeviceMessagesAction,
} from "../api/device.actions";
import type { DeviceQueryOptions } from "./types";
import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";

export type { DeviceQueryOptions };

const deviceKeys = {
  list: (options: DeviceQueryOptions) => ["devices", "list", options] as const,
  item: (deviceId: string) => ["devices", "item", deviceId] as const,
  messages: (deviceId: string, options: { page?: number; limit?: number }) => 
    ["devices", "messages", deviceId, options] as const,
};

export function useDevices(options: DeviceQueryOptions = {}) {
  return useServerActionQuery(deviceKeys.list(options), getDevicesAction, [options], {
    retry: false,
    refetchOnWindowFocus: true,
  });
}

export function useDevice(deviceId: string) {
  return useServerActionQuery(deviceKeys.item(deviceId), getDeviceAction, [deviceId], {
    retry: false,
  });
}

export function useDeviceMessages(deviceId: string, options: { page?: number; limit?: number } = {}) {
  return useServerActionQuery(
    deviceKeys.messages(deviceId, options),
    getDeviceMessagesAction,
    [deviceId, options],
    {
      retry: false,
      enabled: !!deviceId,
    }
  );
}

export function useMarkDeviceAsReturned(
  deviceId: string,
  flaggedByUserId: string | undefined,
  options: { enabled?: boolean }
) {
  const queryClient = useQueryClient();
  return useServerActionMutation(
    (flagReason: string) => markDeviceAsReturnedAction(deviceId, flagReason, flaggedByUserId),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: deviceKeys.list({}) });
        queryClient.invalidateQueries({ queryKey: deviceKeys.item(deviceId) });
        // Device hardware/assignment details (drives the "returned" status shown on the device page)
        queryClient.invalidateQueries({ queryKey: ["deviceDetail"] });
        // Staff member lists/details embed device assignment info (e.g. AssociatedDevicesTable)
        queryClient.invalidateQueries({ queryKey: ["staff-members"] });
        // Zone device lists used on the dashboard
        queryClient.invalidateQueries({ queryKey: ["mdm-sync", "zoneDevices"] });
      },
    }
  );
}

export { deviceKeys };

export function useGetStaffMemberDevice(staffId: string) {
  const { data: staffMember } = useGetStaffMember(staffId);

  return staffMember?.device ? [staffMember.device] : [];
}

export function useExportDevices(options: { enabled?: boolean } = {}) {
  return useServerActionQuery(["export-devices"], exportDevicesAction, [], {
    retry: false,
    enabled: options.enabled,
  });
}

export function useBulkActionDevices(options: { onSuccess?: () => void } = {}) {
  const queryClient = useQueryClient();
  return useServerActionMutation(
    ({ ids, actionId, messageText }: { ids: string[]; actionId: number; messageText?: string }) =>
      bulkActionDevicesAction(ids, actionId, messageText),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: deviceKeys.list({}) });
        if (options.onSuccess) {
          options.onSuccess();
        }
      },
    }
  );
}
