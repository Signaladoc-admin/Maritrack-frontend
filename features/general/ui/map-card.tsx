"use client";

import React, { useEffect, useRef, useState, Component } from "react";
import dynamic from "next/dynamic";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MapPin } from "lucide-react";

// Fallback map for environments where WebGL is disabled or unsupported (e.g. Brave shields, hardware acceleration off)
const LeafletFallbackMap = dynamic(() => import("./LeafletFallbackMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 text-xs text-slate-400">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1B3C73] border-t-transparent" />
      <span>Loading map...</span>
    </div>
  ),
});

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2");
    if (!gl) return false;
    return typeof mapboxgl.supported === "function" ? mapboxgl.supported() : true;
  } catch {
    return false;
  }
}

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("Mapbox WebGL initialization failed, activating 2D map fallback:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const DEFAULT_CENTER = {
  latitude: 6.4281,
  longitude: 3.4219, // Victoria Island, Lagos
};

interface MapCardProps {
  deviceId: string;
  className?: string;
  resolvedAddress?: string;
}

export function MapCard({ deviceId, className, resolvedAddress }: MapCardProps) {
  const [isClient, setIsClient] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const mapRef = useRef<MapRef>(null);

  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId }
  );

  useEffect(() => {
    setIsClient(true);
    setIsWebGLAvailable(checkWebGLSupport());
  }, []);

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

  const center = hasValidLocation
    ? { latitude: lat!, longitude: lng! }
    : DEFAULT_CENTER;

  // Fly to location when coordinates become available
  useEffect(() => {
    if (hasValidLocation && mapRef.current) {
      try {
        mapRef.current.flyTo({
          center: [center.longitude, center.latitude],
          zoom: 14,
          duration: 1200,
        });
      } catch {}
    }
  }, [hasValidLocation, center.latitude, center.longitude]);

  const displayAddress =
    resolvedAddress ||
    (location as any)?.address ||
    (typeof location === "string" ? location : null) ||
    (hasValidLocation ? `${lat!.toFixed(5)}, ${lng!.toFixed(5)}` : "No GPS data reported");

  if (!isClient) {
    return (
      <Card className={`flex h-full w-full min-h-[460px] flex-col overflow-hidden ${className || ""}`}>
        <CardHeader>
          <CardTitle>Location History</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6!">
          <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 text-xs text-slate-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1B3C73] border-t-transparent" />
            <span>Loading map...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderFallback = (
    <LeafletFallbackMap
      center={[center.latitude, center.longitude]}
      zoom={hasValidLocation ? 14 : 12}
      hasValidLocation={hasValidLocation}
      popupText={displayAddress}
    />
  );

  return (
    <Card className={`flex h-full w-full min-h-[460px] flex-col overflow-hidden ${className || ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Location History</CardTitle>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                hasValidLocation
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-slate-200 bg-slate-100 text-slate-500"
              }`}
            >
              {hasValidLocation ? "GPS Active" : "No GPS"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6!">
        <div className="relative w-full flex-1 min-h-[400px] overflow-hidden rounded-xl border border-slate-100">
          {isHardwarePending ? (
            <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 bg-slate-50 text-xs text-slate-400">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#1B3C73] border-t-transparent" />
              <span>Loading device telemetry...</span>
            </div>
          ) : isWebGLAvailable === false ? (
            renderFallback
          ) : (
            <WebGLErrorBoundary fallback={renderFallback}>
              <Map
                ref={mapRef}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                  longitude: center.longitude,
                  latitude: center.latitude,
                  zoom: hasValidLocation ? 14 : 12,
                }}
                style={{ width: "100%", height: "100%", minHeight: "400px" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
              >
                <NavigationControl position="bottom-right" />

                <Marker
                  longitude={center.longitude}
                  latitude={center.latitude}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setShowPopup(true);
                  }}
                >
                  <div className="group relative flex cursor-pointer flex-col items-center">
                    <div className="relative flex h-8 w-8 items-center justify-center">
                      <span className="absolute h-8 w-8 animate-ping rounded-full bg-[#1B3C73] opacity-25" />
                      <span className="absolute h-5 w-5 rounded-full bg-[#1B3C73] opacity-40" />
                      <div className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#1B3C73] shadow-lg">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Marker>

                {showPopup && (
                  <Popup
                    longitude={center.longitude}
                    latitude={center.latitude}
                    anchor="top"
                    offset={[0, 10]}
                    onClose={() => setShowPopup(false)}
                    closeButton={true}
                    closeOnClick={false}
                    className="rounded-lg shadow-xl"
                  >
                    <div className="p-1 text-xs">
                      <div className="font-semibold text-slate-900">
                        {hasValidLocation ? "Last Known Location" : "Default Location (No GPS)"}
                      </div>
                      <div className="mt-1 text-slate-600">{displayAddress}</div>
                      <div className="mt-1 font-mono text-[10px] text-slate-400">
                        {center.latitude.toFixed(6)}, {center.longitude.toFixed(6)}
                      </div>
                    </div>
                  </Popup>
                )}
              </Map>
            </WebGLErrorBoundary>
          )}

          {!isHardwarePending && !hasValidLocation && (
            <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-slate-200 bg-white/95 px-3 py-1.5 text-center text-xs font-medium text-slate-500 shadow-md backdrop-blur-sm">
              No location data has been reported for this device yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
