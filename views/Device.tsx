"use client";

import IconWrapper from "@/features/child-profile/ui/IconWrapper";
import DateDropdown from "@/features/device/ui/date-dropdown";
import { TABS } from "@/shared/lib/constants";
import Back from "@/shared/ui/go-back";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { Smartphone, Trash2Icon, X } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import General from "./General";
import WebHistory from "./WebHistory";
import AppControl from "./AppControl";
import { MarkAsReturnedModal } from "@/features/device/ui/MarkAsReturnedModal";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { useAuth } from "@/shared/auth/AuthProvider";
import { Button } from "@/shared/ui/button";
import { useDevice } from "@/entities/device";
import LocationPage from "./Location";
import DevicesConfigurationSetup from "@/features/parents/ui/DeviceConfigurationSetup";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import ReassignDeviceModal from "@/features/business-users/users/ui/ReassignDeviceModal";
import { DeviceHeaderSkeleton } from "./DeviceHeaderSkeleton";
import DeviceActions from "./DeviceActions";

const Device = () => {
  const router = useRouter();
  const params = useParams<{ device: string }>();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const mdmDeviceId = params.device;
  const { data: hardwareData, isLoading: isLoadingHardwareData } = useDeviceDetail(
    mdmDeviceId,
    "hardware",
    {
      enabled: !!mdmDeviceId,
    }
  );
  const deviceResponse: MDMDeviceDetailsResponse = hardwareData;

  const deviceDetails = deviceResponse?.deviceDetails;

  const activeTab = searchParams?.get("tab") || "general";
  const [showDelete, setShowDelete] = useState(false);
  const [showMarkAsReturned, setShowMarkAsReturned] = useState(false);
  const [showReassign, setShowReassign] = useState(false);

  const handleTabChange = (tab: string) => {
    const deviceId = params?.device || "device-id";
    router.push(`/devices/${deviceId}?tab=${tab}`);
  };

  const isMobile = useIsMobile();

  return (
    <div>
      {isLoadingHardwareData ? (
        <DeviceHeaderSkeleton isMobile={isMobile} />
      ) : (
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
              {user?.appRole === "PARENT" && (
                <div className="ml-auto flex lg:ml-0">
                  <IconWrapper
                    action={() => setShowDelete(true)}
                    icon={<Trash2Icon className="h-5 w-5 text-[#D95D55]" />}
                  />
                </div>
              )}
              {user?.appRole === "BUSINESS" && (
                <>
                  {deviceDetails?.assignmentStatus === "RETURNED" ? (
                    <Button
                      onClick={() => setShowReassign(true)}
                      variant="secondary"
                      className="text-primary/80 flex h-auto! items-center gap-2 self-stretch rounded-full p-5 text-sm font-semibold"
                    >
                      <svg
                        className="size-5!"
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.27934 1.26129C3.41182 1.11912 3.48394 0.93107 3.48052 0.736769C3.47709 0.542468 3.39838 0.357083 3.26096 0.21967C3.12355 0.0822568 2.93816 0.00354506 2.74386 0.000116847C2.54956 -0.00331137 2.36151 0.0688116 2.21934 0.201292L0.21934 2.20129C0.0788894 2.34192 0 2.53254 0 2.73129C0 2.93004 0.0788894 3.12067 0.21934 3.26129L2.21934 5.26129C2.288 5.33498 2.3708 5.39408 2.4628 5.43507C2.5548 5.47606 2.65411 5.49811 2.75482 5.49988C2.85552 5.50166 2.95555 5.48314 3.04894 5.44541C3.14233 5.40769 3.22716 5.35155 3.29838 5.28033C3.3696 5.20911 3.42574 5.12428 3.46346 5.03089C3.50118 4.9375 3.51971 4.83747 3.51793 4.73677C3.51615 4.63607 3.49411 4.53675 3.45312 4.44475C3.41213 4.35275 3.35303 4.26995 3.27934 4.20129L2.55934 3.48129H12.7493C12.9483 3.48129 13.139 3.40227 13.2797 3.26162C13.4203 3.12097 13.4993 2.9302 13.4993 2.73129C13.4993 2.53238 13.4203 2.34161 13.2797 2.20096C13.139 2.06031 12.9483 1.98129 12.7493 1.98129H2.55934L3.27934 1.26129ZM12.2193 8.20129C12.0789 8.34192 12 8.53254 12 8.73129C12 8.93004 12.0789 9.12067 12.2193 9.26129L12.9393 9.98129H2.74934C2.55043 9.98129 2.35966 10.0603 2.21901 10.201C2.07836 10.3416 1.99934 10.5324 1.99934 10.7313C1.99934 10.9302 2.07836 11.121 2.21901 11.2616C2.35966 11.4023 2.55043 11.4813 2.74934 11.4813H12.9393L12.2193 12.2013C12.1457 12.27 12.0866 12.3528 12.0456 12.4448C12.0046 12.5368 11.9825 12.6361 11.9807 12.7368C11.979 12.8375 11.9975 12.9375 12.0352 13.0309C12.0729 13.1243 12.1291 13.2091 12.2003 13.2803C12.2715 13.3515 12.3564 13.4077 12.4497 13.4454C12.5431 13.4831 12.6432 13.5017 12.7439 13.4999C12.8446 13.4981 12.9439 13.4761 13.0359 13.4351C13.1279 13.3941 13.2107 13.335 13.2793 13.2613L15.2793 11.2613C15.4198 11.1207 15.4987 10.93 15.4987 10.7313C15.4987 10.5325 15.4198 10.3419 15.2793 10.2013L13.2793 8.20129C13.1387 8.06084 12.9481 7.98195 12.7493 7.98195C12.5506 7.98195 12.36 8.06084 12.2193 8.20129Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Reassign device</span>
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      className="flex items-center gap-3 rounded-full bg-[#f4f7fa]"
                      onClick={() => setShowMarkAsReturned(true)}
                    >
                      <X className="text-red-500" size={18} />
                      Mark as returned
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Are you sure you want to delete this device?"
        description="Deleting this device cannot be reverted. Are you sure?"
        confirmText="Delete"
        onConfirm={() => {}}
        variant="destructive"
      />

      <MarkAsReturnedModal
        open={showMarkAsReturned}
        onOpenChange={setShowMarkAsReturned}
        deviceResponse={deviceResponse}
      />

      <ReassignDeviceModal
        open={showReassign}
        onOpenChange={setShowReassign}
        selectedDeviceMdmId={mdmDeviceId}
      />

      {activeTab === "general" && <General />}
      {activeTab === "web-history" && <WebHistory />}
      {activeTab === "app-control" && <AppControl />}
      {activeTab === "location" && <LocationPage />}
      {activeTab === "configuration" && (
        <div className="mx-auto max-w-lg">
          <DevicesConfigurationSetup />
        </div>
      )}
      {activeTab === "actions" && <DeviceActions />}
    </div>
  );
};

export default Device;
