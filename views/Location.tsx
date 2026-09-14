"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MapCard } from "@/features/general/ui/map-card";
import { format } from "date-fns";

export default function LocationPage() {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId,
  });

  const deviceDetails = hardwareData?.deviceDetails;
  const zoneName = (deviceDetails as any)?.zone?.name || "-";
  const location = deviceDetails?.lastKnownLocation;

  const lat = typeof (location as any)?.latitude === "number" ? (location as any).latitude : null;
  const lng = typeof (location as any)?.longitude === "number" ? (location as any).longitude : null;
  const address =
    (location as any)?.address ||
    (typeof location === "string" ? location : null) ||
    (lat !== null && lng !== null
      ? `${lat.toFixed(4)}, ${lng.toFixed(4)}`
      : "No GPS address reported");

  const lastSeenDate = deviceDetails?.lastSeenAt || deviceDetails?.updatedAt;
  const formattedLastSeen = lastSeenDate
    ? format(new Date(lastSeenDate), "dd MMM yyyy, h:mm a")
    : "-";

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Current location</div>
        <div className="surface min-h-[400px] w-full overflow-hidden">
          <MapCard deviceId={deviceId} />
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Location details</div>
        <div className="dd-tile-grid">
          <div className="dd-tile span-2">
            <div className="tk">Reported address</div>
            <div className="tv">{address}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Zone</div>
            <div className="tv">{zoneName}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Last location sync</div>
            <div className="tv">{formattedLastSeen}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Latitude</div>
            <div className="tv">{lat !== null ? lat.toFixed(6) : "-"}</div>
          </div>
          <div className="dd-tile">
            <div className="tk">Longitude</div>
            <div className="tv">{lng !== null ? lng.toFixed(6) : "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
