"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useBlockApp, useUnblockApp, useUninstallApp } from "@/features/mdm-sync/model/useMdmSync";
import { Skeleton } from "@/shared/ui/skeleton";
import { Trash2 } from "lucide-react";
import { UninstallAppModal } from "@/features/app-control/ui/UninstallAppModal";

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
  const uninstallAppMutation = useUninstallApp();

  const [apps, setApps] = useState<InstalledApp[]>([]);
  const [appToUninstall, setAppToUninstall] = useState<InstalledApp | null>(null);
  const [isUninstallModalOpen, setIsUninstallModalOpen] = useState(false);

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

  const handleConfirmUninstall = async () => {
    if (!appToUninstall || !deviceId) return;
    try {
      await uninstallAppMutation.mutateAsync({
        deviceId,
        packageName: appToUninstall.packageName,
      });
      setApps((prev) => prev.filter((a) => a.id !== appToUninstall.id));
      setIsUninstallModalOpen(false);
      setAppToUninstall(null);
    } catch {
      // Error toast is handled by hook
    }
  };

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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
      {/* Left Column */}
      {/* <div className="flex flex-col gap-6 lg:col-span-1">
        {isPending ? (
          <>
            <Skeleton className="h-48 rounded-[32px]" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-64 rounded-[32px]" />
            </div>
          ) : apps.length === 0 ? (
            <div className="py-12 text-center text-xs text-[var(--text-3)]">
              No user applications installed on this device.
            </div>
          </>
        )}
      </div> */}

      {/* Right Column - Swappable */}
      <div className="lg:w-full">
        {view === "detail" && selectedApp ? (
          <AppDetailView app={selectedApp} onBack={() => setView("list")} />
        ) : (
          <AllAppsCard
            apps={fetchedApps}
            isLoading={isPending}
            onViewApp={(appId) => {
              setSelectedAppId(appId);
              setView("detail");
            }}
          />
        )}
      </div>

      {/* Uninstall Confirmation Modal */}
      <UninstallAppModal
        open={isUninstallModalOpen}
        onOpenChange={setIsUninstallModalOpen}
        app={appToUninstall}
        onConfirm={handleConfirmUninstall}
        isLoading={uninstallAppMutation.isPending}
      />
    </div>
  );
};

export default AppControl;
