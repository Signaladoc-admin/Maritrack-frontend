import { User } from "@/app/(in-app)/users/types";

export interface DeviceHardwareInfo {
  cpuSpeed: number;
  release: string;
  osVersion: string;
  screenHeight: number;
  screenWidth: number;
  totalMemory: number;
  internalStorageSize: number;
  screenSize: number;
  screenDensity: number;
  bootloader: string;
  fingerprint: string;
  radio: string;
  fpSensor: boolean;
  buildDate: number;
  bdNum: string;
  bdType: string;
  secPatchDate: string;
  abis: string[];
}

export interface Device {
  id: string;
  osType: string;
  branch: string;
  deviceInitTime: number;
  gcmId: string;
  imeiNumber: string;
  deviceId: string;
  lastReportedTime: number;
  createdTime: number;
  hardwareInfo: DeviceHardwareInfo;
  serialNumber: string;
  bluetoothMacAddr: string;
  wifiMacAddr: string;
  installType: string;
  managerInstance: string;
  version: string;
  manufacturer: string;
  model: string;
}
export type DeviceAssignmentStatus = "ASSIGNED" | "UNASSIGNED" | "RETURNED" | "REASSIGNED";
export type DeviceStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "LOCKED"
  | "DEACTIVATED"
  | "LOST"
  | "DAMAGED"
  | "OFFLINE";
export type MdmComplianceStatus = "COMPLIANT" | "NON_COMPLIANT" | null;

export interface DeviceQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  assignmentStatus?: DeviceAssignmentStatus;
  mdmEnrollmentStatus?: string;
  mdmComplianceStatus?: string;
  deviceStatus?: DeviceStatus;
  flagged?: boolean;
}

export interface StaffDevice {
  id: string;
  serialNumber: string;
  imei: string;
  mdmDeviceId: string;
  mdmId: string | null;
  macAddress: string;
  manufacturer: string;
  assignmentStatus: DeviceAssignmentStatus;
  mdmEnrollmentStatus: string;
  mdmComplianceStatus: MdmComplianceStatus;
  lastSeenAt: string | null;
  lastKnownLocation: { latitude: number; longitude: number } | null;
  deviceStatus: DeviceStatus;
  flagged: boolean;
  flagReason: string | null;
  flaggedByUserId: string | null;
  flaggedAt: string | null;
  mdmLastSyncAt: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  currentUserId: string | null;
  childId: string | null;
  model: string | null;
  operatingSystem: string | null;
  currentDepartmentId: string | null;
  currentLocationId: string | null;
  businessId: string | null;
  currentUser?: User;
}

export interface PaginatedDevices {
  devices: StaffDevice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DeviceAsset {
  id: string;
  name: string;
  assetId: string;
  possessorName: string;
  possessorEmail: string;
  type: string;
  imei: string;
  serialNumber: string;
  macAddress: string;
  lastSynced?: string;
  dateReturned?: string;
  isUnassigned?: boolean;
}
