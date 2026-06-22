"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createDeviceAssignmentAction,
  unassignDeviceFromUserAction,
} from "@/entities/device/api/device-assignment.actions";
import type { CreateDeviceAssignmentRequest } from "@/entities/device/model/types";

export interface ReassignDeviceRequest extends CreateDeviceAssignmentRequest {
  /** The existing assignment ID to unassign before creating the new one. */
  deviceAssignmentId: string;
}

/**
 * Feature-level hook that composes unassign + create into a single "reassign" mutation.
 *
 * Step 1: Unassigns the current user from the device.
 * Step 2: Creates a new assignment for the new user.
 *
 * On failure at either step the mutation throws — callers should use
 * try/catch around `mutateAsync`. The thrown error message indicates which step failed.
 */
export function useReassignDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ deviceAssignmentId, ...createData }: ReassignDeviceRequest) => {
      // Step 1 — unassign the current user
      const unassignRes = await unassignDeviceFromUserAction(deviceAssignmentId);
      if (!unassignRes.success) {
        throw new Error(unassignRes.error || "Failed to unassign device");
      }

      // Step 2 — create the new assignment
      const createRes = await createDeviceAssignmentAction(createData);
      if (!createRes.success) {
        throw new Error(createRes.error || "Failed to assign device to new user");
      }

      return createRes.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["device-assignments", "list"] });
    },
  });
}
