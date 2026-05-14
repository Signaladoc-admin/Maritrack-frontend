/**
 * Geocoding utilities using OpenStreetMap Nominatim API.
 * NOTE: Nominatim requires a valid User-Agent and limits requests to 1 per second.
 */

interface NominatimReverseResponse {
  display_name: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

interface NominatimForwardResponse {
  lat: string;
  lon: string;
  display_name: string;
}

/**
 * Reverse Geocoding: Converts coordinates (lat, lon) into a human-readable address.
 */
export async function getAddressFromCoords(lat: number, lon: number): Promise<string> {
  if (!lat || !lon) return "Unknown coordinates";

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      {
        headers: {
          // Nominatim requires a unique User-Agent to identify the application
          "User-Agent": "Maritrack-Frontend/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimReverseResponse = await response.json();
    return data.display_name || "Address not found";
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

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
      {
        headers: {
          "User-Agent": "Maritrack-Frontend/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimForwardResponse[] = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
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

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      {
        headers: {
          "User-Agent": "Maritrack-Frontend/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NominatimForwardResponse[] = await response.json();
    return data.map((item) => ({
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      displayName: item.display_name,
    }));
  } catch (error) {
    console.error("Location search error:", error);
    return [];
  }
}
