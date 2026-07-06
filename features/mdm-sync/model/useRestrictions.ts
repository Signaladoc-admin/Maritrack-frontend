"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  getRestrictionsAction,
  setRestrictionsAction,
  reverseGeocodeAction,
  ReverseGeocodeInput,
} from "../api/restrictions.actions";
import { useToast } from "@/shared/ui/toast";

export const restrictionKeys = {
  all: ["restrictions"] as const,
  restrictions: (deviceId: string) => ["restrictions", deviceId] as const,
  reverseGeocode: (key: string) => ["reverse-geocode", key] as const,
};

export function useGetRestrictions(deviceId: string | undefined, options?: { enabled?: boolean }) {
  return useServerActionQuery(
    restrictionKeys.restrictions(deviceId || ""),
    getRestrictionsAction,
    [deviceId as string],
    {
      ...options,
      retry: 0,
      enabled: !!deviceId && options?.enabled !== false,
    }
  );
}

export function useSetRestrictions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useServerActionMutation(setRestrictionsAction, {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: restrictionKeys.restrictions(variables.mdmDeviceId),
      });
      toast({
        title: "Success",
        message: "Restrictions set successfully",
        type: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        message: error.message || "Failed to set restrictions",
        type: "error",
      });
    },
  });
}

export function useReverseGeocode(
  locations: ReverseGeocodeInput[],
  options?: { enabled?: boolean }
) {
  const key = locations.map((l) => `${l.lat},${l.lng}`).join("|");
  return useServerActionQuery(
    restrictionKeys.reverseGeocode(key),
    reverseGeocodeAction,
    [locations],
    {
      ...options,
      enabled: locations.length > 0 && options?.enabled !== false,
      staleTime: 1000 * 60 * 10,
    }
  );
}
