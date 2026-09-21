"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const LeafletDashboardMap = dynamic(() => import("./LeafletDashboardMap"), {
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

class WebGLErrorBoundary extends React.Component<
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
    console.warn("MapComponent WebGL error, using fallback:", error.message);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const DEFAULT_CENTER = {
  latitude: 6.4281,
  longitude: 3.4219, // Victoria Island, Lagos
};

export interface DeviceLocation {
  id: string;
  label?: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations?: DeviceLocation[];
}

export default function MapComponent({ locations = [] }: MapComponentProps) {
  const [isClient, setIsClient] = React.useState(false);
  const [isWebGLAvailable, setIsWebGLAvailable] = React.useState<boolean | null>(null);
  const [selectedLoc, setSelectedLoc] = React.useState<DeviceLocation | null>(null);
  const mapRef = React.useRef<MapRef>(null);

  React.useEffect(() => {
    setIsClient(true);
    setIsWebGLAvailable(checkWebGLSupport());
  }, []);

  const validLocations = React.useMemo(
    () => locations.filter((loc) => loc.lat !== 0 || loc.lng !== 0),
    [locations]
  );

  const center = React.useMemo(() => {
    if (validLocations.length > 0) {
      return { latitude: validLocations[0].lat, longitude: validLocations[0].lng };
    }
    return DEFAULT_CENTER;
  }, [validLocations]);

  // Adjust viewport to fit multiple markers or center single marker
  React.useEffect(() => {
    if (!mapRef.current || validLocations.length === 0) return;

    if (validLocations.length === 1) {
      try {
        mapRef.current.flyTo({
          center: [validLocations[0].lng, validLocations[0].lat],
          zoom: 13,
          duration: 1000,
        });
      } catch {}
      return;
    }

    let minLng = validLocations[0].lng;
    let maxLng = validLocations[0].lng;
    let minLat = validLocations[0].lat;
    let maxLat = validLocations[0].lat;

    for (const loc of validLocations) {
      if (loc.lng < minLng) minLng = loc.lng;
      if (loc.lng > maxLng) maxLng = loc.lng;
      if (loc.lat < minLat) minLat = loc.lat;
      if (loc.lat > maxLat) maxLat = loc.lat;
    }

    try {
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000, maxZoom: 15 }
      );
    } catch {}
  }, [validLocations]);

  if (!isClient) {
    return (
      <div className="flex h-[250px] w-full items-center justify-center rounded-lg border border-gray-100 bg-slate-50 text-xs text-slate-400">
        Loading map...
      </div>
    );
  }

  const fallback = <LeafletDashboardMap locations={locations} center={center} />;

  return (
    <div className="relative h-[250px] w-full overflow-hidden rounded-lg border border-gray-100">
      {isWebGLAvailable === false ? (
        fallback
      ) : (
        <WebGLErrorBoundary fallback={fallback}>
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: center.longitude,
              latitude: center.latitude,
              zoom: 12,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
          >
            <NavigationControl position="bottom-right" />

            {validLocations.map((loc) => (
              <Marker
                key={loc.id}
                longitude={loc.lng}
                latitude={loc.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setSelectedLoc(loc);
                }}
              >
                <div className="group relative flex cursor-pointer flex-col items-center">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#1B3C73] opacity-25" />
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#1B3C73] shadow-md">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </Marker>
            ))}

            {selectedLoc && (
              <Popup
                longitude={selectedLoc.lng}
                latitude={selectedLoc.lat}
                anchor="top"
                offset={[0, 8]}
                onClose={() => setSelectedLoc(null)}
                closeButton={true}
                closeOnClick={false}
              >
                <div className="p-1 text-xs">
                  <span className="font-semibold text-slate-800">
                    {selectedLoc.label || `Device ${selectedLoc.id}`}
                  </span>
                  <div className="font-mono text-[10px] text-slate-400">
                    {selectedLoc.lat.toFixed(5)}, {selectedLoc.lng.toFixed(5)}
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </WebGLErrorBoundary>
      )}

      {validLocations.length === 0 && (
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded bg-white/90 px-2 py-0.5 text-center text-xs text-[#667085] shadow-xs">
          No location data has been reported for any device yet.
        </div>
      )}
    </div>
  );
}
