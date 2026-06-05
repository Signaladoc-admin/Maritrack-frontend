import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

import { MetricCardSkeleton, InfoListCardSkeleton } from "@/features/device/ui/DeviceTabsSkeletons";
import { Skeleton } from "@/shared/ui/skeleton";
import DeviceDetailsGeneralTabContent from "@/features/dashboard/business/ui/DeviceDetailsGeneralTabContent";
import { useAuth } from "@/shared/auth/AuthProvider";

const General = () => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId }
  );

  const { data: networkData, isPending: isNetworkPending } = useDeviceDetail(deviceId, "network", {
    enabled: !!deviceId,
  });

  const { data: appsData, isPending: isAppsPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const fetchedApps = (appsData?.data?.apps || []).filter((app: any) => app.systemApp === false);
  const fetchedHardware = hardwareData?.data?.hardwareInfo || {};
  const fetchedNetwork = networkData?.data?.realTimeStats || {};

  const top5Apps = Array.isArray(fetchedApps)
    ? fetchedApps.slice(0, 5).map((app: any) => ({
      id: app.id,
      name: app.appName || app.packageName,
      totalTime: app.totalTime || `Size: ${app.installedAPKSize || 0}`,
      icon: () => (
        <div className="w-full text-center text-xs text-gray-400">{app.appName?.slice(0, 2)}</div>
      ),
      limits: app.limits || 0,
    }))
    : [];

  const batteryLevel = fetchedNetwork?.batteryLevel ?? 0;
  const batteryColor: "green" | "red" = batteryLevel >= 20 ? "green" : "red";
  const batteryFooter = batteryLevel >= 20 ? "Battery level is good" : "Battery level is low";

  // Storage logic
  const storageUsed = hardwareData?.data?.realTimeStats?.internalStorageUsed ?? 0;
  const storageFree = hardwareData?.data?.realTimeStats?.internalStorageFree ?? 0;
  const totalStorage = fetchedHardware?.internalStorageSize ?? storageUsed + storageFree;

  const toGB = (bytes: number) => (bytes / (1024 * 1024 * 1024)).toFixed(1);
  const storageUsedGB = toGB(storageUsed);
  const totalStorageGB = toGB(totalStorage);

  const freePercent = totalStorage > 0 ? (storageFree / totalStorage) * 100 : 0;

  let storageColor: "green" | "yellow" | "red" = "green";
  let storageFooter = "Storage space is a lot";
  if (totalStorage === 0) {
    storageFooter = "No storage info available";
    storageColor = "yellow";
  } else if (freePercent < 10) {
    storageColor = "red";
    storageFooter = "Storage space is too low";
  } else if (freePercent < 30) {
    storageColor = "yellow";
    storageFooter = "Storage space is ok";
  }

  const { user } = useAuth();
  const isBusiness = user?.appRole === "BUSINESS";

  if (isHardwarePending || isAppsPending || isNetworkPending) {
    return (
      <div className="flex flex-col gap-6">
        {isBusiness ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(260px,360px),1fr]">
            <Skeleton className="h-[420px] rounded-[32px]" />
            <div className="flex flex-col gap-6">
              <Skeleton className="h-[120px] rounded-[32px]" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <MetricCardSkeleton />
                <MetricCardSkeleton />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoListCardSkeleton />
          <Skeleton className="h-[400px] rounded-[32px]" />
        </div>
      </div>
    );
  }

  return (
    <DeviceDetailsGeneralTabContent
      storageUsedGB={storageUsedGB}
      totalStorageGB={totalStorageGB}
      storageColor={storageColor}
      storageFooter={storageFooter}
      batteryLevel={batteryLevel}
      batteryColor={batteryColor}
      batteryFooter={batteryFooter}
      top5Apps={top5Apps}
      deviceId={deviceId}
      freePercent={freePercent}
      fullDeviceDetails={hardwareData}
    />
  );
};

export default General;
