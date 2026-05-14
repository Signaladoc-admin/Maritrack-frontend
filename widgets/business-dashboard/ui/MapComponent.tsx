"use client";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src || markerIcon,
  iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  shadowUrl: markerShadow.src || markerShadow,
});

interface DeviceLocation {
  id: string;
  label?: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations?: DeviceLocation[];
}

// Fits the map view to all markers. Uses a stable string key as the dependency
// so the effect only fires when the actual coordinates change, not on every render.
function FitBounds({ positionKey, positions }: { positionKey: string; positions: [number, number][] }) {
  const map = useMap();
  React.useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 13);
    } else {
      map.fitBounds(L.latLngBounds(positions), { padding: [30, 30] });
    }
    // positionKey is a stable serialisation of the coordinates — avoids firing
    // on every render when the positions array gets a new reference but same values.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, positionKey]);
  return null;
}

const DEFAULT_CENTER: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos

export default function MapComponent({ locations = [] }: MapComponentProps) {
  const validLocations = React.useMemo(
    () => locations.filter((loc) => loc.lat !== 0 || loc.lng !== 0),
    [locations],
  );

  const positions = React.useMemo<[number, number][]>(
    () => validLocations.map((loc) => [loc.lat, loc.lng]),
    [validLocations],
  );

  const positionKey = React.useMemo(
    () => positions.map((p) => p.join(",")).join("|"),
    [positions],
  );

  const initialCenter: [number, number] =
    positions.length > 0 ? positions[0] : DEFAULT_CENTER;

  return (
    <div className="z-0 h-[250px] w-full overflow-hidden rounded-lg border border-gray-100">
      <MapContainer
        center={initialCenter}
        zoom={positions.length === 1 ? 13 : 5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positions.length > 0 && <FitBounds positionKey={positionKey} positions={positions} />}

        {validLocations.length > 0 ? (
          validLocations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <span className="font-medium">{loc.label || `Device ${loc.id}`}</span>
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker position={DEFAULT_CENTER}>
            <Popup>No GPS data available</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
