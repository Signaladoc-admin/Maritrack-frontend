"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

interface InstalledApp {
  id: string;
  name: string;
  category: string;
  iconLetter: string;
  iconBg: string;
  enabled: boolean;
  disabled?: boolean;
}

const DEFAULT_APPS: InstalledApp[] = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Communication",
    iconLetter: "W",
    iconBg: "#25D366",
    enabled: true,
  },
  {
    id: "gmaps",
    name: "Google Maps",
    category: "Navigation",
    iconLetter: "M",
    iconBg: "var(--accent)",
    enabled: true,
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "Social & entertainment",
    iconLetter: "T",
    iconBg: "#FF6857",
    enabled: false,
  },
  {
    id: "flentra-agent",
    name: "Flentra Agent",
    category: "System — required",
    iconLetter: "F",
    iconBg: "var(--accent)",
    enabled: true,
    disabled: true,
  },
];

const AppControl = () => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const [apps, setApps] = useState<InstalledApp[]>(DEFAULT_APPS);

  const toggleApp = (id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id && !app.disabled ? { ...app, enabled: !app.enabled } : app
      )
    );
  };

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Installed apps</div>
        <div className="surface" style={{ padding: "6px 22px" }}>
          {apps.map((app) => (
            <div className="app-row" key={app.id}>
              <div className="app-icon" style={{ background: app.iconBg }}>
                {app.iconLetter}
              </div>
              <div className="app-body">
                <div className="app-name">{app.name}</div>
                <div className="app-cat">{app.category}</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={app.enabled}
                  disabled={app.disabled}
                  onChange={() => toggleApp(app.id)}
                />
                <span className="track"></span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">App limits</div>
        <div className="surface" style={{ padding: "6px 22px" }}>
          <div className="config-row">
            <div className="config-body">
              <div className="config-title">Daily screen time cap</div>
              <div className="config-desc">Restrict total non-essential app usage per day.</div>
            </div>
            <select className="form-select config-select" defaultValue="4 hours / day">
              <option>No limit</option>
              <option>4 hours / day</option>
              <option>6 hours / day</option>
              <option>8 hours / day</option>
            </select>
          </div>
          <div className="config-row" style={{ borderBottom: "none" }}>
            <div className="config-body">
              <div className="config-title">Social &amp; entertainment apps</div>
              <div className="config-desc">Limit access to TikTok, Instagram, and similar apps.</div>
            </div>
            <select className="form-select config-select" defaultValue="Blocked">
              <option>Blocked</option>
              <option>1 hour / day</option>
              <option>Unrestricted</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppControl;
