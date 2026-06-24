"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useZoneDevices } from "@/features/mdm-sync/model/useMdmSync";
import { getRestrictionsAction } from "@/features/mdm-sync/api/restrictions.actions";
import type { Restrictions } from "@/features/mdm-sync/types";
import type { ApiResponse } from "@/shared/api/types";

const SAMPLE_SIZE = 20;
const RESTRICTIONS_STALE_MS = 5 * 60 * 1_000;

export interface BlockedWebsiteRow {
  domain: string;
  name: string;
  devices: number;
}

export function useBlacklistedWebsites() {
  const { user } = useAuth();
  const zoneId = user?.zoneId;

  const { data: zoneDevices, isLoading: isLoadingDevices } = useZoneDevices(zoneId ?? undefined);

  const sampleIds = useMemo(
    () =>
      (zoneDevices ?? [])
        .slice(0, SAMPLE_SIZE)
        .map((d) => d.deviceId)
        .filter(Boolean),
    [zoneDevices]
  );

  const restrictionsQueries = useQueries({
    queries: sampleIds.map((mdmId) => ({
      queryKey: ["mdm-sync", "restrictions", mdmId],
      queryFn: async (): Promise<Restrictions | null> => {
        const result = await getRestrictionsAction(mdmId);
        return result.success
          ? ((result.data as ApiResponse<Restrictions>)?.data ?? null)
          : null;
      },
      staleTime: RESTRICTIONS_STALE_MS,
      enabled: sampleIds.length > 0,
    })),
  });

  const isLoading = isLoadingDevices || restrictionsQueries.some((q) => q.isLoading);

  const websites = useMemo((): BlockedWebsiteRow[] => {
    const map = new Map<string, { name: string; count: number }>();

    for (const q of restrictionsQueries) {
      const restrictions = q.data as Restrictions | null;
      for (const d of restrictions?.domains ?? []) {
        if (!d.domain) continue;
        const key = d.domain.toLowerCase().replace(/^www\./, "");
        const existing = map.get(key);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(key, { name: d.name ?? "—", count: 1 });
        }
      }
    }

    return Array.from(map.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([domain, { name, count }]) => ({ domain, name, devices: count }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restrictionsQueries.map((q) => q.dataUpdatedAt).join(",")]);

  return { isLoading, websites };
}
