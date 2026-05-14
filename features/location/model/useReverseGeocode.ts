import { useState, useEffect } from "react";
import { getAddressFromCoords } from "@/shared/lib/geocoding";
import { format } from "date-fns";

export function useReverseGeocode(lat?: number, lon?: number) {
  const [address, setAddress] = useState("Fetching location...");
  const [updatedAt, setUpdatedAt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchAddress() {
      if (lat && lon) {
        setIsLoading(true);
        const addr = await getAddressFromCoords(lat, lon);
        setAddress(addr);
        setUpdatedAt(format(new Date(), "h:mm a"));
        setIsLoading(false);
      } else if (lat === undefined || lon === undefined) {
        setAddress("Location not available");
      }
    }
    fetchAddress();
  }, [lat, lon]);

  return { address, updatedAt, isLoading };
}
