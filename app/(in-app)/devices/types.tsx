export interface Device {
  id: string;
  model: string;
  possesor: {
    name: string;
    email: string;
  };
  imei: string;
  serialNumber: string;
  macAddress: string;
  lastSynced: string;
  batteryLevel?: number;
  status?: string;
}
