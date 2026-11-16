export type DeviceAuditActionType = "DEVICE_ENROLLED" | "CREATE_DEVICE";

export const DEVICE_AUDIT_ACTION_TYPES: DeviceAuditActionType[] = [
  "DEVICE_ENROLLED",
  "CREATE_DEVICE",
];

export interface AuditLogActor {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  role?: string | null;
  businessRole?: string | null;
}

export interface AuditLogDevice {
  id?: string;
  name?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  serialNumber?: string | null;
  imei?: string | null;
  mdmDeviceId?: string | null;
}

export interface AuditLogItem {
  id: string;
  actionType: DeviceAuditActionType | string;
  action?: string | null;
  description?: string | null;
  message?: string | null;
  entityType?: string | null;
  resourceType?: string | null;
  entityId?: string | null;
  resourceId?: string | null;
  targetId?: string | null;
  deviceId?: string | null;
  userId?: string | null;
  performedById?: string | null;
  businessId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  status?: string | null;
  user?: AuditLogActor | null;
  performedBy?: AuditLogActor | null;
  actor?: AuditLogActor | null;
  device?: AuditLogDevice | null;
  metadata?: Record<string, any> | null;
  details?: Record<string, any> | string | null;
  oldValue?: Record<string, any> | null;
  newValue?: Record<string, any> | null;
  changes?: Record<string, any> | null;
  createdAt: string;
  updatedAt?: string | null;
  [key: string]: any;
}

export interface AuditLogsQueryOptions {
  actionType?: DeviceAuditActionType | "ALL";
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedAuditLogs {
  logs: AuditLogItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  counts?: {
    all: number;
    DEVICE_ENROLLED: number;
    CREATE_DEVICE: number;
  };
}
