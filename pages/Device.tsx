"use client";

import IconWrapper from "@/features/child-profile/ui/IconWrapper";
import DateDropdown from "@/features/device/ui/date-dropdown";
import { TABS } from "@/shared/lib/constants";
import Back from "@/shared/ui/go-back";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { Trash, Trash2Icon } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import General from "./General";
import WebHistory from "./WebHistory";
import AppControl from "./AppControl";

const Device = () => {
  const router = useRouter();
  const params = useParams<{ device: string }>();
  const searchParams = useSearchParams();

  const tabParam = searchParams?.get("tab") || "general";
  const [activeTab, setActiveTab] = useState(tabParam);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const deviceId = params?.device || "device-id";
    router.push(`/device/${deviceId}?tab=${tab}`);
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <Back label="Back to profile" />

        <div className="flex items-center gap-4">
          <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
          <DateDropdown />
          <IconWrapper
            action={() => setShowDelete(true)}
            icon={<Trash2Icon className="h-4 w-4 text-[#B34740]" />}
          />
        </div>
      </div>

      <ConfirmationModal
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Are you sure you want to delete this device?"
        description="Deleting this device cannot be reverted. Are you sure?"
        confirmText="Delete"
        onConfirm={() => console.log("Deleted")}
        variant="destructive"
      />

      {activeTab === "general" && <General />}
      {activeTab === "web-history" && <WebHistory />}
      {activeTab === "app-control" && <AppControl />}
    </div>
  );
};

export default Device;
