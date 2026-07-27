import React from "react";
import { ScreenTimeCard } from "@/features/app-control/ui/ScreenTimeCard";
import { AllAppsCard } from "@/features/app-control/ui/AllAppsCard";
import { MostUsedAppsCard } from "@/shared/ui/MostUsedAppsCard/MostUsedAppsCard";
import { AppDetailView } from "@/features/app-control/ui/AppDetailView";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

import { Skeleton } from "@/shared/ui/skeleton";

const AppControl = () => {
  const params = useParams<{ device: string }>();
  const [view, setView] = React.useState<"list" | "detail">("list");
  const [selectedAppId, setSelectedAppId] = React.useState<string | null>(null);

  const { data, isPending } = useDeviceDetail(params?.device || "", "apps", {
    enabled: !!params?.device,
  });
  const fetchedApps = (data?.data?.apps || []).filter((app: any) => app.systemApp === false);

  const selectedApp = fetchedApps.find((a: any) => a.id === selectedAppId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        {isPending ? (
          <>
            <Skeleton className="h-48 rounded-[32px]" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-64 rounded-[32px]" />
            </div>
          </>
        ) : (
          <>
            <ScreenTimeCard />
            <div className="space-y-4">
              <h3 className="text-base font-medium text-[#667085]">Most Used Apps</h3>
              <MostUsedAppsCard />
            </div>
          </>
        )}
      </div>

      {/* Right Column - Swappable */}
      <div className="lg:col-span-2">
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
    </div>
  );
};

export default AppControl;
