"use client";

import React, { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Plus, Minus, MapPin } from "lucide-react";

// Fix default Leaflet icon paths in browser
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

interface LeafletMapClientProps {
  center: [number, number];
  hasValidLocation: boolean;
  address?: string;
  deviceName?: string;
}

// Controller component to keep Leaflet view in sync with coordinates & fix resize glitches
function MapViewController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    if (!center || isNaN(center[0]) || isNaN(center[1])) return;
    map.setView(center, zoom, { animate: true });
  }, [map, center, zoom]);

  useEffect(() => {
    // Initial and staggered invalidations to prevent grey tiles inside tab switches and dynamic panels
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 300);
    const t3 = setTimeout(() => map.invalidateSize(), 600);

    const container = map.getContainer();
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && container) {
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });
      resizeObserver.observe(container);
    }

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

// Custom UI controls inside Leaflet context
function MapControlsOverlay({ onRecenter }: { onRecenter: () => void }) {
  const map = useMap();

  return (
    <div className="absolute right-3.5 bottom-3.5 z-[1000] flex flex-col gap-2">
      {/* Re-center button */}
      <button
        type="button"
        onClick={onRecenter}
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--surface)] text-[var(--text-1)] shadow-md transition-all hover:bg-[var(--card-hover)] active:scale-95 cursor-pointer"
        title="Center on device"
      >
        <Crosshair className="h-4 w-4 text-[var(--accent)]" />
      </button>

      {/* Zoom controls */}
      <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--card-line)] bg-[var(--surface)] shadow-md">
        <button
          type="button"
          onClick={() => map.zoomIn()}
          className="flex h-8 w-8 items-center justify-center border-b border-[var(--card-line)] text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] cursor-pointer"
          title="Zoom in"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => map.zoomOut()}
          className="flex h-8 w-8 items-center justify-center text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] cursor-pointer"
          title="Zoom out"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function LeafletMapClient({
  center,
  hasValidLocation,
  address,
  deviceName = "Device",
}: LeafletMapClientProps) {
  // Custom glowing pulse radar marker icon
  const markerIcon = useMemo(() => {
    const color = hasValidLocation ? "#01db5e" : "#ff6857";
    return L.divIcon({
      className: "custom-leaflet-marker",
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <span style="position: absolute; width: 36px; height: 36px; border-radius: 50%; background-color: ${color}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <span style="position: absolute; width: 22px; height: 22px; border-radius: 50%; background-color: ${color}; opacity: 0.5;"></span>
          <span style="position: relative; width: 14px; height: 14px; border-radius: 50%; background-color: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.45);"></span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });
  }, [hasValidLocation]);

  const [mapRef, setMapRef] = React.useState<L.Map | null>(null);

  const handleRecenter = () => {
    if (mapRef && center) {
      mapRef.setView(center, hasValidLocation ? 15 : 12, { animate: true });
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={center}
        zoom={hasValidLocation ? 15 : 12}
        scrollWheelZoom={true}
        zoomControl={false}
        ref={setMapRef}
        className="h-full w-full z-0"
        style={{ height: "100%", width: "100%", background: "var(--base)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewController center={center} zoom={hasValidLocation ? 15 : 12} />

        <Marker position={center} icon={markerIcon}>
          <Popup className="custom-device-popup" autoPan={false}>
            <div className="p-1 text-left min-w-[180px]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-1)]">
                <span
                  className={`h-2 w-2 rounded-full ${
                    hasValidLocation ? "bg-[var(--green)]" : "bg-[var(--coral)]"
                  }`}
                />
                <span>{deviceName}</span>
              </div>
              <div className="mt-1 text-[11.5px] leading-snug text-[var(--text-2)]">
                {address || `${center[0].toFixed(5)}, ${center[1].toFixed(5)}`}
              </div>
              <div className="mt-1.5 font-mono text-[10px] text-[var(--text-3)]">
                {center[0].toFixed(6)}, {center[1].toFixed(6)}
              </div>
            </div>
          </Popup>
        </Marker>

        <MapControlsOverlay onRecenter={handleRecenter} />
      </MapContainer>

      <style jsx global>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .custom-device-popup .leaflet-popup-content-wrapper {
          background: var(--surface) !important;
          color: var(--text-1) !important;
          border: 1px solid var(--card-line) !important;
          border-radius: 14px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
          padding: 6px 10px !important;
        }
        .custom-device-popup .leaflet-popup-tip {
          background: var(--surface) !important;
          border: 1px solid var(--card-line) !important;
        }
        .custom-device-popup .leaflet-popup-close-button {
          color: var(--text-3) !important;
          padding: 6px !important;
        }
        .custom-device-popup .leaflet-popup-close-button:hover {
          color: var(--text-1) !important;
        }
      `}</style>
    </div>
  );
}
