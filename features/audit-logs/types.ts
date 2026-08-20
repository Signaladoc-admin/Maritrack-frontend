export interface AuditLogQuery {
  page?: number;
  size?: number;
  paginated?: boolean;
  search?: string;
  dateRange?: string;
  activityType?: string;
  userRole?: string;
  status?: string;
}

export interface AuditLog {
  id: string;
  activity: string;
  activityType?: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string;
  };
  role: string;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;
  ipAddress?: string;
  device?: string;
}

export interface AuditLogMetrics {
  totalLogs: number;
  activeUsers: number;
  failedActions: number;
  successRate: number;
}
