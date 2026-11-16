"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MapCard } from "@/features/general/ui/map-card";
import { getAddressFromCoords } from "@/shared/lib/geocoding";
import { format } from "date-fns";
import { MapPin, Loader2 } from "lucide-react";

export default function LocationPage() {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId,
  });

  const deviceDetails = hardwareData?.deviceDetails;
  const zoneName = (deviceDetails as any)?.zone?.name || "-";
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

  const hasValidCoords = lat !== null && lng !== null && (lat !== 0 || lng !== 0);

  const [mapboxAddress, setMapboxAddress] = useState<string | null>(null);
  const [isResolvingAddress, setIsResolvingAddress] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (!hasValidCoords) {
      setMapboxAddress(null);
      setIsResolvingAddress(false);
      return;
    }

    setIsResolvingAddress(true);
    getAddressFromCoords(lat!, lng!)
      .then((resolved) => {
        if (!isMounted) return;
        if (resolved && resolved !== "Address not found" && resolved !== "Error fetching address") {
          setMapboxAddress(resolved);
        } else {
          // Fallback to backend address or coordinates
          const fallback =
            (location as any)?.address ||
            (typeof location === "string" ? location : null) ||
            `${lat!.toFixed(5)}, ${lng!.toFixed(5)}`;
          setMapboxAddress(fallback);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Mapbox reverse geocoding error:", err);
        const fallback =
          (location as any)?.address ||
          (typeof location === "string" ? location : null) ||
          `${lat!.toFixed(5)}, ${lng!.toFixed(5)}`;
        setMapboxAddress(fallback);
      })
      .finally(() => {
        if (isMounted) setIsResolvingAddress(false);
      });

    return () => {
      isMounted = false;
    };
  }, [lat, lng, hasValidCoords, location]);

  const displayAddress =
    mapboxAddress ||
    (location as any)?.address ||
    (typeof location === "string" ? location : null) ||
    (hasValidCoords ? `${lat!.toFixed(5)}, ${lng!.toFixed(5)}` : "No GPS address reported");

  const lastSeenDate = deviceDetails?.lastSeenAt || deviceDetails?.updatedAt;
  const formattedLastSeen = lastSeenDate
    ? format(new Date(lastSeenDate), "dd MMM yyyy, h:mm a")
    : "-";

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      <div className="dd-section">
        <div className="dd-section-title">Current location</div>
        <div className="surface min-h-[440px] w-full overflow-hidden">
          <MapCard deviceId={deviceId} resolvedAddress={displayAddress} />
        </div>
      </div>

      <div className="dd-section">
        <div className="dd-section-title">Location details</div>
        <div className="dd-tile-grid">
          <div className="dd-tile span-2">
            <div className="flex items-center justify-between">
              <div className="tk">Reported address</div>
              {hasValidCoords && !isResolvingAddress && mapboxAddress && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                  <MapPin className="h-2.5 w-2.5" />
                  Mapbox Verified
                </span>
              )}
            </div>
            <div className="tv mt-1">
              {isResolvingAddress ? (
                <div className="flex items-center gap-2 py-0.5 text-xs text-[var(--text-3)] animate-pulse">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--accent)]" />
                  <span>Resolving address via Mapbox...</span>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-[var(--text-1)]">
                    {displayAddress}
                  </span>
                  {hasValidCoords && (
                    <span className="font-mono text-[11px] text-[var(--text-3)]">
                      {lat!.toFixed(6)}, {lng!.toFixed(6)}
                    </span>
                  )}
                </div>
              )}
            </div>
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
