"use client";

import { useParams, useRouter } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetUserById } from "@/features/user-management/model/useUserManagement";
import { useBusinessZone } from "@/features/mdm-sync/model/useMdmSync";
import { MapCard } from "@/features/general/ui/map-card";
import { formatID } from "@/shared/lib/utils";
import { format } from "date-fns";
import { Skeleton } from "@/shared/ui/skeleton";

interface GeneralProps {
  deviceResponse?: MDMDeviceDetailsResponse;
  onNavigateTab?: (tab: string) => void;
  onOpenReassign?: () => void;
}

const General = ({
  deviceResponse: parentDeviceResponse,
  onNavigateTab,
  onOpenReassign,
}: GeneralProps) => {
  const router = useRouter();
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";
  const { user } = useAuth();
  const isBusiness = user?.appRole === "BUSINESS";

  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId && !parentDeviceResponse,
  });

  const { data: networkData } = useDeviceDetail(deviceId, "network", {
    enabled: !!deviceId,
  });

  const { data: appsData, isPending: isAppsLoading } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const { data: businessZone } = useBusinessZone({
    enabled: isBusiness,
  });

  const deviceResponse = parentDeviceResponse || (hardwareData as MDMDeviceDetailsResponse);
  const deviceDetails = deviceResponse?.deviceDetails;
  const hardware = (deviceResponse as any)?.hardwareInfo || deviceResponse?.data;
  const realTimeStats =
    (deviceResponse as any)?.realTimeStats ||
    deviceResponse?.data?.realTimeStats ||
    networkData?.data?.realTimeStats;

  const { data: userInfo, isLoading: isLoadingUserInfo } = useGetUserById(
    deviceDetails?.currentUserId || null
  );
  const staffMember = userInfo;

  if (!deviceResponse) return null;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    try {
      return format(new Date(dateStr), "dd MMM yyyy, h:mm a");
    } catch {
      return "-";
    }
  };

  // CPU Usage Calculation
  const cpuUtilization = Math.round(realTimeStats?.cpuUtilization ?? 0);
  const cpuDashOffset = 264 - (264 * Math.min(100, Math.max(0, cpuUtilization))) / 100;

  // Storage / Memory Calculation
  const storageUsed = realTimeStats?.internalStorageUsed ?? 0;
  const storageFree = realTimeStats?.internalStorageFree ?? 0;
  const totalStorage = (hardware as any)?.internalStorageSize || storageUsed + storageFree;
  const toGB = (bytes: number) => (bytes / (1024 * 1024 * 1024)).toFixed(1);
  const storageUsedGB = toGB(storageUsed);
  const totalStorageGB = toGB(totalStorage);
  const storagePct =
    totalStorage > 0
      ? Math.round((storageUsed / totalStorage) * 100)
      : realTimeStats?.internalStorageUsedPercent || 0;
  const storageDashOffset = 264 - (264 * Math.min(100, Math.max(0, storagePct))) / 100;
  const storageLabel =
    totalStorage > 0
      ? `Storage · ${storageUsedGB} / ${totalStorageGB} GB`
      : `Storage · ${storagePct}%`;

  // Battery Calculation
  const batteryLevel =
    networkData?.data?.realTimeStats?.batteryLevel ?? realTimeStats?.batteryLevel ?? 0;
  const batteryDashOffset = 264 - (264 * Math.min(100, Math.max(0, batteryLevel))) / 100;
  const batteryColor = batteryLevel < 20 ? "#FF6857" : "#01DB5E";

  // Top 5 Apps with redesign styling
  const palette = ["#25D366", "#05E0E5", "#FF6857", "#8B5CF6", "#FFB020"];
  const fetchedApps = (appsData?.data?.apps || []).filter((app: any) => app.systemApp === false);
  const top5Apps = Array.isArray(fetchedApps)
    ? fetchedApps.slice(0, 5).map((app: any, idx: number) => {
        const name = app.appName || app.packageName || "App";
        return {
          id: app.id || app.packageName || `top-app-${idx}`,
          name,
          category: app.systemApp ? "System application" : "Application",
          iconLetter: name.slice(0, 1).toUpperCase(),
          iconBg: palette[idx % palette.length],
          totalTime:
            app.totalTime ||
            (app.installedAPKSize
              ? `Size: ${(app.installedAPKSize / (1024 * 1024)).toFixed(1)} MB`
              : "-"),
        };
      })
    : [];

  // Subscription end date formatting
  const subExpiry = realTimeStats?.subscriptionExpiryDate;
  const subExpiryFormatted = subExpiry
    ? formatDate(new Date(subExpiry > 10000000000 ? subExpiry : subExpiry * 1000).toISOString())
    : "-";

  // Lock status
  const isLocked =
    deviceDetails?.deviceStatus === "LOCKED" || (deviceDetails as any)?.status === "LOCKED";
  const lockedOnFormatted = isLocked ? formatDate(deviceDetails?.updatedAt) : "-";

  const zoneName = (deviceDetails as any)?.zone?.name || businessZone?.name || "-";

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Identifiers</div>
        <div className="dd-tile-grid">
          <div className="dd-tile">
            <div className="tk">IMEI number</div>
            <div className="tv">{deviceDetails?.imei || hardware?.imeiNumber || "-"}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Serial number</div>
            <div className="tv">{deviceDetails?.serialNumber || hardware?.serialNumber || "-"}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">LAN MAC address</div>
            <div className="tv">{deviceDetails?.macAddress || hardware?.wifiMacAddr || "-"}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">External UID</div>
            <div className="tv">{deviceDetails?.mdmDeviceId || hardware?.deviceId || "-"}</div>
          </div>
          <div className="dd-tile span-2">
            <div className="tk">Model &amp; manufacturer</div>
            <div className="tv">
              {(deviceDetails as any)?.name || deviceDetails?.model || hardware?.model || "Device"}{" "}
              / {deviceDetails?.manufacturer || hardware?.manufacturer || "Unknown"}
            </div>
          </div>
          <div className="dd-tile">
            <div className="tk">OS version</div>
            <div className="tv">
              {deviceDetails?.operatingSystem || hardware?.version || hardware?.osType || "Android"}
            </div>
          </div>
        </div>
      </div>

      {isBusiness && (
        <div className="dd-section">
          <div className="dd-section-title">Device possessor</div>
          <div className="dd-tile-grid">
            <div className="dd-tile">
              <div className="tk">Name</div>
              <div className="tv">
                {staffMember
                  ? `${staffMember.firstName} ${staffMember.lastName}`
                  : isLoadingUserInfo
                    ? "Loading..."
                    : "Unassigned"}
              </div>
            </div>
            <div className="dd-tile">
              <div className="tk">Email</div>
              <div className="tv">{staffMember?.email || "-"}</div>
            </div>
            <div className="dd-tile">
              <div className="tk">Staff ID</div>
              <div className="tv">{staffMember?.id ? formatID(staffMember.id) : "-"}</div>
            </div>
            <div className="dd-tile">
              <div className="tk">Assignment status</div>
              <div className="tv">{deviceDetails?.assignmentStatus || "UNASSIGNED"}</div>
            </div>
          </div>
        </div>
      )}

      <div className="dd-section">
        <div className="dd-section-title">System</div>
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="dd-gauge-row">
            <div className="dd-gauge">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--card-line)"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#05E0E5"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset={cpuDashOffset}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="var(--text-1)"
                  className="fill-[var(--text-1)]"
                  fontSize="18"
                  fontWeight="800"
                >
                  {cpuUtilization}%
                </text>
              </svg>
              <div className="glbl">CPU · {cpuUtilization}%</div>
            </div>
            <div className="dd-gauge">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--card-line)"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#01DB5E"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset={storageDashOffset}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="var(--text-1)"
                  className="fill-[var(--text-1)]"
                  fontSize="18"
                  fontWeight="800"
                >
                  {storagePct}%
                </text>
              </svg>
              <div className="glbl">{storageLabel}</div>
            </div>
            <div className="dd-gauge">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--card-line)"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={batteryColor}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset={batteryDashOffset}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fill="var(--text-1)"
                  className="fill-[var(--text-1)]"
                  fontSize="18"
                  fontWeight="800"
                >
                  {batteryLevel}%
                </text>
              </svg>
              <div className="glbl">Battery · {batteryLevel}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Groups &amp; restrictions</div>
        <div className="dd-tile-grid">
          <div className="dd-tile span-2">
            <div className="tk">Groups</div>
            <div className="tv">Default Group</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Zone</div>
            <div className="tv">{zoneName}</div>
          </div>
          <div className="dd-tile wide">
            <div>
              <div className="tk">Restrictions</div>
              <div className="tv">Standard Policy</div>
            </div>
            {onOpenReassign && (
              <button
                type="button"
                className="dd-action-btn primary"
                style={{
                  width: "auto",
                  padding: "0 16px",
                  height: "34px",
                  borderRadius: "9px",
                  fontSize: "12.5px",
                  fontWeight: "700",
                }}
                onClick={onOpenReassign}
              >
                Assign group
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Status</div>
        <div className="dd-tile-grid">
          <div className="dd-tile">
            <div className="tk">Subscription end date</div>
            <div className="tv">{subExpiryFormatted}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Device locked on</div>
            <div className="tv">{lockedOnFormatted}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">MDM enrollment status</div>
            <div className="tv">{deviceDetails?.mdmEnrollmentStatus || "ENROLLED"}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">MDM compliance status</div>
            <div className="tv">{deviceDetails?.mdmComplianceStatus || "COMPLIANT"}</div>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Activity &amp; Location</div>
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          {/* Top 5 Installed Apps Activity Card */}
          <div className="surface flex flex-col p-5">
            <div className="mb-3 flex items-center justify-between border-b border-[var(--card-line)] pb-3.5">
              <div>
                <h4 className="text-[13.5px] font-bold text-[var(--text-1)]">
                  Top 5 installed apps
                </h4>
                <p className="text-[11.5px] text-[var(--text-3)]">
                  Most active applications on device
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateTab) {
                    onNavigateTab("appcontrol");
                  } else {
                    router.push(`/devices/${deviceId}?tab=appcontrol`);
                  }
                }}
                className="cursor-pointer border-none bg-transparent p-0 text-[12px] font-bold text-[var(--green)] hover:underline"
              >
                View all
              </button>
            </div>

            <div className="flex flex-1 flex-col divide-y divide-[var(--card-line)]">
              {isAppsLoading ? (
                <div className="flex flex-col divide-y divide-[var(--card-line)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-lg" />
                        <div className="space-y-1">
                          <Skeleton className="h-3.5 w-32" />
                          <Skeleton className="h-2.5 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-14" />
                    </div>
                  ))}
                </div>
              ) : top5Apps.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-10 text-center text-xs text-[var(--text-3)]">
                  No application activity reported for this device.
                </div>
              ) : (
                top5Apps.map((app) => (
                  <div className="app-row" key={app.id}>
                    <div className="app-icon" style={{ background: app.iconBg, color: "#FFFFFF" }}>
                      {app.iconLetter}
                    </div>
                    <div className="app-body">
                      <div className="app-name">{app.name}</div>
                      <div className="app-cat">{app.category}</div>
                    </div>
                    <div className="font-mono text-[12px] font-semibold text-[var(--text-2)]">
                      {app.totalTime}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Location Map Card */}
          <div className="surface flex min-h-[340px] flex-col overflow-hidden">
            <MapCard deviceId={deviceId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
