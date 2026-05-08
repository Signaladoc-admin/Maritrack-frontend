"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues in Next.js
const customIcon = L.divIcon({
  className: "custom-map-marker",
  html: `<div style="background-color: #ef4444; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 0 2px white, 0 2px 4px rgba(0,0,0,0.2);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function DeviceMapClient() {
  const center: [number, number] = [6.428, 3.421]; // Rough coordinates for Victoria Island, Lagos

  return (
    <div className="w-full h-[200px] z-0">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />

        <Marker position={[6.43, 3.42]} icon={customIcon} />
        <Marker position={[6.425, 3.415]} icon={customIcon} />
        
        <Marker position={[6.425, 3.43]} icon={customIcon}>
          <Popup className="custom-popup" closeButton={false}>
            <div className="font-semibold text-neutral-800 pb-1">Accuracy score</div>
            <div className="font-bold text-lg leading-none">90%</div>
          </Popup>
        </Marker>

        <Marker position={[6.42, 3.424]} icon={customIcon} />
      </MapContainer>
      
      {/* Zoom Controls Overlay mimicking map UI */}
      <div className="absolute bottom-2 right-2 bg-white rounded-md shadow-sm border border-neutral-200 z-[1000] flex">
        <button className="px-2 py-1 text-neutral-500 hover:bg-neutral-50">↗</button>
      </div>
      <div className="absolute bottom-2 left-2 bg-white rounded-md shadow-sm border border-neutral-200 z-[1000] flex flex-col font-bold">
        <button className="px-2 py-0.5 border-b border-neutral-200 text-neutral-700 hover:bg-neutral-50">+</button>
        <button className="px-2 py-0.5 text-neutral-700 hover:bg-neutral-50">-</button>
      </div>

      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          padding: 8px 12px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          line-height: normal;
        }
      `}</style>
    </div>
  );
}
