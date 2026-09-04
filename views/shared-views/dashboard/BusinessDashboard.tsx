"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { DashboardFilterProvider, DashboardDonutChart, DashboardAreaChart, DashboardEmptyState } from "@/shared/ui/dashboard/analytics-ui";
import { useBasicInfoStats } from "@/features/dashboard/business/model/useBasicInfoStats";
import { useDeviceUtilization } from "@/features/dashboard/business/model/useDeviceUtilization";
import { useComplianceSecurity } from "@/features/dashboard/business/model/useComplianceSecurity";
import { useNetworkAppUsage } from "@/features/dashboard/business/model/useConnectivityLearning";
import { useAssetTracking } from "@/features/dashboard/business/model/useAssetTracking";
import { useBlacklistedWebsites } from "@/features/dashboard/business/model/useBlacklistedWebsites";
import { useDevices } from "@/entities/device";
import dynamic from "next/dynamic";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const MapComponent = dynamic(() => import("@/widgets/business-dashboard/ui/MapComponent"), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full rounded-xl" />,
});

const STATUS_LABEL: Record<string, string> = {
  DAMAGED: "Damaged",
  LOST: "Lost",
};

const BusinessDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const timeRangeLabel = useMemo(() => {
    if (!dateRange?.from) return "All time";
    if (!dateRange.to) return format(dateRange.from, "MMM d, yyyy");
    return `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d, yyyy")}`;
  }, [dateRange]);

  // Fetch all dashboard data
  const { totalAssets = 0, assignedAssets = 0, unassignedAssets = 0, damagedAssets = 0, isLoading: isLoadingBasic } = useBasicInfoStats();
  const { dailyActiveDevices, sessionDurationChartData, isLoading: isLoadingUtil } = useDeviceUtilization();
  const { securityPatchData, rootedCount, isLoading: isLoadingSecurity } = useComplianceSecurity();
  const { wifiChartData, isLoading: isLoadingNet } = useNetworkAppUsage();
  const { batteryChartData, devicesAvailabilityData, lostReports, deviceLocations, isLoading: isLoadingAssets } = useAssetTracking();
  const { websites, isLoading: isLoadingWebsites } = useBlacklistedWebsites();
  
  const { data: recentDevicesData } = useDevices({ limit: 5 });
  const recentDevices = recentDevicesData?.devices || [];

  return (
    <DashboardFilterProvider label={timeRangeLabel}>
      <div className="content">
        <section className="page active" id="page-dashboard">
          <div className="page-head">
            <div className="page-head-row">
              <div>
                <h1>Dashboard</h1>
                <p>Overview of all active and inactive devices across your fleet.</p>
              </div>

            </div>
          </div>

          {/* Bento row 1 */}
          <div className="bento-row">
            <div className="surface hero-overview">
              <div className="hero-overview-top">
                <div>
                  <div className="stat-label">Fleet status</div>
                  <div className="stat-value">{totalAssets.toLocaleString()}</div>
                </div>
                <div className="hero-overview-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Assets active
                </div>
              </div>
              <div className="seg-bar">
                <span style={{ width: `${(assignedAssets / Math.max(1, totalAssets)) * 100}%`, background: '#01DB5E' }}></span>
                <span style={{ width: `${(unassignedAssets / Math.max(1, totalAssets)) * 100}%`, background: '#05E0E5' }}></span>
                <span style={{ width: `${(damagedAssets / Math.max(1, totalAssets)) * 100}%`, background: '#FF6857' }}></span>
              </div>
              <div className="seg-legend">
                <div className="seg-legend-item"><div className="sw" style={{ background: '#01DB5E' }}></div> Assigned <b>{assignedAssets}</b></div>
                <div className="seg-legend-item"><div className="sw" style={{ background: '#05E0E5' }}></div> Unassigned <b>{unassignedAssets}</b></div>
                <div className="seg-legend-item"><div className="sw" style={{ background: '#FF6857' }}></div> Damaged <b>{damagedAssets}</b></div>
              </div>
            </div>

            <div className="side-stack">
              <div className="surface">
                <div className="side-stat-icon tone-brand">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                </div>
                <div className="side-stat-text">
                  <div className="val">{dailyActiveDevices.toLocaleString()}</div>
                  <div className="lbl">Active in last 24h</div>
                </div>
              </div>
              <div className="surface">
                <div className="side-stat-icon tone-coral">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
                </div>
                <div className="side-stat-text">
                  <div className="val">{rootedCount}</div>
                  <div className="lbl">Rooted / Jailbroken</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trio Row 1: Donuts & Actions */}
          <div className="trio-row">
            <div className="surface panel">
              <div className="panel-head">
                <h3>Device condition</h3>
              </div>
              {isLoadingAssets ? <div className="px-4 pb-4"><Skeleton className="h-32 w-full rounded" /></div> : (
                devicesAvailabilityData.length > 0 ? (
                  <div className="donut-wrap">
                    <PieChart width={130} height={130}>
                      <Pie data={devicesAvailabilityData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} stroke="none" dataKey="value">
                        {devicesAvailabilityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#072C59', border: '1px solid #1C3D66', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                    </PieChart>
                    <div className="legend">
                      {devicesAvailabilityData.map((d, i) => (
                        <div key={i} className="legend-item"><span className="sw" style={{ background: d.color }}></span> {d.name} <b>{d.value}%</b></div>
                      ))}
                    </div>
                  </div>
                ) : <div className="px-4 pb-4"><DashboardEmptyState message="No data" height={130} /></div>
              )}
            </div>

            <div className="surface panel">
              <div className="panel-head">
                <h3>Security Patches</h3>
                <span className="range">Compliance</span>
              </div>
              {isLoadingSecurity ? <div className="px-4 pb-4"><Skeleton className="h-32 w-full rounded" /></div> : (
                securityPatchData.length > 0 ? (
                  <div className="donut-wrap">
                    <PieChart width={130} height={130}>
                      <Pie 
                        data={securityPatchData.every(d => d.value === 0) ? [{ name: "Unknown", value: 1, color: "rgba(255,255,255,0.05)" }] : securityPatchData} 
                        cx="50%" cy="50%" innerRadius={45} outerRadius={60} stroke="none" dataKey="value"
                      >
                        {(securityPatchData.every(d => d.value === 0) ? [{ name: "Unknown", value: 1, color: "rgba(255,255,255,0.05)" }] : securityPatchData).map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#072C59', border: '1px solid #1C3D66', color: '#fff', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                    </PieChart>
                    <div className="legend">
                      {securityPatchData.map((d, i) => (
                        <div key={i} className="legend-item"><span className="sw" style={{ background: d.color }}></span> {d.name} <b>{d.value}%</b></div>
                      ))}
                    </div>
                  </div>
                ) : <div className="px-4 pb-4"><DashboardEmptyState message="No data" height={130} /></div>
              )}
            </div>

            <div className="surface">
              <div className="panel-head">
                <h3>Quick actions</h3>
              </div>
              <div className="quick-actions">
                <button className="quick-action-btn cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M12 16l0-6M9 13h6"/></svg>
                  Enrol a device
                </button>
                <button className="quick-action-btn cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>
                  Lock a device
                </button>
                <button className="quick-action-btn cursor-pointer">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V9M12 21V3M20 21v-7"/></svg>
                  Run a report
                </button>
              </div>
            </div>
          </div>

          {/* Trio Row 2: Area Charts */}
          <div className="trio-row">
            <div className="surface">
              <div className="panel-head">
                <h3>Battery Health</h3>
              </div>
              <div className="px-4 pb-4">
                {isLoadingAssets ? <Skeleton className="h-40 w-full rounded" /> : (
                   <DashboardAreaChart data={batteryChartData} dataKey="score" xAxisKey="day" initialColor="#01DB5E" gradientId="battery-health" height={160} />
                )}
              </div>
            </div>

            <div className="surface">
              <div className="panel-head">
                <h3>Session Duration</h3>
              </div>
              <div className="px-4 pb-4">
                {isLoadingUtil ? <Skeleton className="h-40 w-full rounded" /> : (
                   <DashboardAreaChart data={sessionDurationChartData} dataKey="duration" xAxisKey="month" initialColor="#05E0E5" gradientId="session-duration" height={160} />
                )}
              </div>
            </div>

            <div className="surface">
              <div className="panel-head">
                <h3>WiFi Usage (GB)</h3>
              </div>
              <div className="px-4 pb-4">
                {isLoadingNet ? <Skeleton className="h-40 w-full rounded" /> : (
                   <DashboardAreaChart data={wifiChartData} dataKey="usage" xAxisKey="day" initialColor="#FF6857" gradientId="wifi-usage" height={160} />
                )}
              </div>
            </div>
          </div>

          {/* Full-width map banner */}
          <div className="surface map-banner p-0 overflow-hidden relative">
            <div className="panel-head px-4 pt-4 border-none bg-transparent absolute top-0 z-10 w-full">
              <h3>Device locations</h3>
              <div className="icon-btn cursor-pointer bg-white/50 backdrop-blur-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              </div>
            </div>
            <div className="h-[250px] w-full">
              {isLoadingAssets ? <Skeleton className="h-full w-full rounded-xl" /> : (
                <MapComponent locations={deviceLocations} />
              )}
            </div>
          </div>

          {/* Table Row: Blacklisted & Lost Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="surface table-panel">
              <div className="table-head-row">
                <h3>Blocked Websites</h3>
              </div>
              {isLoadingWebsites ? <div className="p-4"><Skeleton className="h-32 w-full rounded" /></div> : (
                websites.length > 0 ? (
                  <table>
                    <thead>
                      <tr><th className="pl-4">Domain</th><th>Name</th><th>Devices Affected</th></tr>
                    </thead>
                    <tbody>
                      {websites.map(v => (
                        <tr key={v.domain}>
                          <td className="font-medium pl-4">{v.domain}</td>
                          <td className="text-muted-foreground">{v.name}</td>
                          <td className="mono">{v.devices}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <DashboardEmptyState message="No blocked websites data" height={150} />
                )
              )}
            </div>

            <div className="surface table-panel">
              <div className="table-head-row">
                <h3>Lost / Stolen Devices</h3>
              </div>
              {isLoadingAssets ? <div className="p-4"><Skeleton className="h-32 w-full rounded" /></div> : (
                lostReports.length > 0 ? (
                  <table>
                    <thead>
                      <tr><th className="pl-4">Device</th><th>Status</th><th>Last known location</th></tr>
                    </thead>
                    <tbody>
                      {lostReports.map((v, i) => (
                        <tr key={i}>
                          <td className="font-medium pl-4">{v.device}</td>
                          <td>
                            <span className="status-pill locked"><span className="dot"></span>{STATUS_LABEL[v.status] ?? v.status}</span>
                          </td>
                          <td className="text-muted-foreground">{v.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <DashboardEmptyState message="No lost or stolen devices" height={150} />
                )
              )}
            </div>
          </div>

          <div className="surface table-panel mt-4">
            <div className="table-head-row">
              <h3>Recently active devices</h3>
              <button className="tab active" style={{ cursor: 'default' }}>Last synced</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th className="pl-4">Asset</th>
                  <th>Assignment</th>
                  <th>Status</th>
                  <th>Last synced</th>
                </tr>
              </thead>
              <tbody>
                {recentDevices.length > 0 ? recentDevices.map((device) => (
                  <tr key={device.id}>
                    <td className="pl-4">
                      <div className="asset-cell">
                        <div className="asset-swatch">
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="7" y="2" width="10" height="20" rx="2"/></svg>
                        </div>
                        <div>
                          <div className="name">{[device.manufacturer, device.model].filter(Boolean).join(" ") || "N/A"}</div>
                          <div className="id">{device.serialNumber || "N/A"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="assign-cell">
                      {device.currentUser ? (
                         <>
                           <div className="who">{`${device.currentUser.firstName} ${device.currentUser.lastName}`}</div>
                           <div className="email">{device.currentUser.email}</div>
                         </>
                      ) : (
                         <div className="text-muted-foreground text-sm">Unassigned</div>
                      )}
                    </td>
                    <td>
                      <span className={cn("status-pill", device.deviceStatus === "ACTIVE" ? "online" : "locked")}>
                        <span className="dot"></span>{device.deviceStatus || "Unknown"}
                      </span>
                    </td>
                    <td className="mono">{device.mdmLastSyncAt ? format(new Date(device.mdmLastSyncAt), "dd MMM, HH:mm") : "N/A"}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={4} className="text-center py-6 text-muted-foreground">No devices found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardFilterProvider>
  );
};

export default BusinessDashboard;
