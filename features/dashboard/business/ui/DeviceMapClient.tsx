"use client";

import React, { useState, useEffect, Component } from "react";
import dynamic from "next/dynamic";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const LeafletDeviceFallback = dynamic(() => import("./LeafletDeviceFallback"), {
  ssr: false,
});

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl") ||
      canvas.getContext("webgl2");
    if (!gl) return false;
    return typeof mapboxgl.supported === "function" ? mapboxgl.supported() : true;
  } catch {
    return false;
  }
}

class WebGLErrorBoundary extends Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("DeviceMapClient WebGL error, using fallback:", error.message);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const markers = [
  { id: "1", lat: 6.43, lng: 3.42 },
  { id: "2", lat: 6.425, lng: 3.415 },
  { id: "3", lat: 6.425, lng: 3.43, popup: true },
  { id: "4", lat: 6.42, lng: 3.424 },
];

export default function DeviceMapClient() {
  const [isClient, setIsClient] = useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(null);
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(() => {
    setIsClient(true);
    setIsWebGLAvailable(checkWebGLSupport());
  }, []);

  const center = {
    latitude: 6.428,
    longitude: 3.421, // Victoria Island, Lagos
  };

  if (!isClient) {
    return (
      <div className="h-[200px] w-full animate-pulse rounded-md bg-[#f5f6f8]" />
    );
  }

  const fallback = <LeafletDeviceFallback center={center} markers={markers} />;

  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
      {isWebGLAvailable === false ? (
        fallback
      ) : (
        <WebGLErrorBoundary fallback={fallback}>
          <Map
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: center.longitude,
              latitude: center.latitude,
              zoom: 14,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="bottom-right" />

            {markers.map((m) => (
              <Marker
                key={m.id}
                longitude={m.lng}
                latitude={m.lat}
                anchor="center"
                onClick={() => m.popup && setPopupOpen(true)}
              >
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_0_2px_white,0_2px_4px_rgba(0,0,0,0.2)]" />
              </Marker>
            ))}

            {popupOpen && (
              <Popup
                longitude={3.43}
                latitude={6.425}
                anchor="bottom"
                offset={[0, -10]}
                onClose={() => setPopupOpen(false)}
                closeButton={false}
                className="custom-popup"
              >
                <div className="p-1">
                  <div className="text-xs font-semibold text-neutral-800 pb-0.5">Accuracy score</div>
                  <div className="text-base font-bold leading-none text-slate-900">90%</div>
                </div>
              </Popup>
            )}
          </Map>
        </WebGLErrorBoundary>
      )}
    </div>
  );
}
