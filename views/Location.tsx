"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

export default function LocationPage() {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId,
  });

  const zoneName = hardwareData?.deviceDetails?.zone?.name || "ZONE-LAGOS-3391";
  const location = hardwareData?.deviceDetails?.lastKnownLocation;
  const caption = location?.address || "23 Ebinpejo Lane, Idumota, Lagos";

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Current location</div>
        <div className="surface map-card" style={{ paddingTop: 0 }}>
          <div className="map-canvas" style={{ minHeight: "220px" }}>
            <div className="road" style={{ left: 0, right: 0, top: "38%", height: "2px" }}></div>
            <div className="road" style={{ left: 0, right: 0, top: "68%", height: "2px" }}></div>
            <div className="road" style={{ left: "28%", top: 0, bottom: 0, width: "2px" }}></div>
            <div className="road" style={{ left: "64%", top: 0, bottom: 0, width: "2px" }}></div>
            <div className="map-pin" style={{ left: "46%", top: "44%" }}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill="#05E0E5" />
                <circle cx="12" cy="10" r="3" fill="#002147" />
              </svg>
            </div>
            <div className="map-caption" id="ddLocationCaption">
              {caption}
            </div>
          </div>
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Location history</div>
        <div className="surface" style={{ padding: "6px 22px" }}>
          <div className="timeline">
            <div className="timeline-item">
              <div className="tl-icon tone-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="tl-body">
                <div className="tl-title">Idumota, Lagos</div>
                <div className="tl-meta">{zoneName}</div>
              </div>
              <div className="tl-time">Today, 9:41 am</div>
            </div>

            <div className="timeline-item">
              <div className="tl-icon tone-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="tl-body">
                <div className="tl-title">Lekki Phase 1, Lagos</div>
                <div className="tl-meta">{zoneName}</div>
              </div>
              <div className="tl-time">Yesterday, 2:15 pm</div>
            </div>

            <div className="timeline-item">
              <div className="tl-icon tone-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="tl-body">
                <div className="tl-title">Ikeja, Lagos</div>
                <div className="tl-meta">{zoneName}</div>
              </div>
              <div className="tl-time">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
