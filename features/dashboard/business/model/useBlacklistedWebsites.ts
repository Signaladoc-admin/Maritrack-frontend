"use client";

import { useMemo } from "react";
import { useDevices } from "@/entities/device/model/useDevices";

export interface BlockedWebsiteRow {
  domain: string;
  name: string;
  devices: number;
}

export function useBlacklistedWebsites() {
  const { data, isLoading } = useDevices({ limit: 100 });

  const websites = useMemo((): BlockedWebsiteRow[] => {
    const devices = data?.devices ?? [];

    // Aggregate per normalised domain: count devices + keep the first name seen.
    const map = new Map<string, { name: string; count: number }>();
    for (const device of devices) {
      for (const bd of device.BlockedDomains ?? []) {
        if (!bd.domain) continue;
        const key = bd.domain.toLowerCase().replace(/^www\./, "");
        const existing = map.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(key, { name: bd.name ?? "—", count: 1 });
        }
      }
    }

    return Array.from(map.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([domain, { name, count }]) => ({ domain, name, devices: count }));
  }, [data]);

  return { isLoading, websites };
}
