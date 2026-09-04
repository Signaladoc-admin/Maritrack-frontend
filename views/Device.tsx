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
import Configuration from "./Configuration";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import ReassignDeviceModal from "@/features/business-users/users/ui/ReassignDeviceModal";
import { DeviceHeaderSkeleton } from "./DeviceHeaderSkeleton";
import DeviceActions from "./DeviceActions";
import Messages from "./Messages";

import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
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

  const initialTab = searchParams?.get("tab") || "general";
  const normalizedInitialTab = initialTab === "app-control" ? "appcontrol" : initialTab;
  const [activeTab, setActiveTab] = useState(normalizedInitialTab);
  const [showDelete, setShowDelete] = useState(false);
  const [showMarkAsReturned, setShowMarkAsReturned] = useState(false);
  const [showReassign, setShowReassign] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const deviceId = params?.device || "device-id";
    try {
      window.history.replaceState(null, "", `/devices/${deviceId}?tab=${tab}`);
    } catch (e) {
      router.push(`/devices/${deviceId}?tab=${tab}`);
    }
  };

  const isMobile = useIsMobile();

  if (isLoadingHardwareData) {
    return <DeviceHeaderSkeleton isMobile={isMobile} />;
  }

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return format(new Date(dateStr), "dd MMM yyyy, h:mm a");
    } catch (e) {
      return "-";
    }
  };

  const isAppControlActive = activeTab === "appcontrol" || activeTab === "app-control";

  return (
    <div className="flex flex-col w-full min-h-[500px]">
      <button className="dd-back-link" onClick={() => router.push("/devices")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to devices
      </button>

      <div className="surface dd-hero">
        <div className="dd-hero-top">
          <div className="dd-hero-id">
            <div className="dd-avatar" id="ddAvatar">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2"/></svg>
            </div>
            <div>
              <div className="dd-hero-title" id="ddTitle">{deviceDetails?.name || "Samsung Galaxy A14"}</div>
              <div className="dd-hero-sub" id="ddDeviceId">{deviceDetails?.id || mdmDeviceId}</div>
            </div>
          </div>
          <div className="dd-hero-actions">
            <button className="dd-action-btn" aria-label="Refresh" onClick={() => window.location.reload()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15"/></svg>
            </button>
            <button className="dd-action-btn" aria-label="Edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
            <button className="dd-action-btn" aria-label="More options">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
            </button>
            {user?.appRole === "BUSINESS" && (
              <button className="dd-action-btn primary" aria-label="Assign group" onClick={() => setShowReassign(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="17" cy="9" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5"/></svg>
              </button>
            )}
            {user?.appRole === "PARENT" && (
              <button className="dd-action-btn" style={{ borderColor: 'var(--coral-border)', color: 'var(--coral)' }} aria-label="Delete" onClick={() => setShowDelete(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
              </button>
            )}
          </div>
        </div>

        <div className="dd-hero-chips">
          <span className="dd-chip" id="ddStatusChip">
            <span className="dot" id="ddStatusDot" style={{ background: deviceDetails?.status === 'ACTIVE' ? '#01DB5E' : '#FF6857' }}></span>
            <span id="ddStatusText">{deviceDetails?.status || "Activated"}</span>
          </span>
          <span className="dd-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            Zone <b id="ddZone">{deviceDetails?.zone?.name || "ZONE-LAGOS-3391"}</b>
          </span>
          <span className="dd-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            Last seen <b id="ddLastSeen">{formatDateTime(deviceDetails?.updatedAt) !== "-" ? formatDateTime(deviceDetails?.updatedAt) : "12 Aug 2026, 9:41 am"}</b>
          </span>
          <span className="dd-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>
            Registered <b id="ddRegDate">{formatDateTime(deviceDetails?.createdAt) !== "-" ? formatDateTime(deviceDetails?.createdAt) : "01 Aug 2026, 10:00 am"}</b>
          </span>
        </div>
      </div>

      <div className="dd-tabs-bar" id="ddTabs">
        <button className={cn("dd-tab-item", activeTab === "general" && "active")} onClick={() => handleTabChange("general")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>
          General
        </button>
        <button className={cn("dd-tab-item", isAppControlActive && "active")} onClick={() => handleTabChange("appcontrol")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></svg>
          App control
        </button>
        <button className={cn("dd-tab-item", activeTab === "location" && "active")} onClick={() => handleTabChange("location")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
          Location
        </button>
        <button className={cn("dd-tab-item", activeTab === "messages" && "active")} onClick={() => handleTabChange("messages")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          Messages
          <span className="tab-badge" id="ddMsgBadge">3</span>
        </button>
        <button className={cn("dd-tab-item", activeTab === "configuration" && "active")} onClick={() => handleTabChange("configuration")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 010-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001-1.55V3a2 2 0 014 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.55 1H21a2 2 0 010 4h-.09a1.7 1.7 0 00-1.55 1z"/></svg>
          Configuration
        </button>
        <button className={cn("dd-tab-item", activeTab === "actions" && "active")} onClick={() => handleTabChange("actions")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>
          Actions
        </button>
      </div>

      <div className="dd-content">
        {activeTab === "general" && <General deviceResponse={deviceResponse} />}
        {activeTab === "web-history" && <WebHistory />}
        {isAppControlActive && <AppControl />}
        {activeTab === "location" && <LocationPage />}
        {activeTab === "messages" && <Messages deviceId={deviceDetails?.id} />}
        {activeTab === "configuration" && (
          <div className="w-full">
            <Configuration />
          </div>
        )}
        {activeTab === "actions" && <DeviceActions />}
      </div>

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
    </div>
  );
};

export default Device;
