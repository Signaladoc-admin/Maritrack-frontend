"use client";

import type { CreateDeviceAssignmentRequest, DeviceAssignment, DeviceQueryOptions } from "./types";
import { createResourceHooks, ResourceActions } from "@/shared/api/createResourceHooks";
import { useServerActionMutation } from "@/shared/api/server-action-hooks";
import {
  createDeviceAssignmentAction,
  getAllDeviceAssignmentsAction,
  getDeviceAssignmentAction,
  deleteDeviceAssignmentAction,
  unassignDeviceFromUserAction,
} from "../api/device-assignment.actions";
import { ApiResponse } from "@/shared/api/types";

export type { DeviceQueryOptions };

const deviceAssignmentActions: ResourceActions<
  DeviceAssignment,
  CreateDeviceAssignmentRequest,
  {}
> = {
  getAll: async (options?: any) => {
    try {
      const res = await getAllDeviceAssignmentsAction(options);
      if (!res.success) {
        return { success: false, error: res.error || "Failed to fetch device assignments" };
      }
      return { success: true, data: res.data.deviceAssignments };
    } catch (error: any) {
      return { success: false, error: error?.message || "Failed to fetch device assignments" };
    }
  },
  getById: async (id: string) => {
    try {
      const res = (await getDeviceAssignmentAction(id)) as
        | { success: true; data: ApiResponse<DeviceAssignment> }
        | { success: false; error: any };
      if (res.success) {
        return { success: true, data: res.data.data };
      }
      return { success: false, error: String(res.error || "Failed to fetch device assignment") };
    } catch (error: any) {
      return { success: false, error: error?.message || "Failed to fetch device assignment" };
    }
  },
  create: async (data: CreateDeviceAssignmentRequest) => {
    try {
      const res = await createDeviceAssignmentAction(data);
      if (res.success) {
        return { success: true, data: res.data as unknown as DeviceAssignment };
      }
      return { success: false, error: res.error };
    } catch (error: any) {
      return { success: false, error: error?.message || "Failed to create device assignment" };
    }
  },
  update: () => {
    throw new Error("Update not implemented");
  },
  delete: async (id: string) => {
    try {
      const res = await deleteDeviceAssignmentAction(id);
      if (res.success) {
        return { success: true, data: undefined };
      }
      return { success: false, error: res.error };
    } catch (error: any) {
      return { success: false, error: error?.message || "Failed to delete device assignment" };
    }
  },
};

// Base CRUD hooks — equivalent to a base repository
const baseHooks = createResourceHooks<DeviceAssignment, CreateDeviceAssignmentRequest, {}>(
  "device-assignments",
  deviceAssignmentActions
);

// Extended hooks — spread base + add domain-specific hooks,
// just like extending a base repository and adding new methods.
export const deviceAssignmentHooks = {
  ...baseHooks,

  useUnassignDeviceFromUser: () =>
    useServerActionMutation(({ deviceAssignmentId }: { deviceAssignmentId: string }) =>
      unassignDeviceFromUserAction(deviceAssignmentId)
    ),
};

// Named exports for convenience
export const {
  useGetAll: useGetDeviceAssignments,
  useGetById: useGetDeviceAssignment,
  useCreate: useCreateDeviceAssignment,
  useDelete: useDeleteDeviceAssignment,
  useUnassignDeviceFromUser,
} = deviceAssignmentHooks;
