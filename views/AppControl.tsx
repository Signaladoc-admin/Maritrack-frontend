"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useBlockApp, useUnblockApp } from "@/features/mdm-sync/model/useMdmSync";
import { Skeleton } from "@/shared/ui/skeleton";

interface InstalledApp {
  id: string;
  packageName: string;
  name: string;
  category: string;
  iconLetter: string;
  iconBg: string;
  enabled: boolean;
  disabled?: boolean;
}

const AppControl = () => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data, isPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const blockAppMutation = useBlockApp();
  const unblockAppMutation = useUnblockApp();

  const [apps, setApps] = useState<InstalledApp[]>([]);

  useEffect(() => {
    if (data?.data?.apps && Array.isArray(data.data.apps)) {
      const palette = ["#25D366", "#05E0E5", "#FF6857", "#8B5CF6", "#3B82F6", "#EC4899"];
      // Strictly filter to ONLY display user applications and NOT system applications
      const userApps = data.data.apps.filter((app: any) => !app.systemApp);

      const mapped: InstalledApp[] = userApps.map((app: any, index: number) => {
        const name = app.appName || app.packageName || "App";
        return {
          id: app.id || app.packageName || `app-${index}`,
          packageName: app.packageName || app.id,
          name,
          category: "User application",
          iconLetter: name.slice(0, 1).toUpperCase(),
          iconBg: palette[index % palette.length],
          enabled: !app.blocked,
          disabled: false,
        };
      });
      setApps(mapped);
    }
  }, [data]);

  const toggleApp = (app: InstalledApp) => {
    if (app.disabled) return;
    const willEnable = !app.enabled;
    setApps((prev) => prev.map((a) => (a.id === app.id ? { ...a, enabled: willEnable } : a)));
    if (willEnable) {
      unblockAppMutation.mutate({ deviceId, packageName: app.packageName });
    } else {
      blockAppMutation.mutate({ deviceId, packageName: app.packageName });
    }
  };

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      <div className="dd-section">
        <div className="dd-section-title">
          <span>Installed user apps</span>
          {!isPending && (
            <span className="text-[11px] font-bold tracking-wider text-[var(--text-3)] uppercase">
              {apps.length} apps
            </span>
          )}
        </div>

        <div className="surface" style={{ padding: "6px 22px" }}>
          {isPending ? (
            <div className="flex flex-col divide-y divide-[var(--card-line)] py-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-10 rounded-full" />
                </div>
              ))}
            </div>
          ) : apps.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--text-3)]">
              No user applications installed on this device.
            </div>
          ) : (
            apps.map((app) => (
              <div className="app-row" key={app.id}>
                <div className="app-icon" style={{ background: app.iconBg, color: "#FFFFFF" }}>
                  {app.iconLetter}
                </div>
                <div className="app-body">
                  <div className="app-name">{app.name}</div>
                  <div className="app-cat">{app.category}</div>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={app.enabled}
                    disabled={app.disabled}
                    onChange={() => toggleApp(app)}
                  />
                  <span className="track"></span>
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">App limits</div>
        <div className="surface" style={{ padding: "6px 22px" }}>
          <div className="config-row">
            <div className="config-body">
              <div className="config-title">Daily screen time cap</div>
              <div className="config-desc">Restrict total non-essential app usage per day.</div>
            </div>
            <select className="form-select config-select" defaultValue="4 hours / day">
              <option>No limit</option>
              <option>4 hours / day</option>
              <option>6 hours / day</option>
              <option>8 hours / day</option>
            </select>
          </div>
          <div className="config-row" style={{ borderBottom: "none" }}>
            <div className="config-body">
              <div className="config-title">Social &amp; entertainment apps</div>
              <div className="config-desc">Limit access to non-essential apps.</div>
            </div>
            <select className="form-select config-select" defaultValue="Blocked">
              <option>Blocked</option>
              <option>1 hour / day</option>
              <option>Unrestricted</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppControl;
