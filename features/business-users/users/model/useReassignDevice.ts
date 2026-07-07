"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createDeviceAssignmentAction,
  unassignDeviceFromUserAction,
  getDeviceAssignmentIdAction,
} from "@/entities/device/api/device-assignment.actions";
import type { CreateDeviceAssignmentRequest } from "@/entities/device/model/types";

export interface ReassignDeviceRequest extends CreateDeviceAssignmentRequest {}

/**
 * Feature-level hook that composes unassign + create into a single "reassign" mutation.
 *
 * Step 1: Find the active device assignment ID.
 * Step 2: Unassign the current user from the device.
 * Step 3: Create a new assignment for the new user.
 *
 * On failure at any step the mutation throws — callers should use try/catch
 * around `mutateAsync`. The thrown error message indicates which step failed.
 */
export function useReassignDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createData: CreateDeviceAssignmentRequest) => {
      // Step 1 — Find the active assignment ID.
      const assignmentIdRes = await getDeviceAssignmentIdAction(createData.deviceId);
      if (!assignmentIdRes.success) {
        throw new Error(assignmentIdRes.error || "Failed to find active device assignment");
      }

      const activeAssignmentId = assignmentIdRes.data;

      // Step 2 — Unassign the current user.
      if (activeAssignmentId) {
        const unassignRes = await unassignDeviceFromUserAction(activeAssignmentId);
        if (!unassignRes.success) {
          throw new Error(unassignRes.error || "Failed to unassign device");
        }
      }

      // Step 3 — create the new assignment.
      const createRes = await createDeviceAssignmentAction(createData);
      if (!createRes.success) {
        throw new Error(createRes.error || "Failed to assign device to new user");
      }

      return createRes.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["device-assignments"] });
      // The devices list/item embed the current owner, so they must refresh too —
      // otherwise views like DevicesList keep showing the previous user.
      queryClient.invalidateQueries({ queryKey: ["devices"] });
      // Device hardware/assignment details page.
      queryClient.invalidateQueries({ queryKey: ["deviceDetail"] });
      // Staff member lists/details embed device assignment info (AssociatedDevicesTable).
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      // Zone device lists used on the dashboard.
      queryClient.invalidateQueries({ queryKey: ["mdm-sync", "zoneDevices"] });
    },
  });
}
