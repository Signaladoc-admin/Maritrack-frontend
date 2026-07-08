/**
 * Geocoding utilities using Mapbox API.
 */

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

interface MapboxFeature {
  place_name: string;
  center: [number, number]; // [lon, lat]
}

interface MapboxGeocodingResponse {
  type: string;
  features: MapboxFeature[];
}

interface MapboxV6Feature {
  properties: {
    full_address?: string;
    name_preferred?: string;
    place_formatted?: string;
  };
}

interface MapboxV6ReverseResponse {
  features: MapboxV6Feature[];
}

/**
 * Reverse Geocoding: Converts coordinates (lat, lon) into a human-readable address.
 */
export async function getAddressFromCoords(lat: number, lon: number): Promise<string> {
  if (!lat || !lon) return "Unknown coordinates";
  if (!MAPBOX_ACCESS_TOKEN) return "Mapbox token missing";

  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lon}&latitude=${lat}&access_token=${MAPBOX_ACCESS_TOKEN}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MapboxV6ReverseResponse = await response.json();

    if (data.features && data.features.length > 0) {
      const props = data.features[0].properties;
      return (
        props.full_address ||
        [props.name_preferred, props.place_formatted].filter(Boolean).join(", ") ||
        "Address not found"
      );
    }
    return "Address not found";
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Error fetching address";
  }
}

/**
 * Forward Geocoding: Converts a text address into coordinates (lat, lon).
 */
export async function getCoordsFromAddress(
  address: string
): Promise<{ lat: number; lon: number } | null> {
  if (!address) return null;
  if (!MAPBOX_ACCESS_TOKEN) return null;

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MapboxGeocodingResponse = await response.json();

    if (data.features && data.features.length > 0) {
      return {
        lat: data.features[0].center[1],
        lon: data.features[0].center[0],
      };
    }

    return null;
  } catch (error) {
    console.error("Forward geocoding error:", error);
    return null;
  }
}
export interface LocationSuggestion {
  lat: number;
  lon: number;
  displayName: string;
}

/**
 * Search: Returns a list of location suggestions based on a text query.
 */
export async function searchLocations(query: string): Promise<LocationSuggestion[]> {
  if (!query || query.length < 2) return [];
  if (!MAPBOX_ACCESS_TOKEN) return [];

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=5`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MapboxGeocodingResponse = await response.json();
    return data.features.map((item) => ({
      lat: item.center[1],
      lon: item.center[0],
      displayName: item.place_name,
    }));
  } catch (error) {
    console.error("Location search error:", error);
    return [];
  }
}
