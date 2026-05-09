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
export interface StaffDevice {
  id: string;
  serialNumber: string;
  imei: string;
  mdmDeviceId: string;
  mdmId: string;
  macAddress: string;
  manufacturer: string;
  assignmentStatus: string;
  mdmEnrollmentStatus: string;
  mdmComplianceStatus: string;
  lastSeenAt: string;
  lastKnownLocation: string;
  deviceStatus: string;
  flagged: boolean;
  flagReason: string;
  flaggedByUserId: string;
  flaggedAt: string;
  mdmLastSyncAt: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string;
  currentUserId: string;
  childId: string;
  model: string;
  operatingSystem: string;
  currentDepartmentId: string;
  currentLocationId: string;
  businessId: string;
  currentUser: User;
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
