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
import ParentalControlSetup from "@/features/parents/ui/ParentalControlSetup";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import LocationPage from "./Location";
// import ParentalControlSetup from "@/features/onboarding/ui/ParentalControlSetup";

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

    activeTab === tabParam && router.push(`/device/${deviceId}?tab=${tab}`);
  };

  const isMobile = useIsMobile();

  return (
    <div>
      <div className="mb-10 flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {!isMobile && (
          <div className="flex justify-between">
            <div className="flex justify-start">
              <Back label="Back to profile" href="/dashboard" />
            </div>
          </div>
        )}

        <div className="flex w-full flex-col items-stretch gap-4 lg:w-auto lg:flex-row lg:items-center">
          <div className="w-full lg:w-auto">
            <TabNavigation
              tabs={TABS}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              className="w-full"
            />
          </div>

          <div className="ml-auto flex w-full items-center gap-4 lg:w-auto">
            {activeTab !== "configuration" && (
              <div className="flex-1 lg:flex-none">
                <DateDropdown />
              </div>
            )}
            <div className="ml-auto flex lg:ml-0">
              <IconWrapper
                action={() => setShowDelete(true)}
                icon={<Trash2Icon className="h-5 w-5 text-[#D95D55]" />}
              />
            </div>
          </div>
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
      {activeTab === "location" && <LocationPage />}
      {activeTab === "configuration" && <ParentalControlSetup goToPrevStep={() => {}} />}
    </div>
  );
};

export default Device;
