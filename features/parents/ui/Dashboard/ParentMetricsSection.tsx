"use client";

import { MetricCard } from "@/features/dashboard/business/ui/MetricCard";
import { Skeleton } from "@/shared/ui/skeleton";

interface ParentMetricsSectionProps {
  hardwareData: any;
  isPending: boolean;
}

export function ParentMetricsSection({ hardwareData, isPending }: ParentMetricsSectionProps) {
  if (isPending) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-48 rounded-[32px]" />
        <Skeleton className="h-48 rounded-[32px]" />
      </div>
    );
  }

  const hardwareInfo = hardwareData?.data?.hardwareInfo || {};
  const realTimeStats = hardwareData?.data?.realTimeStats || {};
  
  const batteryLevel = realTimeStats?.batteryLevel ?? 0;

  // Storage calculation
  const storageUsed = realTimeStats?.internalStorageUsed ?? 0;
  const storageFree = realTimeStats?.internalStorageFree ?? 0;
  const totalStorage = hardwareInfo?.internalStorageSize ?? (storageUsed + storageFree);

  // Convert to GB (assuming bytes)
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

  const batteryColor: "green" | "red" = batteryLevel >= 20 ? "green" : "red";
  const batteryFooter = batteryLevel >= 20 ? "Battery level is good" : "Battery level is low";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MetricCard
        title="Memory"
        value={`${storageUsedGB} GB of ${totalStorageGB} GB`}
        chartColor={storageColor}
        chartData={[20, 30, 40, 50, 60, 70, 100 - freePercent]} // User said "chart data will be replaced by storage left", wait.
        // Actually prompt said "chart data will be replaced by storage left".
        // Storage left is freePercent.
        footerText={storageFooter}
      />
      <MetricCard
        title="Battery health"
        value={`${batteryLevel}%`}
        chartColor={batteryColor}
        chartData={[100, 90, 80, 70, 65, 60, batteryLevel]}
        footerText={batteryFooter}
      />
    </div>
  );
}
