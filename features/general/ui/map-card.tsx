"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { getAddressFromCoords } from "@/shared/lib/geocoding";
import { MapPin, Navigation } from "lucide-react";

const LeafletMapClient = dynamic(() => import("./LeafletMapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[380px] w-full flex-col items-center justify-center gap-2 bg-[var(--base)] text-xs text-[var(--text-3)]">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
      <span className="font-medium">Loading map...</span>
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

  const deviceDetails = hardwareData?.deviceDetails;
  const location = deviceDetails?.lastKnownLocation;

  // Safely extract coordinates from object or string
  let lat: number | null = null;
  let lng: number | null = null;

  if (location && typeof location === "object") {
    if (typeof (location as any).latitude === "number" && !isNaN((location as any).latitude)) {
      lat = (location as any).latitude;
    }
    if (typeof (location as any).longitude === "number" && !isNaN((location as any).longitude)) {
      lng = (location as any).longitude;
    }
  } else if (typeof location === "string") {
    try {
      const parsed = JSON.parse(location);
      if (typeof parsed.latitude === "number" && !isNaN(parsed.latitude)) lat = parsed.latitude;
      if (typeof parsed.longitude === "number" && !isNaN(parsed.longitude)) lng = parsed.longitude;
    } catch {}
  }

  const hasValidLocation = lat !== null && lng !== null && (lat !== 0 || lng !== 0);
  const center: [number, number] = hasValidLocation ? [lat!, lng!] : DEFAULT_CENTER;

  // Auto-reverse geocode if no external resolvedAddress was provided
  const [internalAddress, setInternalAddress] = useState<string | null>(null);

  useEffect(() => {
    if (resolvedAddress) {
      setInternalAddress(resolvedAddress);
      return;
    }

    let isMounted = true;
    if (hasValidLocation) {
      getAddressFromCoords(lat!, lng!)
        .then((addr) => {
          if (!isMounted) return;
          if (addr && addr !== "Error fetching address" && addr !== "Address not found") {
            setInternalAddress(addr);
          } else {
            const fallback =
              (location as any)?.address ||
              (typeof location === "string" ? location : null) ||
              `${lat!.toFixed(5)}, ${lng!.toFixed(5)}`;
            setInternalAddress(fallback);
          }
        })
        .catch(() => {
          if (!isMounted) return;
          setInternalAddress(
            (location as any)?.address ||
              (typeof location === "string" ? location : null) ||
              `${lat!.toFixed(5)}, ${lng!.toFixed(5)}`
          );
        });
    } else {
      setInternalAddress(
        (location as any)?.address ||
          (typeof location === "string" ? location : null) ||
          "No GPS signal reported"
      );
    }

    return () => {
      isMounted = false;
    };
  }, [resolvedAddress, hasValidLocation, lat, lng, location]);

  const displayAddress =
    resolvedAddress ||
    internalAddress ||
    (hasValidLocation ? `${lat!.toFixed(5)}, ${lng!.toFixed(5)}` : "No GPS fix");

  const deviceName =
    (deviceDetails as any)?.devicePossessor?.name ||
    (deviceDetails as any)?.deviceTag ||
    (deviceDetails as any)?.brand ||
    "Device";

  return (
    <div className={`flex h-full w-full flex-col ${className || ""}`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[var(--card-line)] bg-[var(--card-fill)] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--surface)] text-[var(--accent)] shadow-xs">
            <Navigation className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-[13px] font-bold tracking-tight text-[var(--text-1)]">
                Current location
              </h4>
              {hasValidLocation && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 text-[10px] font-bold text-[var(--green)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                  Live GPS
                </span>
              )}
            </div>
            <p className="max-w-[320px] truncate text-[11.5px] text-[var(--text-3)]">
              {displayAddress}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
              hasValidLocation
                ? "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--green)]"
                : "border-[var(--card-line)] bg-[var(--card-hover)] text-[var(--text-3)]"
            }`}
          >
            {hasValidLocation ? "GPS Active" : "No GPS"}
          </span>
        </div>
      </div>

      {/* Leaflet Map Area */}
      <div className="relative min-h-[360px] md:min-h-[420px] w-full flex-1 overflow-hidden bg-[var(--base)]">
        {isHardwarePending ? (
          <div className="flex h-full min-h-[360px] w-full flex-col items-center justify-center gap-2 bg-[var(--base)] text-xs text-[var(--text-3)]">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
            <span className="font-medium">Loading device telemetry...</span>
          </div>
        ) : (
          <LeafletMapClient
            center={center}
            hasValidLocation={hasValidLocation}
            address={displayAddress}
            deviceName={deviceName}
          />
        )}

        {/* Floating location label on bottom left of map */}
        <div className="pointer-events-none absolute bottom-3.5 left-3.5 z-[400] max-w-[calc(100%-90px)] rounded-xl border border-[var(--card-line)] bg-[var(--surface)]/90 px-3 py-1.5 text-[11.5px] font-medium text-[var(--text-1)] shadow-md backdrop-blur-md">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
            <span className="truncate">{displayAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
