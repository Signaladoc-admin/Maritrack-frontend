"use client";

import { AlertBox } from "@/shared/ui/dashboard/alert-box";
import React from "react";
import { useToast } from "@/shared/ui/toast";
import VisitedWebsites from "@/features/web-history/ui/visited-websites";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { websiteData } from "@/features/general/data";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

const WebHistory = () => {
  const { toast } = useToast();
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: networkData, isPending } = useDeviceDetail(deviceId, "network", {
    enabled: !!deviceId,
  });
  const fetchedNetwork = networkData?.data?.realTimeStats || {};

  const networkList = Array.isArray(fetchedNetwork)
    ? fetchedNetwork
    : fetchedNetwork?.websites || fetchedNetwork?.data || Object.values(fetchedNetwork || {});

  const websites = Array.isArray(networkList)
    ? networkList.map((net: any) => ({
        id: net?.id || Math.random().toString(),
        name: net?.url || net?.name || "Unknown Website",
        totalTime: net?.totalTime || "Unknown",
        icon: () => <div className="w-full text-center text-xs text-gray-400">WEB</div>,
      }))
    : [];
  console.log("websites", fetchedNetwork);

  return (
    <div className="space-y-6">
      <AlertBox
        type="danger"
        title="You have 13 websites blocked"
        message="Solomon will not be able to access these websites, you'll be notified when he tries to"
        onAction={() => {
          toast({
            type: "info",
            title: "Navigation",
            message: "Navigating to Blocked Websites...",
          });
        }}
        actionLabel="Manage websites"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <VisitedWebsites />
        <div className="col-span-2">
          <InfoListCard
            title="Browsing History"
            actionText="View history"
            onActionClick={() => console.log("View History")}
            items={websites.length > 0 ? websites : websiteData}
          />
        </div>
      </div>
    </div>
  );
};

export default WebHistory;
