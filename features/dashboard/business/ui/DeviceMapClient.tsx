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
    <div className="z-0 h-[200px] w-full">
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        <Marker position={[6.43, 3.42]} icon={customIcon} />
        <Marker position={[6.425, 3.415]} icon={customIcon} />

        <Marker position={[6.425, 3.43]} icon={customIcon}>
          <Popup className="custom-popup" closeButton={false}>
            <div className="pb-1 font-semibold text-neutral-800">Accuracy score</div>
            <div className="text-lg leading-none font-bold">90%</div>
          </Popup>
        </Marker>

        <Marker position={[6.42, 3.424]} icon={customIcon} />
      </MapContainer>

      {/* Zoom Controls Overlay mimicking map UI */}
      <div className="absolute right-2 bottom-2 z-[1000] flex rounded-md border border-neutral-200 bg-white shadow-sm">
        <button className="px-2 py-1 text-neutral-500 hover:bg-neutral-50">↗</button>
      </div>
      <div className="absolute bottom-2 left-2 z-[1000] flex flex-col rounded-md border border-neutral-200 bg-white font-bold shadow-sm">
        <button className="border-b border-neutral-200 px-2 py-0.5 text-neutral-700 hover:bg-neutral-50">
          +
        </button>
        <button className="px-2 py-0.5 text-neutral-700 hover:bg-neutral-50">-</button>
      </div>

      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 8px 12px;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          line-height: normal;
        }
        .leaflet-control-attribution {
          font-size: 8px !important;
          color: #64748b !important;
          background: rgba(255, 255, 255, 0.75) !important;
          padding: 1px 4px !important;
          margin-right: 32px !important;
        }
        .leaflet-control-attribution a {
          color: #64748b !important;
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
}
