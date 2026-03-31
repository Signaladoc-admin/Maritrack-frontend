"use client";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React Leaflet
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

export default function MapComponent() {
  const lagosPosition: [number, number] = [6.4281, 3.4219]; // Victoria Island, Lagos
  
  return (
    <div className="h-[250px] w-full z-0 rounded-lg overflow-hidden border border-gray-100">
      <MapContainer 
        center={lagosPosition} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={lagosPosition}>
          <Popup>
            Accuracy score<br /><b>90%</b>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
