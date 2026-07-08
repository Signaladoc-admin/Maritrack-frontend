"use server";

import { apiClient } from "@/shared/lib/api-client";
import type { ActionResult, ApiResponse } from "@/shared/api/types";
import { withSafeAction } from "@/shared/lib/safe-action";
import type {
  Restrictions,
  RestrictionsRequest,
  SetRestrictionsResponse,
} from "../types";

export async function getRestrictionsAction(mdmDeviceId: string) {
  return withSafeAction(
    async () =>
      await apiClient<ApiResponse<Restrictions>>(`/mdm-sync/${mdmDeviceId}/restrictions`, {
        method: "GET",
      }),
    "Failed to get restrictions"
  );
}

export async function setRestrictionsAction({
  mdmDeviceId,
  restrictions,
}: {
  mdmDeviceId: string;
  restrictions: RestrictionsRequest;
}) {
  return withSafeAction(
    async () =>
      await apiClient<ApiResponse<SetRestrictionsResponse>>(
        `/mdm-sync/${mdmDeviceId}/restrictions`,
        {
          method: "PUT",
          body: JSON.stringify(restrictions),
        }
      ),
    "Failed to set restrictions"
  );
}

export async function blockDomainAction(
  deviceId: string,
  domains: string[]
): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/block-domain`, {
        method: "POST",
        body: JSON.stringify({ domains }),
      }),
    "Failed to block domain"
  );
}

export async function unblockDomainAction(
  deviceId: string,
  domains: string[]
): Promise<ActionResult<any>> {
  return withSafeAction(
    async () =>
      await apiClient(`/mdm-sync/${deviceId}/unblock-domain`, {
        method: "POST",
        body: JSON.stringify({ domains }),
      }),
    "Failed to unblock domain"
  );
}

export interface ReverseGeocodeInput {
  lat: number;
  lng: number;
}

export async function reverseGeocodeAction(
  locations: ReverseGeocodeInput[]
): Promise<ActionResult<string[]>> {
  return withSafeAction(async () => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

    const names = await Promise.all(
      locations.map(async ({ lat, lng }) => {
        try {
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place,locality,neighborhood,address&limit=1&access_token=${accessToken}`;
          const res = await fetch(url);
          if (!res.ok) throw new Error("Mapbox reverse geocoding failed");
          const json = await res.json();
          const feature = json.features?.[0];
          return (feature?.place_name as string) ?? `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        } catch {
          return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
      })
    );

    return names;
  }, "Failed to reverse geocode locations");
}
