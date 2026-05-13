"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getDeviceDetailAction, DeviceDetailFilter } from "../api/device.actions";

export const deviceDetailKeys = {
  all: ["deviceDetail"] as const,
  filter: (id: string, filter: DeviceDetailFilter) => ["deviceDetail", id, filter] as const,
};

export function useDeviceDetail(id: string, filter: DeviceDetailFilter, options?: { enabled?: boolean }) {
  return useServerActionQuery(
    deviceDetailKeys.filter(id, filter),
    getDeviceDetailAction,
    [id, filter],
    {
      ...options,
      enabled: options?.enabled !== undefined ? options.enabled : !!id,
    }
  );
}
