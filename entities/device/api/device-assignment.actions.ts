import { ApiResponse, CreatedItemResponse, MessageResponse } from "@/shared/api/types";
import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import {
  CreateDeviceAssignmentRequest,
  DeviceAssignment,
  GetAllDeviceAssignmentsRequestQuery,
  UnassignDeviceRequest,
} from "../model/types";

export async function createDeviceAssignmentAction(data: CreateDeviceAssignmentRequest) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<CreatedItemResponse>>("/device-assignments", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data ?? res;
  }, "Failed to create device assignment");
}

export async function getAllDeviceAssignmentsAction(options?: GetAllDeviceAssignmentsRequestQuery) {
  return withSafeAction(async () => {
    const res = await apiClient<
      ApiResponse<{ deviceAssignments: DeviceAssignment[]; totalDeviceAssignments: number }>
    >("/device-assignments", {
      method: "GET",
      params: options,
    });
    return res.data ?? res;
  }, "Failed to fetch device assignments");
}

export async function unassignDeviceFromUserAction(
  assignmentId: string,
  data?: UnassignDeviceRequest
) {
  const payload = {
    unassignmentReason: data?.unassignmentReason || "N/A",
    unassignmentComment: data?.unassignmentComment || "N/A",
  };
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<DeviceAssignment>>(
      `/device-assignments/${assignmentId}/unassign`,
      {
        method: "PATCH",
        body: JSON.stringify(payload),
      }
    );
    return res;
  }, "Failed to unassign device from user");
}
export async function getDeviceAssignmentIdAction(deviceId: string, userId?: string) {
  return withSafeAction(async () => {
    const deviceAssignmentsRes = await getAllDeviceAssignmentsAction({
      deviceId,
      ...(userId ? { userId } : {}),
    });
    if (!deviceAssignmentsRes.success) {
      throw new Error("Failed to get device assignments");
    }
    const deviceAssignments = deviceAssignmentsRes?.data?.deviceAssignments || [];

    const deviceAssignment = deviceAssignments.find(
      (assignment) => assignment.deviceId === deviceId && assignment.unassignedAt === null
    );

    return deviceAssignment?.id ?? null;
  }, "Failed to get device assignment id");
}

export async function getDeviceAssignmentAction(assignmentId: string) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<DeviceAssignment>>(
      `/device-assignments/${assignmentId}`,
      {
        method: "GET",
      }
    );
    return res.data ?? res;
  }, "Failed to get device assignment");
}
export async function deleteDeviceAssignmentAction(assignmentId: string) {
  return withSafeAction(async () => {
    const res = await apiClient<ApiResponse<DeviceAssignment>>(
      `/device-assignments/${assignmentId}`,
      {
        method: "DELETE",
      }
    );
    return res.data ?? res;
  }, "Failed to delete device assignment");
}
