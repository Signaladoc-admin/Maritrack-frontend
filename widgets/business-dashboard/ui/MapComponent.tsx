"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

const DEFAULT_CENTER: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos

export interface DeviceLocation {
  id: string;
  label?: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations?: DeviceLocation[];
}

// Adjusts the viewport whenever positions change — handles the single-marker
// case with setView and the multi-marker case with fitBounds.
// MapContainer.center is only used for initialization, so this is the only
// way to keep the viewport in sync after async data arrives.
function FitBounds({
  positionKey,
  positions,
}: {
  positionKey: string;
  positions: [number, number][];
}) {
  const map = useMap();

  React.useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 13);
      return;
    }
    import("leaflet").then((L) => {
      map.fitBounds(L.latLngBounds(positions), { padding: [30, 30] });
    });
    // positionKey is a stable string serialisation — avoids re-running when the
    // array gets a new reference but carries the same coordinates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, positionKey]);

  return null;
}

export default function MapComponent({ locations = [] }: MapComponentProps) {
  const [isClient, setIsClient] = React.useState(false);

  // Mirror map-card.tsx: fix Leaflet's default marker icons using CDN URLs so
  // webpack/Next.js doesn't break the PNG resolution.
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

  const validLocations = React.useMemo(
    () => locations.filter((loc) => loc.lat !== 0 || loc.lng !== 0),
    [locations]
  );

  const positions = React.useMemo<[number, number][]>(
    () => validLocations.map((loc) => [loc.lat, loc.lng]),
    [validLocations]
  );

  const positionKey = React.useMemo(() => positions.map((p) => p.join(",")).join("|"), [positions]);

  // Mirror map-card.tsx: always start at zoom 13 (city level).
  // FitBounds zooms out to fit multiple pins when needed.
  const center: [number, number] = positions.length > 0 ? positions[0] : DEFAULT_CENTER;

  if (!isClient) return null;

  return (
    <div className="z-0 h-[250px] w-full overflow-hidden rounded-lg border border-gray-100">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds positionKey={positionKey} positions={positions} />

        {validLocations.length > 0 ? (
          validLocations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <span className="text-sm font-medium">{loc.label || `Device ${loc.id}`}</span>
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker position={DEFAULT_CENTER}>
            <Popup>No GPS data available for any device</Popup>
          </Marker>
        )}
      </MapContainer>

      {validLocations.length === 0 && (
        <p className="mt-2 text-center text-xs text-[#667085]">
          No location data has been reported for any device yet.
        </p>
      )}
    </div>
  );
}
