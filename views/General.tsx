import { appData } from "@/app/(in-app)/dashboard/data";
import { MetricCard } from "@/features/dashboard/ui/MetricCard";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { StatsCard } from "@/shared/ui/cards/stats-card";
import { Instagram, MessageSquare, Power, Youtube } from "lucide-react";
import { AlertsSummaryCard } from "@/features/dashboard/ui/AlertsSummaryCard";
import { ActivityTimeline, TimelineItem } from "@/shared/ui/lists/activity-timeline";
import { websiteData } from "@/features/general/data";
import { MapCard } from "@/features/general/ui/map-card";

const General = () => {
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
        value="60%"
        trendValue="-10%"
        trendType="negative"
        chartColor="red"
        chartData={[100, 90, 80, 70, 65, 60, 55]}
      />

      <InfoListCard
        title="To 5 apps"
        actionText="View all"
        onActionClick={() => console.log("View Apps")}
        items={appData}
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

      <InfoListCard
        title="Top 5 Websites"
        actionText="View history"
        onActionClick={() => console.log("View History")}
        items={websiteData}
      />
      <div className="col-span-2">
        <MapCard />
      </div>
    </div>
  );
};

export default General;
