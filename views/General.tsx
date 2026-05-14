import { MetricCard } from "@/features/dashboard/business/ui/MetricCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { MapCard } from "@/features/general/ui/map-card";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";

import { MetricCardSkeleton, InfoListCardSkeleton } from "@/features/device/ui/DeviceTabsSkeletons";
import { Skeleton } from "@/shared/ui/skeleton";

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

  if (isHardwarePending || isAppsPending || isNetworkPending) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <InfoListCardSkeleton />
        <div className="col-span-2">
          <Skeleton className="h-[400px] rounded-[32px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
      <MetricCard
        title="Memory"
        value={`${storageUsedGB} GB of ${totalStorageGB} GB`}
        chartColor={storageColor}
        chartData={[20, 30, 40, 50, 60, 70, 100 - freePercent]}
        footerText={storageFooter}
      />
      <MetricCard
        title="Battery health"
        value={`${batteryLevel}%`}
        chartColor={batteryColor}
        chartData={[100, 90, 80, 70, 65, 60, batteryLevel]}
        footerText={batteryFooter}
      />

      <InfoListCard
        title="Top 5 apps"
        actionText="View all"
        onActionClick={() => console.log("View Apps")}
        items={top5Apps}
      />
      <MapCard deviceId={deviceId} />
    </div>
  );
};

export default General;
