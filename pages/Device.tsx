"use client";

import IconWrapper from "@/features/child-profile/ui/IconWrapper";
import DateDropdown from "@/features/device/ui/date-dropdown";
import { TABS } from "@/shared/lib/constants";
import Back from "@/shared/ui/go-back";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { Trash, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import General from "./General";

const Device = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showDelete, setShowDelete] = useState(false);

  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/device/device-id?tab=${tab}`);
  };

  return (
    <div>
      <div className="mb-20 flex items-center justify-between">
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
    </div>
  );
};

export default Device;
