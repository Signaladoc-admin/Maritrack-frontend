"use client";

import { Skeleton } from "@/shared/ui/skeleton";
import Link from "next/link";

interface ParentAppsSectionProps {
  appsData: any;
  isPending: boolean;
  deviceId?: string;
  childId?: string;
}

const ICON_BG_COLORS = ["#01DB5E", "#05E0E5", "#FFB020", "#B28CFF", "#FF6857"];

export function ParentAppsSection({
  appsData,
  isPending,
  deviceId,
  childId,
}: ParentAppsSectionProps) {
  const appsList = appsData?.apps || appsData?.data?.apps || [];
  const fetchedApps = (Array.isArray(appsList) ? appsList : [])
    .filter((app: any) => app.systemApp === false)
    .slice(0, 5)
    .map((app: any, idx: number) => {
      const name = app.appName || app.packageName || "App";
      return {
        id: app.id || app.packageName || String(idx),
        name,
        category: app.category || (app.systemApp ? "System" : "User application"),
        iconLetter: name.charAt(0).toUpperCase(),
        iconBg: ICON_BG_COLORS[idx % ICON_BG_COLORS.length],
        totalTime:
          app.totalTime ||
          (app.installedAPKSize
            ? `Size: ${(app.installedAPKSize / (1024 * 1024)).toFixed(1)} MB`
            : "-"),
      };
    });

  return (
    <div className="surface flex h-full flex-col rounded-[var(--radius-lg)] p-5">
      <div className="mb-3 flex items-center justify-between border-b border-[var(--card-line)] pb-3.5">
        <div>
          <h4 className="text-[13.5px] font-bold text-[var(--text-1)]">Top 5 installed apps</h4>
          <p className="text-[11.5px] text-[var(--text-3)]">Most active applications on device</p>
        </div>
        {deviceId && (
          <Link
            href={`/devices/${deviceId}?tab=appcontrol${childId ? `&childId=${childId}` : ""}`}
            className="cursor-pointer border-none bg-transparent p-0 text-[12px] font-bold text-[var(--green)] hover:underline"
          >
            View all
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col divide-y divide-[var(--card-line)]">
        {isPending ? (
          <div className="flex flex-col divide-y divide-[var(--card-line)]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-2.5 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
          </div>
        ) : fetchedApps.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-10 text-center text-xs text-[var(--text-3)]">
            No application activity reported for this device.
          </div>
        ) : (
          fetchedApps.map((app) => (
            <div className="app-row" key={app.id}>
              <div className="app-icon" style={{ background: app.iconBg, color: "#FFFFFF" }}>
                {app.iconLetter}
              </div>
              <div className="app-body">
                <div className="app-name">{app.name}</div>
                <div className="app-cat">{app.category}</div>
              </div>
              <div className="font-mono text-[12px] font-semibold text-[var(--text-2)]">
                {app.totalTime}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
