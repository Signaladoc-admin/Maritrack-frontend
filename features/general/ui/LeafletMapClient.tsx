"use client";

import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Configure default marker icons
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

interface LeafletMapClientProps {
  center: [number, number];
  zoom?: number;
  hasValidLocation: boolean;
  popupText?: string;
}

// Controller component to keep Leaflet view synchronized and invalidate size on mount/resize
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    if (!center || isNaN(center[0]) || isNaN(center[1])) return;
    map.setView(center, zoom, { animate: true });
  }, [map, center, zoom]);

  useEffect(() => {
    // Invalidate map size to prevent grey/broken tiles inside tab switches and flex containers
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);

  return null;
}

export default function LeafletMapClient({
  center,
  zoom = 13,
  hasValidLocation,
  popupText,
}: LeafletMapClientProps) {
  // Custom marker pin with pulse animation
  const markerIcon = useMemo(() => {
    const color = hasValidLocation ? "#1B3C73" : "#667085";
    return L.divIcon({
      className: "custom-leaflet-pin",
      html: `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background-color: ${color}; opacity: 0.22; animation: leaflet-pin-pulse 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <span style="position: absolute; width: 22px; height: 22px; border-radius: 50%; background-color: ${color}; opacity: 0.35;"></span>
          <span style="position: relative; width: 14px; height: 14px; border-radius: 50%; background-color: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></span>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17],
    });
  }, [hasValidLocation]);

  return (
    <div className="relative h-full min-h-[400px] w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        attributionControl={true}
        style={{ height: "100%", width: "100%", minHeight: "400px" }}
        className="z-0 h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        <MapViewController center={center} zoom={zoom} />

        <Marker position={center} icon={markerIcon}>
          <Popup>
            <div className="p-1 text-xs font-semibold text-slate-800">
              {popupText ||
                (hasValidLocation ? "Last known location" : "Default location (no GPS data)")}
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      <style jsx global>{`
        @keyframes leaflet-pin-pulse {
          70%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          color: #64748b !important;
          background: rgba(255, 255, 255, 0.7) !important;
          padding: 1px 5px !important;
          border-radius: 3px 0 0 0;
        }
        .leaflet-control-attribution a {
          color: #64748b !important;
          text-decoration: none !important;
        }
      `}</style>
    </div>
  );
}
