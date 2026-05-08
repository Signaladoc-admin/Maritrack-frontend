export interface Device {
  id: string;
  model: string;
  imei: string;
  serialNumber: string;
  macAddress: string;
  lastSynced: string;
  batteryLevel?: number;
  status?: "ACTIVE" | "INACTIVE";
  condition?: "DAMAGED" | "RETURNED" | "GOOD";
  possessor?: {
    name: string;
    email: string;
  };
}
