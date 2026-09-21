"use client";

import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMapboxRasterTileUrl } from "@/shared/lib/mapbox";

if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

export default function LeafletDeviceFallback({
  center,
  markers,
}: {
  center: { latitude: number; longitude: number };
  markers: Array<{ id: string; lat: number; lng: number; popup?: boolean }>;
}) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={14}
        scrollWheelZoom={false}
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={getMapboxRasterTileUrl("streets-v12")}
          tileSize={256}
          maxZoom={19}
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            {m.popup && (
              <Popup>
                <div className="p-1">
                  <div className="text-xs font-semibold text-neutral-800">Accuracy score</div>
                  <div className="text-base font-bold text-slate-900">90%</div>
                </div>
              </Popup>
            )}
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
