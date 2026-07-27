"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

const DEFAULT_CENTER: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos

export function MapCard({ deviceId }: { deviceId: string }) {
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

  if (!isClient) return null;

  const location = hardwareData?.deviceDetails?.lastKnownLocation;
  const lat =
    typeof location?.latitude === "number" && !isNaN(location.latitude) ? location.latitude : null;
  const lng =
    typeof location?.longitude === "number" && !isNaN(location.longitude)
      ? location.longitude
      : null;
  const hasValidLocation = lat !== null && lng !== null && (lat !== 0 || lng !== 0);

  const center: [number, number] = hasValidLocation ? [lat!, lng!] : DEFAULT_CENTER;

  return (
    <Card className="flex h-full w-full flex-col overflow-hidden">
      <CardHeader>
        <CardTitle>Location History</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-6!">
        <div className="w-full flex-1 min-h-[400px]">
          {!isHardwarePending && (
            <MapContainer
              center={center}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {hasValidLocation ? (
                <Marker position={center}>
                  <Popup>Last known location</Popup>
                </Marker>
              ) : (
                <Marker position={DEFAULT_CENTER}>
                  <Popup>No GPS data available for this device</Popup>
                </Marker>
              )}
            </MapContainer>
          )}
          {!isHardwarePending && !hasValidLocation && (
            <p className="mt-2 text-center text-xs text-[#667085]">
              No location data has been reported for this device yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
