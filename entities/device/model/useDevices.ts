"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  getDeviceAction,
  getDevicesAction,
  markDeviceAsReturnedAction,
} from "../api/device.actions";
import type { DeviceQueryOptions } from "./types";

export type { DeviceQueryOptions };

const deviceKeys = {
  list: (options: DeviceQueryOptions) => ["devices", "list", options] as const,
  item: (deviceId: string) => ["devices", "item", deviceId] as const,
};

export function useDevices(options: DeviceQueryOptions = {}) {
  return useServerActionQuery(deviceKeys.list(options), getDevicesAction, [options], {
    retry: false,
  });
}

export function useDevice(deviceId: string) {
  return useServerActionQuery(deviceKeys.item(deviceId), getDeviceAction, [deviceId], {
    retry: false,
  });
}

export function useMarkDeviceAsReturned(deviceId: string) {
  const queryClient = useQueryClient();
  return useServerActionMutation(
    (flagReason: string) => markDeviceAsReturnedAction(deviceId, flagReason),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: deviceKeys.list({}) });
        queryClient.invalidateQueries({ queryKey: deviceKeys.item(deviceId) });
      },
    }
  );
}

export { deviceKeys };
