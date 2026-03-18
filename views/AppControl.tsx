import React from "react";
import { ScreenTimeCard } from "@/features/app-control/ui/ScreenTimeCard";
import { AllAppsCard, apps } from "@/features/app-control/ui/AllAppsCard";
import { MostUsedAppsCard } from "@/shared/ui/MostUsedAppsCard/MostUsedAppsCard";
import { AppDetailView } from "@/features/app-control/ui/AppDetailView";

const AppControl = () => {
  const [view, setView] = React.useState<"list" | "detail">("list");
  const [selectedAppId, setSelectedAppId] = React.useState<string | null>(null);

  const selectedApp = apps.find((a) => a.id === selectedAppId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Static */}
      <div className="flex flex-col gap-6 lg:col-span-1">
        <ScreenTimeCard />
        <div className="space-y-4">
          <h3 className="text-base font-medium text-[#667085]">Most Used Apps</h3>
          <MostUsedAppsCard />
        </div>
      </div>

      {/* Right Column - Swappable */}
      <div className="lg:col-span-2">
        {view === "detail" && selectedApp ? (
          <AppDetailView app={selectedApp} onBack={() => setView("list")} />
        ) : (
          <AllAppsCard
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
