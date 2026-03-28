"use client";

import { AlertBox } from "@/shared/ui/dashboard/alert-box";
import React from "react";
import { useToast } from "@/shared/ui/toast";
import VisitedWebsites from "@/features/web-history/ui/visited-websites";
import { InfoListCard } from "@/shared/ui/AppListCard/AppListCard";
import { websiteData } from "@/features/general/data";

const WebHistory = () => {
  const { toast } = useToast();
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
            items={websiteData}
          />
        </div>
      </div>
    </div>
  );
};

export default WebHistory;
