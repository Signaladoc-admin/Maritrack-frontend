"use client";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createDeviceAssignmentAction,
  unassignDeviceFromUserAction,
} from "@/entities/device/api/device-assignment.actions";
import { getDeviceAction } from "@/entities/device/api/device.actions";
import type { CreateDeviceAssignmentRequest, StaffDevice } from "@/entities/device/model/types";

export interface ReassignDeviceRequest extends CreateDeviceAssignmentRequest {
  /** The existing assignment ID to unassign before creating the new one. */
  deviceAssignmentId: string;
}

/**
 * The single device record (/devices/{id}) is the source of truth for assignment
 * status. A device is ASSIGNED only when deviceAssignmentId, currentUserId and
 * currentUser are all set and assignmentStatus === "ASSIGNED"; it is UNASSIGNED
 * only when all three are null and assignmentStatus === "UNASSIGNED".
 */
function isDeviceAssigned(device: StaffDevice | undefined): boolean {
  return (
    !!device?.deviceAssignmentId &&
    !!device?.currentUserId &&
    !!device?.currentUser &&
    device?.assignmentStatus === "ASSIGNED"
  );
}

function isDeviceUnassigned(device: StaffDevice | undefined): boolean {
  return (
    !device?.deviceAssignmentId &&
    !device?.currentUserId &&
    !device?.currentUser &&
    device?.assignmentStatus === "UNASSIGNED"
  );
}

/**
 * Feature-level hook that composes unassign + create into a single "reassign" mutation.
 *
 * Step 1: Re-fetch the device (/devices/{id}) and check whether it is still assigned.
 * Step 2: If still assigned, unassign the current user, then re-fetch and confirm the
 *         device is genuinely unassigned. If already unassigned, skip the unassign call.
 * Step 3: Create a new assignment for the new user.
 *
 * The unassign endpoint sometimes returns a false-positive success, so its response
 * is NOT trusted — the device record is the only source of truth. If unassignment
 * can't be confirmed, the mutation throws and the create step is never reached.
 *
 * On failure at any step the mutation throws — callers should use try/catch around
 * `mutateAsync`.
 */
export function useReassignDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ deviceAssignmentId, ...createData }: ReassignDeviceRequest) => {
      // Step 1 — read the current device state before doing anything.
      const preRes = await getDeviceAction(createData.deviceId);
      if (!preRes.success) {
        throw new Error("Could not verify the device's assignment status. Please retry again.");
      }
      const preDevice = preRes.data as StaffDevice | undefined;

      // Step 2 — only unassign if the device is actually still assigned. If it's
      // already unassigned, skip the unassign call and go straight to creating.
      if (isDeviceAssigned(preDevice)) {
        const unassignRes = await unassignDeviceFromUserAction(deviceAssignmentId);
        if (!unassignRes.success) {
          throw new Error(unassignRes.error || "Failed to unassign device");
        }

        // Confirm against the refetched device record, not the unassign response
        // (which can report success even when nothing changed).
        const postRes = await getDeviceAction(createData.deviceId);
        if (!postRes.success || !isDeviceUnassigned(postRes.data as StaffDevice | undefined)) {
          throw new Error("Device could not be unassigned. Please retry again.");
        }
      }

      // Step 3 — create the new assignment (device is confirmed unassigned).
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
