"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getAuditLogByIdAction, getAuditLogsAction } from "../api/audit-log.actions";
import type { AuditLogsQueryOptions } from "./types";

export const auditLogKeys = {
  all: ["audit-logs"] as const,
  list: (options: AuditLogsQueryOptions = {}) => ["audit-logs", "list", options] as const,
  detail: (id: string) => ["audit-logs", "detail", id] as const,
};

export function useAuditLogs(
  options: AuditLogsQueryOptions = {},
  queryOptions: { enabled?: boolean } = {}
) {
  return useServerActionQuery(auditLogKeys.list(options), getAuditLogsAction, [options], {
    retry: false,
    refetchOnWindowFocus: true,
    enabled: queryOptions.enabled ?? true,
  });
}

export function useAuditLog(id: string | null | undefined) {
  return useServerActionQuery(
    auditLogKeys.detail(id || ""),
    getAuditLogByIdAction,
    [id || ""],
    {
      retry: false,
      enabled: Boolean(id),
    }
  );
}
