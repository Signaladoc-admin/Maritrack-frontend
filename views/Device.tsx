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
import { useDevice, useDeviceMessages } from "@/entities/device";
import LocationPage from "./Location";
import DevicesConfigurationSetup from "@/features/parents/ui/DeviceConfigurationSetup";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import { useBusinessZone } from "@/features/mdm-sync/model/useMdmSync";
import ReassignDeviceModal from "@/features/business-users/users/ui/ReassignDeviceModal";
import { DeviceHeaderSkeleton } from "./DeviceHeaderSkeleton";
import DeviceActions from "./DeviceActions";
import Messages from "./Messages";

import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { Child } from "@/features/child-profile/model/types";

const Device = () => {
  const router = useRouter();
  const params = useParams<{ device: string }>();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const isParent = user?.appRole === "PARENT";
  const mdmDeviceId = params.device;
  const { data: parentChildrenRes } = useParentChildren({
    enabled: isParent,
  });
  const childrenList: Child[] = (parentChildrenRes?.data as Child[]) || [];
  const queryChildId = searchParams?.get("childId");
  const linkedChild =
    childrenList.find(
      (c) =>
        (queryChildId && c.id === queryChildId) ||
        c.device?.mdmId === mdmDeviceId ||
        c.device?.mdmDeviceId === mdmDeviceId ||
        c.device?.id === mdmDeviceId
    ) || null;

  const handleBack = () => {
    if (isParent) {
      if (linkedChild?.id) {
        router.push(`/child/${linkedChild.id}`);
      } else if (queryChildId) {
        router.push(`/child/${queryChildId}`);
      } else {
        router.push("/children");
      }
    } else {
      router.push("/devices");
    }
  };

  const { data: hardwareData, isLoading: isLoadingHardwareData } = useDeviceDetail(
    mdmDeviceId,
    "hardware",
    {
      enabled: !!mdmDeviceId,
    }
  );
  const deviceResponse: MDMDeviceDetailsResponse = hardwareData;
  const deviceDetails = deviceResponse?.deviceDetails;

  const { data: messagesData } = useDeviceMessages(deviceDetails?.id || mdmDeviceId || "", {
    limit: 1,
  });
  const messageCount =
    (messagesData as any)?.total ??
    (Array.isArray((messagesData as any)?.messages) ? (messagesData as any).messages.length : 0);

  const { data: businessZone } = useBusinessZone({
    enabled: user?.appRole === "BUSINESS",
  });
  const zoneName = (deviceDetails as any)?.zone?.name || businessZone?.name || "-";

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

  const formatDateTime = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    try {
      return format(new Date(dateStr), "dd MMM yyyy, h:mm a");
    } catch (e) {
      return "-";
    }
  };

  const isAppControlActive = activeTab === "appcontrol" || activeTab === "app-control";
  const deviceStatus: string =
    (deviceDetails?.deviceStatus as string) || (deviceDetails as any)?.status || "UNKNOWN";
  const isStatusActive = deviceStatus === "ACTIVE";
  const isStatusPending = deviceStatus === "PENDING" || deviceStatus === "UNASSIGNED";

  return (
    <div className="flex min-h-[500px] w-full flex-col">
      <button className="dd-back-link" onClick={handleBack}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {isParent ? "Back" : "Back to devices"}
      </button>

      <div className="surface dd-hero">
        <div className="dd-hero-top">
          <div className="dd-hero-id">
            <div className="dd-avatar" id="ddAvatar">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <rect x="7" y="2" width="10" height="20" rx="2" />
              </svg>
            </div>
            <div>
              <div className="dd-hero-title" id="ddTitle">
                {(deviceDetails as any)?.name ||
                  deviceDetails?.model ||
                  (deviceResponse?.data as any)?.model ||
                  "Device"}
              </div>
              <div className="dd-hero-sub" id="ddDeviceId">
                {deviceDetails?.id || mdmDeviceId}
              </div>
            </div>
          </div>
          <div className="dd-hero-actions">
            <button
              className="dd-action-btn"
              aria-label="Refresh"
              onClick={() => window.location.reload()}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 4v6h-6M1 20v-6h6" />
                <path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15" />
              </svg>
            </button>
            {user?.appRole === "BUSINESS" && (
              <>
                {deviceDetails?.assignmentStatus === "RETURNED" ? (
                  <button
                    className="dd-action-btn primary"
                    style={{
                      width: "auto",
                      padding: "0 14px",
                      height: "34px",
                      borderRadius: "9px",
                      fontSize: "12.5px",
                      fontWeight: "600",
                      gap: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                    onClick={() => setShowReassign(true)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 1l4 4-4 4" />
                      <path d="M3 11V9a4 4 0 014-4h14" />
                      <path d="M7 23l-4-4 4-4" />
                      <path d="M21 13v2a4 4 0 01-4 4H3" />
                    </svg>
                    <span>Reassign device</span>
                  </button>
                ) : (
                  <button
                    className="dd-action-btn"
                    style={{
                      width: "auto",
                      padding: "0 14px",
                      height: "34px",
                      borderRadius: "9px",
                      fontSize: "12.5px",
                      fontWeight: "600",
                      gap: "6px",
                      display: "inline-flex",
                      alignItems: "center",
                      borderColor: "var(--coral-border)",
                      color: "var(--coral)",
                    }}
                    onClick={() => setShowMarkAsReturned(true)}
                  >
                    <X size={15} />
                    <span>Mark as returned</span>
                  </button>
                )}
              </>
            )}
            {user?.appRole === "PARENT" && (
              <button
                className="dd-action-btn"
                style={{ borderColor: "var(--coral-border)", color: "var(--coral)" }}
                aria-label="Delete"
                onClick={() => setShowDelete(true)}
              >
                <Trash2Icon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="dd-hero-chips">
          <span className="dd-chip" id="ddStatusChip">
            <span
              className="dot"
              id="ddStatusDot"
              style={{
                background: isStatusActive ? "#01DB5E" : isStatusPending ? "#FFB020" : "#FF6857",
              }}
            ></span>
            <span id="ddStatusText">{deviceStatus}</span>
          </span>
          <span className="dd-chip">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Zone <b id="ddZone">{zoneName}</b>
          </span>
          <span className="dd-chip">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            Last seen{" "}
            <b id="ddLastSeen">
              {formatDateTime(deviceDetails?.lastSeenAt || deviceDetails?.updatedAt)}
            </b>
          </span>
          <span className="dd-chip">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 9h18M8 2v4M16 2v4" />
            </svg>
            Registered <b id="ddRegDate">{formatDateTime(deviceDetails?.createdAt)}</b>
          </span>
        </div>
      </div>

      <div className="dd-tabs-bar" id="ddTabs">
        <button
          className={cn("dd-tab-item", activeTab === "general" && "active")}
          onClick={() => handleTabChange("general")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 9h8M8 13h5" />
          </svg>
          General
        </button>
        <button
          className={cn("dd-tab-item", activeTab === "web-history" && "active")}
          onClick={() => handleTabChange("web-history")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Blocked websites
        </button>
        <button
          className={cn("dd-tab-item", isAppControlActive && "active")}
          onClick={() => handleTabChange("appcontrol")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.4" />
            <rect x="14" y="3" width="7" height="7" rx="1.4" />
            <rect x="3" y="14" width="7" height="7" rx="1.4" />
            <rect x="14" y="14" width="7" height="7" rx="1.4" />
          </svg>
          App control
        </button>
        <button
          className={cn("dd-tab-item", activeTab === "location" && "active")}
          onClick={() => handleTabChange("location")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Location
        </button>
        <button
          className={cn("dd-tab-item", activeTab === "messages" && "active")}
          onClick={() => handleTabChange("messages")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          Messages
          {messageCount > 0 && (
            <span className="tab-badge" id="ddMsgBadge">
              {messageCount}
            </span>
          )}
        </button>
        <button
          className={cn("dd-tab-item", activeTab === "configuration" && "active")}
          onClick={() => handleTabChange("configuration")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 01-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 010-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001-1.55V3a2 2 0 014 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.55 1H21a2 2 0 010 4h-.09a1.7 1.7 0 00-1.55 1z" />
          </svg>
          Configuration
        </button>
        <button
          className={cn("dd-tab-item", activeTab === "actions" && "active")}
          onClick={() => handleTabChange("actions")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
          </svg>
          Actions
        </button>
      </div>

      <div className="dd-content">
        {activeTab === "general" && (
          <General
            deviceResponse={deviceResponse}
            onNavigateTab={handleTabChange}
            onOpenReassign={() => setShowReassign(true)}
          />
        )}
        {activeTab === "web-history" && <WebHistory />}
        {isAppControlActive && <AppControl />}
        {activeTab === "location" && <LocationPage />}
        {activeTab === "messages" && <Messages deviceId={deviceDetails?.id || mdmDeviceId} />}
        {activeTab === "configuration" && (
          <div className="mx-auto w-full max-w-2xl">
            <DevicesConfigurationSetup
              deviceId={mdmDeviceId}
              userId={deviceDetails?.currentUserId ?? undefined}
            />
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
