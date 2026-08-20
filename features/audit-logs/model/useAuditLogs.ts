"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getAuditLogsAction, getAuditLogMetricsAction } from "../actions";
import type { AuditLogQuery } from "../types";

export const auditLogKeys = {
  list: (options: AuditLogQuery) => ["audit-logs", "list", options] as const,
  metrics: (options: AuditLogQuery) => ["audit-logs", "metrics", options] as const,
};

export function useAuditLogs(options: AuditLogQuery = {}) {
  return useServerActionQuery(auditLogKeys.list(options), getAuditLogsAction, [options], {
    retry: false,
    refetchOnWindowFocus: true,
  });
}

export function useAuditLogMetrics(options: AuditLogQuery = {}) {
  return useServerActionQuery(auditLogKeys.metrics(options), getAuditLogMetricsAction, [options], {
    retry: false,
    refetchOnWindowFocus: true,
  });
}
