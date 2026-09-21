"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

const LeafletMapClient = dynamic(() => import("./LeafletMapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#f8fafc] text-xs text-[#667085]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1B3C73] border-t-transparent" />
      <span>Loading map...</span>
    </div>
  ),
});

const DEFAULT_CENTER: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos

interface MapCardProps {
  deviceId: string;
  className?: string;
  resolvedAddress?: string;
}

export function MapCard({ deviceId, className, resolvedAddress }: MapCardProps) {
  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId }
  );

  const location = hardwareData?.deviceDetails?.lastKnownLocation;

  // Safely extract coordinates from object or stringified JSON
  let lat: number | null = null;
  let lng: number | null = null;

  if (location && typeof location === "object") {
    const rawLat = (location as any).latitude ?? (location as any).lat;
    const rawLng = (location as any).longitude ?? (location as any).lng ?? (location as any).lon;
    if (typeof rawLat === "number" && !isNaN(rawLat)) lat = rawLat;
    if (typeof rawLng === "number" && !isNaN(rawLng)) lng = rawLng;
  } else if (typeof location === "string") {
    try {
      const parsed = JSON.parse(location);
      const rawLat = parsed.latitude ?? parsed.lat;
      const rawLng = parsed.longitude ?? parsed.lng ?? parsed.lon;
      if (typeof rawLat === "number" && !isNaN(rawLat)) lat = rawLat;
      if (typeof rawLng === "number" && !isNaN(rawLng)) lng = rawLng;
    } catch {}
  }

  const hasValidLocation = lat !== null && lng !== null && (lat !== 0 || lng !== 0);
  const center: [number, number] = hasValidLocation ? [lat!, lng!] : DEFAULT_CENTER;

  const displayAddress =
    resolvedAddress ||
    (location as any)?.address ||
    (typeof location === "string" ? location : null) ||
    (hasValidLocation ? `${lat!.toFixed(5)}, ${lng!.toFixed(5)}` : "No GPS data reported");

  return (
    <Card className={`flex h-full w-full min-h-[460px] flex-col overflow-hidden ${className || ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Location History</CardTitle>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              hasValidLocation
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-slate-100 text-slate-500 border border-slate-200"
            }`}
          >
            {hasValidLocation ? "GPS Active" : "No GPS"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6!">
        <div className="relative w-full flex-1 min-h-[400px] overflow-hidden rounded-xl border border-slate-100">
          {isHardwarePending ? (
            <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 bg-[#f8fafc] text-xs text-[#667085]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#1B3C73] border-t-transparent" />
              <span>Loading device telemetry...</span>
            </div>
          ) : (
            <LeafletMapClient
              center={center}
              zoom={hasValidLocation ? 14 : 12}
              hasValidLocation={hasValidLocation}
              popupText={displayAddress}
            />
          )}

          {!isHardwarePending && !hasValidLocation && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-[400] -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1.5 text-center text-xs font-medium text-[#667085] shadow-md border border-slate-200 backdrop-blur-sm">
              No location data has been reported for this device yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
