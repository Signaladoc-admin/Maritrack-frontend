"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export default function Configuration() {
  const [shellAccess, setShellAccess] = useState(false);
  const [screenView, setScreenView] = useState(false);
  const [autoLock, setAutoLock] = useState(true);
  const [syncFreq, setSyncFreq] = useState("Every hour");

  const handleShellChange = (val: boolean) => {
    setShellAccess(val);
    toast.success(`Device shell access ${val ? "enabled" : "disabled"}`);
  };

  const handleScreenChange = (val: boolean) => {
    setScreenView(val);
    toast.success(`Screen view access ${val ? "enabled" : "disabled"}`);
  };

  const handleAutoLockChange = (val: boolean) => {
    setAutoLock(val);
    toast.success(`Auto-lock on geofence exit ${val ? "enabled" : "disabled"}`);
  };

  const handleSyncChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSyncFreq(e.target.value);
    toast.success(`Sync frequency updated to ${e.target.value}`);
  };

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="surface" style={{ padding: "6px 22px" }}>
        <div className="config-row">
          <div className="policy-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16v14H4z" />
              <path d="M8 9l3 3-3 3M13 15h4" />
            </svg>
          </div>
          <div className="config-body">
            <div className="config-title">Device shell access</div>
            <div className="config-desc">Allow remote command-line access for diagnostics.</div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={shellAccess}
              onChange={(e) => handleShellChange(e.target.checked)}
            />
            <span className="track"></span>
          </label>
        </div>

        <div className="config-row">
          <div className="policy-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="13" rx="1.6" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div className="config-body">
            <div className="config-title">Screen view access</div>
            <div className="config-desc">Allow support staff to remotely view this device's screen.</div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={screenView}
              onChange={(e) => handleScreenChange(e.target.checked)}
            />
            <span className="track"></span>
          </label>
        </div>

        <div className="config-row">
          <div className="policy-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            </svg>
          </div>
          <div className="config-body">
            <div className="config-title">Auto-lock on geofence exit</div>
            <div className="config-desc">Lock the device automatically if it leaves its assigned zone.</div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoLock}
              onChange={(e) => handleAutoLockChange(e.target.checked)}
            />
            <span className="track"></span>
          </label>
        </div>

        <div className="config-row" style={{ borderBottom: "none" }}>
          <div className="policy-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15" />
            </svg>
          </div>
          <div className="config-body">
            <div className="config-title">Sync frequency</div>
            <div className="config-desc">How often this device reports status back to Flentra.</div>
          </div>
          <select
            className="form-select config-select"
            value={syncFreq}
            onChange={handleSyncChange}
          >
            <option>Every 15 minutes</option>
            <option>Every hour</option>
            <option>Every 6 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
}
