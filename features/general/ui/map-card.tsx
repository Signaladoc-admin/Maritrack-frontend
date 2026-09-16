"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

const DEFAULT_CENTER: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos

interface MapCardProps {
  deviceId: string;
  className?: string;
}

export function MapCard({ deviceId, className }: MapCardProps) {
  const [isClient, setIsClient] = React.useState(false);

  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId }
  );

  React.useEffect(() => {
    setIsClient(true);
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isClient) {
    return (
      <div className="flex h-full min-h-[280px] w-full items-center justify-center bg-[var(--card-fill)] text-xs text-[var(--text-3)]">
        Loading map...
      </div>
    );
  }

  const location = hardwareData?.deviceDetails?.lastKnownLocation;
  const lat =
    typeof (location as any)?.latitude === "number" && !isNaN((location as any).latitude)
      ? (location as any).latitude
      : null;
  const lng =
    typeof (location as any)?.longitude === "number" && !isNaN((location as any).longitude)
      ? (location as any).longitude
      : null;
  const hasValidLocation = lat !== null && lng !== null && (lat !== 0 || lng !== 0);
  const center: [number, number] = hasValidLocation ? [lat!, lng!] : DEFAULT_CENTER;

  const address =
    (location as any)?.address ||
    (typeof location === "string" ? location : null) ||
    (hasValidLocation ? `${lat!.toFixed(4)}, ${lng!.toFixed(4)}` : "No GPS fix");

  return (
    <div className={`flex h-full w-full flex-col ${className || ""}`}>
      <div className="flex items-center justify-between border-b border-[var(--card-line)] bg-[var(--card-fill)] px-5 py-3.5">
        <div>
          <h4 className="text-[13.5px] font-bold text-[var(--text-1)]">Current location</h4>
          <p className="max-w-[280px] truncate text-[11.5px] text-[var(--text-3)]">{address}</p>
        </div>
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${
            hasValidLocation
              ? "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--green)]"
              : "border-[var(--card-line)] bg-[var(--card-hover)] text-[var(--text-3)]"
          }`}
        >
          {hasValidLocation ? "GPS Active" : "No GPS"}
        </span>
      </div>

      <div className="relative min-h-[260px] w-full flex-1 bg-[var(--base)]">
        {!isHardwarePending && (
          <MapContainer
            center={center}
            zoom={13}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center}>
              <Popup>
                <div className="text-xs font-semibold text-slate-900">
                  {hasValidLocation ? address : "Default location (no GPS data)"}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        )}

        <div className="absolute bottom-3 left-3 z-[400] rounded-lg border border-[var(--card-line)] bg-[var(--surface)]/90 px-2.5 py-1 text-[11px] font-medium text-[var(--text-1)] backdrop-blur-md">
          {address}
        </div>
      </div>
    </div>
  );
}
