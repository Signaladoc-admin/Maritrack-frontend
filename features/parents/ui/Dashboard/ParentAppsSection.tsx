"use client";

import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { Skeleton } from "@/shared/ui/skeleton";

interface ParentAppsSectionProps {
  appsData: any;
  isPending: boolean;
}

export function ParentAppsSection({ appsData, isPending }: ParentAppsSectionProps) {
  if (isPending) {
    return <Skeleton className="h-[400px] w-full rounded-[24px]" />;
  }

  const fetchedApps = (appsData?.data?.apps || [])
    .filter((app: any) => app.systemApp === false)
    .slice(0, 5);

  return (
    <InfoListCard
      title="Most used apps"
      actionText="View all"
      onActionClick={() => console.log("View Apps")}
      items={
        fetchedApps.length > 0
          ? fetchedApps.map((app: any) => ({
              id: app.id,
              name: app.appName || app.packageName,
              totalTime: app.totalTime || `Size: ${app.installedAPKSize || 0}`,
              icon: () => (
                <div className="w-full text-center text-xs text-gray-400">
                  {app.appName?.slice(0, 2)}
                </div>
              ),
              limits: app.limits || 0,
            }))
          : [] // Show empty if no apps found
      }
    />
  );
}
