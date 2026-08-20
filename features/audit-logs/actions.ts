"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import { type ActionResult } from "@/shared/api/types";
import type { AuditLogQuery, AuditLogMetrics, AuditLog } from "./types";

interface PaginatedAuditLogs {
  data: AuditLog[];
  totalPages: number;
  totalLogs?: number;
}

export async function getAuditLogsAction(
  options?: AuditLogQuery
): Promise<ActionResult<PaginatedAuditLogs>> {
  return withSafeAction(async () => {
    const res = await apiClient("/audit-logs", {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string | number | boolean | undefined>,
    });
    return res.data ?? res;
  }, "Failed to fetch audit logs");
}

export async function getAuditLogMetricsAction(
  options?: AuditLogQuery
): Promise<ActionResult<AuditLogMetrics>> {
  return withSafeAction(async () => {
    const res = await apiClient("/audit-logs/metrics", {
      method: "GET",
      noRedirect: true,
      params: options as Record<string, string | number | boolean | undefined>,
    });
    return res.data ?? res;
  }, "Failed to fetch audit log metrics");
}
