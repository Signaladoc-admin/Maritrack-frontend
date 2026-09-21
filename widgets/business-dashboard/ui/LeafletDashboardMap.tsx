"use client";

import React, { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { DeviceLocation } from "./MapComponent";

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length === 0) return;
    if (positions.length === 1) {
      map.setView(positions[0], 13);
      return;
    }
    map.fitBounds(L.latLngBounds(positions), { padding: [30, 30] });
  }, [map, positions]);

  useEffect(() => {
    map.invalidateSize();
    const t = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(t);
  }, [map]);

  return null;
}

export default function LeafletDashboardMap({
  locations = [],
  center,
}: {
  locations?: DeviceLocation[];
  center: { latitude: number; longitude: number };
}) {
  const validLocations = React.useMemo(
    () => locations.filter((loc) => loc.lat !== 0 || loc.lng !== 0),
    [locations]
  );

  const positions = React.useMemo<[number, number][]>(
    () => validLocations.map((loc) => [loc.lat, loc.lng]),
    [validLocations]
  );

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={19} />
        <FitBounds positions={positions} />

        {validLocations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <span className="text-sm font-medium">{loc.label || `Device ${loc.id}`}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <style jsx global>{`
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
