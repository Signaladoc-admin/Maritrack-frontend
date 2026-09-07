"use client";

import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import { format } from "date-fns";

const General = ({ deviceResponse: parentDeviceResponse }: { deviceResponse?: MDMDeviceDetailsResponse }) => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId && !parentDeviceResponse }
  );

  const deviceResponse = parentDeviceResponse || (hardwareData as MDMDeviceDetailsResponse);
  const deviceDetails = deviceResponse?.deviceDetails;
  const hardware = (deviceResponse as any)?.hardwareInfo || deviceResponse?.data;
  
  if (!deviceResponse) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return format(new Date(dateStr), "dd MMM yyyy, h:mm a");
    } catch {
      return "-";
    }
  };

  const realTimeStats = (deviceResponse as any)?.realTimeStats || deviceResponse?.data?.realTimeStats;

  const getMemoryUsage = () => {
    if (!realTimeStats?.totalRAM || !realTimeStats?.availableRAM) {
      return { pct: 0, label: "Memory · - / - Gb", dashOffset: 264 };
    }
    const total = realTimeStats.totalRAM / (1024 * 1024 * 1024);
    const available = realTimeStats.availableRAM / (1024 * 1024 * 1024);
    const used = total - available;
    const pct = Math.round((used / total) * 100);
    const dashOffset = 264 - (264 * pct) / 100;
    return {
      pct,
      label: `Memory · ${used.toFixed(2)} / ${total.toFixed(2)} Gb`,
      dashOffset
    };
  };

  const getCpuUsage = () => {
    const pct = Math.round(realTimeStats?.cpuUtilization || 0);
    const dashOffset = 264 - (264 * pct) / 100;
    return {
      pct,
      label: `CPU · ${(pct * 0.02).toFixed(2)} / 2.0 GHz`,
      dashOffset
    };
  };

  const memStats = getMemoryUsage();
  const cpuStats = getCpuUsage();

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Identifiers</div>
        <div className="dd-tile-grid">
          <div className="dd-tile"><div className="tk">IMEI number</div><div className="tv">{deviceDetails?.imei || "-"}</div></div>
          <div className="dd-tile"><div className="tk">Serial number</div><div className="tv">{deviceDetails?.serialNumber || "-"}</div></div>
          <div className="dd-tile"><div className="tk">LAN MAC address</div><div className="tv">{deviceDetails?.macAddress || "-"}</div></div>
          <div className="dd-tile"><div className="tk">External UID</div><div className="tv">{deviceDetails?.mdmDeviceId || "-"}</div></div>
          <div className="dd-tile span-2"><div className="tk">Model &amp; manufacturer</div><div className="tv">{(deviceDetails as any)?.name || deviceDetails?.model || "Samsung Galaxy A14"} / {deviceDetails?.manufacturer || "Samsung"}</div></div>
          <div className="dd-tile"><div className="tk">OS version</div><div className="tv">{deviceDetails?.operatingSystem || hardware?.version || "Android"}</div></div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">System</div>
        <div className="surface" style={{ padding: "20px 22px" }}>
          <div className="dd-gauge-row">
            <div className="dd-gauge">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="9"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#05E0E5" strokeWidth="9" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={cpuStats.dashOffset} transform="rotate(-90 50 50)"/>
                <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{cpuStats.pct}%</text>
              </svg>
              <div className="glbl">{cpuStats.label}</div>
            </div>
            <div className="dd-gauge">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="9"/>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#01DB5E" strokeWidth="9" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={memStats.dashOffset} transform="rotate(-90 50 50)"/>
                <text x="50" y="55" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800">{memStats.pct}%</text>
              </svg>
              <div className="glbl">{memStats.label}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Groups &amp; restrictions</div>
        <div className="dd-tile-grid">
          <div className="dd-tile span-2"><div className="tk">Groups</div><div className="tv">-</div></div>
          <div className="dd-tile"><div className="tk">Zone</div><div className="tv">{(deviceDetails as any)?.zone?.name || "ZONE-LAGOS-3391"}</div></div>
          <div className="dd-tile wide">
            <div><div className="tk">Restrictions</div><div className="tv">-</div></div>
            <button className="dd-action-btn primary" style={{ width: "auto", padding: "0 16px", height: "34px", borderRadius: "9px", fontSize: "12.5px", fontWeight: "700" }}>Assign group</button>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Status</div>
        <div className="dd-tile-grid">
          <div className="dd-tile"><div className="tk">Subscription end date</div><div className="tv">-</div></div>
          <div className="dd-tile"><div className="tk">Device locked on</div><div className="tv">{((deviceDetails as any)?.status === 'LOCKED' || deviceDetails?.deviceStatus === 'LOCKED') ? formatDate(deviceDetails?.updatedAt) : "-"}</div></div>
        </div>
      </div>
    </div>
  );
};

export default General;
