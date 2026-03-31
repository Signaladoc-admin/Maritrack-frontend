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
