"use server";

import { apiClient } from "@/shared/lib/api-client";
import { withSafeAction } from "@/shared/lib/safe-action";
import type { ActionResult } from "@/shared/api/types";
import type {
  AuditLogItem,
  AuditLogsQueryOptions,
  DeviceAuditActionType,
  PaginatedAuditLogs,
} from "../model/types";

function extractLogsList(raw: any): {
  logs: AuditLogItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  const payload = raw?.data !== undefined && !Array.isArray(raw) ? raw.data : raw;

  if (Array.isArray(payload)) {
    return {
      logs: payload,
      total: payload.length,
      page: 1,
      limit: payload.length || 20,
      totalPages: 1,
    };
  }

  const list: AuditLogItem[] =
    (Array.isArray(payload?.auditLogs) && payload.auditLogs) ||
    (Array.isArray(payload?.logs) && payload.logs) ||
    (Array.isArray(payload?.items) && payload.items) ||
    (Array.isArray(payload?.results) && payload.results) ||
    (Array.isArray(payload?.data) && payload.data) ||
    [];

  const total =
    typeof payload?.total === "number"
      ? payload.total
      : typeof payload?.totalCount === "number"
        ? payload.totalCount
        : typeof payload?.count === "number"
          ? payload.count
          : typeof raw?.total === "number"
            ? raw.total
            : list.length;

  const page = Number(payload?.page ?? raw?.page ?? 1) || 1;
  const limit = Number(payload?.limit ?? raw?.limit ?? 20) || 20;
  const totalPages =
    Number(payload?.totalPages ?? raw?.totalPages) ||
    Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    logs: list,
    total,
    page,
    limit,
    totalPages,
  };
}

function normalizeAuditLogItem(item: any, fallbackActionType?: string): AuditLogItem {
  if (!item || typeof item !== "object") {
    return {
      id: String(item ?? ""),
      actionType: fallbackActionType || "UNKNOWN",
      createdAt: new Date().toISOString(),
    };
  }

  return {
    ...item,
    id: String(item.id ?? item._id ?? ""),
    actionType: item.actionType || item.action || fallbackActionType || "UNKNOWN",
    createdAt: item.createdAt || item.timestamp || item.date || new Date().toISOString(),
  };
}

async function fetchByActionType(
  actionType: DeviceAuditActionType,
  params?: { page?: number; limit?: number; search?: string }
) {
  const res = await apiClient("/audit-logs", {
    method: "GET",
    noRedirect: true,
    params: {
      actionType,
      ...(params?.page ? { page: params.page } : {}),
      ...(params?.limit ? { limit: params.limit } : {}),
      ...(params?.search ? { search: params.search } : {}),
    },
  });

  const extracted = extractLogsList(res);
  return {
    ...extracted,
    logs: extracted.logs.map((log) => normalizeAuditLogItem(log, actionType)),
  };
}

export async function getAuditLogsAction(
  options?: AuditLogsQueryOptions
): Promise<ActionResult<PaginatedAuditLogs>> {
  return withSafeAction(async () => {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 20;
    const search = options?.search?.trim() || undefined;
    const selectedAction = options?.actionType;

    if (selectedAction && selectedAction !== "ALL") {
      const [activeResult, otherResult] = await Promise.allSettled([
        fetchByActionType(selectedAction, { page, limit, search }),
        fetchByActionType(
          selectedAction === "DEVICE_ENROLLED" ? "CREATE_DEVICE" : "DEVICE_ENROLLED",
          { page: 1, limit: 1, search }
        ),
      ]);

      if (activeResult.status === "rejected") {
        throw activeResult.reason;
      }

      const activeData = activeResult.value;
      const otherTotal =
        otherResult.status === "fulfilled" ? otherResult.value.total : 0;

      const enrolledCount =
        selectedAction === "DEVICE_ENROLLED" ? activeData.total : otherTotal;
      const createCount =
        selectedAction === "CREATE_DEVICE" ? activeData.total : otherTotal;

      return {
        ...activeData,
        counts: {
          all: enrolledCount + createCount,
          DEVICE_ENROLLED: enrolledCount,
          CREATE_DEVICE: createCount,
        },
      };
    }

    // Fetch both DEVICE_ENROLLED and CREATE_DEVICE audit logs
    const [enrolledRes, createdRes] = await Promise.allSettled([
      fetchByActionType("DEVICE_ENROLLED", { page, limit, search }),
      fetchByActionType("CREATE_DEVICE", { page, limit, search }),
    ]);

    if (enrolledRes.status === "rejected" && createdRes.status === "rejected") {
      throw enrolledRes.reason;
    }

    const enrolledData =
      enrolledRes.status === "fulfilled"
        ? enrolledRes.value
        : { logs: [], total: 0, page: 1, limit, totalPages: 1 };
    const createdData =
      createdRes.status === "fulfilled"
        ? createdRes.value
        : { logs: [], total: 0, page: 1, limit, totalPages: 1 };

    const seenIds = new Set<string>();
    const combinedLogs: AuditLogItem[] = [];

    for (const log of [...enrolledData.logs, ...createdData.logs]) {
      const key = log.id || `${log.actionType}-${log.createdAt}`;
      if (!seenIds.has(key)) {
        seenIds.add(key);
        combinedLogs.push(log);
      }
    }

    combinedLogs.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const total = enrolledData.total + createdData.total;
    const totalPages = Math.max(enrolledData.totalPages, createdData.totalPages, 1);

    return {
      logs: combinedLogs,
      total,
      page,
      limit,
      totalPages,
      counts: {
        all: total,
        DEVICE_ENROLLED: enrolledData.total,
        CREATE_DEVICE: createdData.total,
      },
    };
  }, "Failed to fetch audit logs");
}

export async function getAuditLogByIdAction(
  id: string
): Promise<ActionResult<AuditLogItem>> {
  return withSafeAction(async () => {
    const res = await apiClient(`/audit-logs/${encodeURIComponent(id)}`, {
      method: "GET",
      noRedirect: true,
    });

    const payload = res?.data !== undefined ? res.data : res;
    const item = payload?.auditLog ?? payload?.log ?? payload?.data ?? payload;

    return normalizeAuditLogItem(item);
  }, "Failed to fetch audit log details");
}
