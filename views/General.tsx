import { appData } from "@/app/(in-app)/dashboard/data";
import { MetricCard } from "@/features/dashboard/business/ui/MetricCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { StatsCard } from "@/shared/ui/cards/stats-card";
import { Power } from "lucide-react";
import { AlertsSummaryCard } from "@/features/dashboard/business/ui/AlertsSummaryCard";
import { ActivityTimeline, TimelineItem } from "@/shared/ui/lists/activity-timeline";
import { websiteData } from "@/features/general/data";
import { MapCard } from "@/features/general/ui/map-card";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

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

  const fetchedApps = appsData?.data?.apps || [];
  const fetchedHardware = hardwareData?.data?.hardwareInfo || {};
  const fetchedNetwork = networkData?.data?.realTimeStats || {};

  console.log("appsData", fetchedApps);
  console.log("hardwareData", fetchedHardware);
  console.log("networkData", fetchedNetwork);

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

  // const networkList = Array.isArray(fetchedNetwork)
  //   ? fetchedNetwork
  //   : fetchedNetwork?.websites || fetchedNetwork?.data || Object.values(fetchedNetwork || {});

  // const top5Websites = Array.isArray(networkList)
  //   ? networkList.slice(0, 5).map((net: any) => ({
  //       id: net?.id || Math.random().toString(),
  //       name: net?.url || net?.name || "Unknown Website",
  //       totalTime: net?.totalTime || "Unknown",
  //       icon: () => <div className="w-full text-center text-xs text-gray-400">WEB</div>,
  //     }))
  //   : [];

  console.log("top 5 webistes:", fetchedNetwork);

  const batteryHealth = fetchedNetwork?.batteryLevel ? `${fetchedNetwork.batteryLevel}%` : "60%";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        label="SafeSearch status"
        value="Active"
        description="since 2 months 3 days"
        dotColor="bg-[#00E096]"
        action={{
          icon: Power,
          onClick: () => console.log("Toggle SafeSearch"),
          className: "bg-[#00B087]",
        }}
      />
      <MetricCard
        title="Total Screen Time"
        value="4h 20"
        trendValue="+1h"
        trendType="positive"
        chartColor="green"
        chartData={[30, 45, 60, 80, 70, 90, 100]}
      />
      <MetricCard
        title="Battery health"
        value={batteryHealth}
        trendValue="-10%"
        trendType="negative"
        chartColor="red"
        chartData={[100, 90, 80, 70, 65, 60, 55]}
      />

      <InfoListCard
        title="Top 5 apps"
        actionText="View all"
        onActionClick={() => console.log("View Apps")}
        items={top5Apps.length > 0 ? top5Apps : appData}
      />

      <AlertsSummaryCard
        variant="warning"
        title="Attention needed"
        subtitle="2 alerts require review"
        footerActionText="Review alerts"
        items={[
          { id: "1", title: "Screen time exceeded", subtitle: "Kuroebi" },
          { id: "2", title: "Blocked app attempt", subtitle: "Solomon" },
        ]}
      />
      <ActivityTimeline>
        <TimelineItem time="10:00 AM" title="Safety Check" app="Location" statusColor="green" />
        <TimelineItem time="08:30 AM" title="App Install Blocked" app="Unknown" statusColor="red" />
        <TimelineItem
          time="Yesterday"
          title="Weekly Report"
          app="System"
          statusColor="blue"
          isLast
        />
      </ActivityTimeline>

      {/* <InfoListCard
        title="Top 5 Websites"
        actionText="View history"
        onActionClick={() => console.log("View History")}
        items={top5Websites.length > 0 ? top5Websites : websiteData}
      /> */}
      <div className="col-span-2">
        <MapCard />
      </div>
    </div>
  );
};

export default General;
