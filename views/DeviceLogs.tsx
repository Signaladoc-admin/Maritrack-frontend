"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import {
  AuditLogItem,
  DeviceAuditActionType,
  useAuditLog,
  useAuditLogs,
} from "@/entities/audit-log";
import Modal from "@/shared/ui/modal";
import Pagination from "@/shared/ui/Table/Pagination";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";

type ActionFilter = "ALL" | DeviceAuditActionType;

const ACTION_CONFIG: Record<
  string,
  {
    label: string;
    badgeLabel: string;
    tone: "tone-green" | "tone-cyan" | "tone-coral";
    badgeClass: string;
  }
> = {
  DEVICE_ENROLLED: {
    label: "Device enrolled",
    badgeLabel: "DEVICE_ENROLLED",
    tone: "tone-green",
    badgeClass:
      "border border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--green)]",
  },
  CREATE_DEVICE: {
    label: "Device created",
    badgeLabel: "CREATE_DEVICE",
    tone: "tone-cyan",
    badgeClass:
      "border border-[rgba(5,224,229,0.3)] bg-[rgba(5,224,229,0.12)] text-[var(--cyan)]",
  },
};

function getActionMeta(actionType?: string) {
  if (actionType && ACTION_CONFIG[actionType]) {
    return ACTION_CONFIG[actionType];
  }
  return {
    label: actionType ? actionType.replace(/_/g, " ") : "Device activity",
    badgeLabel: actionType || "LOG",
    tone: "tone-cyan" as const,
    badgeClass: "border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--text-2)]",
  };
}

function formatLogTime(dateStr?: string | null) {
  if (!dateStr) return "-";
  try {
    return format(new Date(dateStr), "dd MMM, h:mm a");
  } catch {
    return dateStr;
  }
}

function formatFullDateTime(dateStr?: string | null) {
  if (!dateStr) return "-";
  try {
    return format(new Date(dateStr), "dd MMM yyyy, h:mm:ss a");
  } catch {
    return dateStr;
  }
}

function getActorDisplay(log?: AuditLogItem | null): string {
  if (!log) return "Flentra System";
  const actor = log.user || log.performedBy || log.actor;
  if (actor) {
    const fullName = `${actor.firstName || ""} ${actor.lastName || ""}`.trim();
    if (fullName) return fullName;
    if (actor.email) return actor.email;
  }
  if (typeof log.performedByName === "string" && log.performedByName) return log.performedByName;
  if (typeof log.userEmail === "string" && log.userEmail) return log.userEmail;
  if (log.userId) return `User (${log.userId.slice(0, 8)}…)`;
  return "Flentra System";
}

function getDeviceDisplay(log?: AuditLogItem | null): string | null {
  if (!log) return null;
  const dev = log.device;
  if (dev) {
    const modelName =
      dev.name ||
      [dev.manufacturer, dev.model].filter(Boolean).join(" ").trim() ||
      dev.serialNumber ||
      dev.imei ||
      dev.mdmDeviceId ||
      dev.id;
    if (modelName) return modelName;
  }
  const meta =
    log.metadata && typeof log.metadata === "object"
      ? log.metadata
      : log.details && typeof log.details === "object"
        ? log.details
        : null;
  if (meta) {
    const fromMeta =
      meta.deviceName ||
      meta.model ||
      meta.deviceModel ||
      meta.serialNumber ||
      meta.imei ||
      meta.mdmDeviceId ||
      meta.deviceId;
    if (fromMeta) return String(fromMeta);
  }
  if (log.deviceId) return `Device ${log.deviceId}`;
  if (log.entityId) return `${log.entityType || "Entity"} ${log.entityId}`;
  return null;
}

function getLogTitle(log: AuditLogItem): string {
  if (log.description && typeof log.description === "string") return log.description;
  if (log.message && typeof log.message === "string") return log.message;
  if (typeof log.details === "string" && log.details) return log.details;

  const deviceLabel = getDeviceDisplay(log);
  if (log.actionType === "DEVICE_ENROLLED") {
    return deviceLabel ? `${deviceLabel} enrolled in MDM` : "New device enrolled in MDM";
  }
  if (log.actionType === "CREATE_DEVICE") {
    return deviceLabel ? `${deviceLabel} created` : "New device record created";
  }
  const meta = getActionMeta(log.actionType);
  return deviceLabel ? `${meta.label} — ${deviceLabel}` : meta.label;
}

function ActionIcon({ actionType }: { actionType?: string }) {
  if (actionType === "DEVICE_ENROLLED") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    );
  }
  if (actionType === "CREATE_DEVICE") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 7h6M12 16V10M9 13h6" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
  );
}

const KNOWN_LOG_KEYS = new Set([
  "id",
  "_id",
  "actionType",
  "action",
  "description",
  "message",
  "entityType",
  "resourceType",
  "entityId",
  "resourceId",
  "targetId",
  "deviceId",
  "userId",
  "performedById",
  "businessId",
  "ipAddress",
  "userAgent",
  "status",
  "user",
  "performedBy",
  "actor",
  "device",
  "metadata",
  "details",
  "oldValue",
  "newValue",
  "changes",
  "createdAt",
  "updatedAt",
  "deleted",
  "deletedAt",
]);

export default function DeviceLogs() {
  const [actionFilter, setActionFilter] = useQueryState("actionType", {
    defaultValue: "ALL",
  });
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const [pageParam, setPageParam] = useQueryState("page", {
    defaultValue: "1",
  });
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [selectedLogPreview, setSelectedLogPreview] = useState<AuditLogItem | null>(null);

  const [debouncedSearch] = useDebounce(searchQuery, 350);
  const currentPage = Math.max(1, parseInt(pageParam) || 1);

  const normalizedFilter: ActionFilter =
    actionFilter === "DEVICE_ENROLLED" || actionFilter === "CREATE_DEVICE"
      ? actionFilter
      : "ALL";

  const {
    data: auditLogsRes,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAuditLogs({
    actionType: normalizedFilter,
    page: currentPage,
    limit: 20,
    search: debouncedSearch || undefined,
  });

  const {
    data: singleLogData,
    isLoading: isLoadingSingleLog,
    isError: isSingleLogError,
    error: singleLogError,
    refetch: refetchSingleLog,
  } = useAuditLog(selectedLogId);

  const activeLog: AuditLogItem | null = singleLogData || selectedLogPreview;

  const rawLogs = auditLogsRes?.logs || [];

  const filteredLogs = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return rawLogs;
    return rawLogs.filter((log) => {
      const title = getLogTitle(log).toLowerCase();
      const actor = getActorDisplay(log).toLowerCase();
      const device = (getDeviceDisplay(log) || "").toLowerCase();
      const action = (log.actionType || "").toLowerCase();
      const id = (log.id || "").toLowerCase();
      return (
        title.includes(q) ||
        actor.includes(q) ||
        device.includes(q) ||
        action.includes(q) ||
        id.includes(q)
      );
    });
  }, [rawLogs, debouncedSearch]);

  const counts = auditLogsRes?.counts ?? {
    all: auditLogsRes?.total ?? rawLogs.length,
    DEVICE_ENROLLED: rawLogs.filter((l) => l.actionType === "DEVICE_ENROLLED").length,
    CREATE_DEVICE: rawLogs.filter((l) => l.actionType === "CREATE_DEVICE").length,
  };

  const totalPages = auditLogsRes?.totalPages || 1;

  const handleFilterChange = (nextFilter: ActionFilter) => {
    setActionFilter(nextFilter);
    setPageParam("1");
  };

  const handleSelectLog = (log: AuditLogItem) => {
    setSelectedLogPreview(log);
    setSelectedLogId(log.id);
  };

  const handleCloseModal = () => {
    setSelectedLogId(null);
    setSelectedLogPreview(null);
  };

  const additionalPayload = useMemo(() => {
    if (!activeLog) return null;
    const base: Record<string, any> = {};
    if (activeLog.metadata && typeof activeLog.metadata === "object") {
      Object.assign(base, activeLog.metadata);
    }
    if (activeLog.details && typeof activeLog.details === "object") {
      Object.assign(base, activeLog.details);
    }
    if (activeLog.changes && typeof activeLog.changes === "object") {
      base.changes = activeLog.changes;
    }
    if (activeLog.newValue && typeof activeLog.newValue === "object") {
      base.newValue = activeLog.newValue;
    }
    if (activeLog.oldValue && typeof activeLog.oldValue === "object") {
      base.oldValue = activeLog.oldValue;
    }
    Object.entries(activeLog).forEach(([key, val]) => {
      if (!KNOWN_LOG_KEYS.has(key) && val !== undefined && val !== null && val !== "") {
        base[key] = val;
      }
    });
    return Object.keys(base).length > 0 ? base : null;
  }, [activeLog]);

  return (
    <section className="page active" id="page-logs">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <div className="flex items-center gap-3">
              <h1>Device logs</h1>
              {!isLoading && (
                <span className="rounded-full bg-[var(--accent-tint)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent)]">
                  {counts.all} total
                </span>
              )}
            </div>
            <p>Audit trail of device creation and enrollment across your fleet.</p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="icon-btn-square cursor-pointer"
            aria-label="Refresh logs"
            title="Refresh logs"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(isFetching && "animate-spin")}
            >
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="dd-layout" style={{ gridTemplateColumns: "228px 1fr" }}>
        {/* Filter chip rail */}
        <div className="dd-rail filter-rail" style={{ position: "sticky", top: "100px" }} id="logFilters">
          <button
            type="button"
            className={cn("filter-chip", normalizedFilter === "ALL" && "active")}
            onClick={() => handleFilterChange("ALL")}
          >
            <span className="fc-left">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              All activity
            </span>
            <span className="count">{counts.all}</span>
          </button>

          <button
            type="button"
            className={cn("filter-chip", normalizedFilter === "DEVICE_ENROLLED" && "active")}
            onClick={() => handleFilterChange("DEVICE_ENROLLED")}
          >
            <span className="fc-left">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Device enrolled
            </span>
            <span className="count">{counts.DEVICE_ENROLLED}</span>
          </button>

          <button
            type="button"
            className={cn("filter-chip", normalizedFilter === "CREATE_DEVICE" && "active")}
            onClick={() => handleFilterChange("CREATE_DEVICE")}
          >
            <span className="fc-left">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="6" y="3" width="12" height="18" rx="2" />
                <path d="M9 7h6M12 16V10M9 13h6" />
              </svg>
              Create device
            </span>
            <span className="count">{counts.CREATE_DEVICE}</span>
          </button>
        </div>

        {/* Main logs timeline surface */}
        <div className="surface" style={{ padding: "16px 24px" }}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--card-line)] pb-3.5">
            <div className="text-xs font-semibold tracking-wider text-[var(--text-3)] uppercase">
              {normalizedFilter === "ALL"
                ? "All Device Audit Logs (DEVICE_ENROLLED, CREATE_DEVICE)"
                : `Filtered by: ${normalizedFilter}`}
            </div>

            <div className="search-wrap toolbar-search" style={{ width: "260px" }}>
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M21 21l-4.3-4.3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search device logs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageParam("1");
                }}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3 py-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 border-b border-[var(--card-line)] py-3 last:border-b-0"
                >
                  <Skeleton className="h-[34px] w-[34px] shrink-0 rounded-[10px]" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3 rounded" />
                    <Skeleton className="h-3 w-1/3 rounded" />
                  </div>
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <p className="text-sm font-medium text-[var(--coral)]">
                {(error as any)?.message || "Failed to load device audit logs."}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="btn-primary cursor-pointer"
              >
                Retry
              </button>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
              <div className="tl-icon mb-1">
                <ActionIcon actionType={normalizedFilter === "ALL" ? undefined : normalizedFilter} />
              </div>
              <p className="text-sm font-semibold text-[var(--text-1)]">No audit logs found</p>
              <p className="max-w-sm text-xs text-[var(--text-3)]">
                {searchQuery
                  ? "No device logs matched your search query. Try clearing your filter or search term."
                  : "Device enrollment and creation events will appear here as devices are added to your fleet."}
              </p>
            </div>
          ) : (
            <>
              <div className="timeline" id="logTimeline">
                {filteredLogs.map((log) => {
                  const meta = getActionMeta(log.actionType);
                  const title = getLogTitle(log);
                  const actor = getActorDisplay(log);
                  const deviceLabel = getDeviceDisplay(log);

                  return (
                    <div
                      key={log.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectLog(log)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectLog(log);
                        }
                      }}
                      className="timeline-item group -mx-3 cursor-pointer rounded-xl px-3 transition-colors hover:bg-[var(--card-hover)]"
                    >
                      <div className={cn("tl-icon", meta.tone)}>
                        <ActionIcon actionType={log.actionType} />
                      </div>

                      <div className="tl-body">
                        <div className="tl-title flex flex-wrap items-center gap-2">
                          <span>{title}</span>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold tracking-wide",
                              meta.badgeClass
                            )}
                          >
                            {meta.badgeLabel}
                          </span>
                        </div>
                        <div className="tl-meta">
                          {[meta.label, deviceLabel, actor].filter(Boolean).join(" · ")}
                        </div>
                      </div>

                      <div className="tl-time flex items-center gap-2">
                        <span>{formatLogTime(log.createdAt)}</span>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-70"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-4 border-t border-[var(--card-line)] pt-2">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(nextPage) => setPageParam(String(nextPage))}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Single Audit Log Detail Modal (/api/v1/audit-logs/{id}) */}
      <Modal
        isOpen={Boolean(selectedLogId)}
        onClose={handleCloseModal}
        title="Audit Log Details"
        subtitle={selectedLogId ? `Log ID: ${selectedLogId}` : undefined}
        className="sm:max-w-xl"
      >
        <div className="mt-2 space-y-4">
          {isLoadingSingleLog && !singleLogData && (
            <div className="space-y-2 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
          )}

          {isSingleLogError && !singleLogData && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--coral-border)] bg-[var(--coral-tint)] p-3 text-xs text-[var(--coral)]">
              <span>
                {(singleLogError as any)?.message ||
                  "Could not fetch additional details for this audit log."}
              </span>
              <button
                type="button"
                onClick={() => refetchSingleLog()}
                className="shrink-0 font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {activeLog && (
            <>
              <div className="flex items-start gap-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4">
                <div className={cn("tl-icon", getActionMeta(activeLog.actionType).tone)}>
                  <ActionIcon actionType={activeLog.actionType} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[var(--text-1)]">
                      {getLogTitle(activeLog)}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold",
                        getActionMeta(activeLog.actionType).badgeClass
                      )}
                    >
                      {getActionMeta(activeLog.actionType).badgeLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--text-3)]">
                    {formatFullDateTime(activeLog.createdAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                  <div className="text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                    Action Type
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[var(--text-1)]">
                    {activeLog.actionType || "-"}
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                  <div className="text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                    Performed By
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[var(--text-1)]">
                    {getActorDisplay(activeLog)}
                  </div>
                  {(activeLog.user?.email || activeLog.performedBy?.email) && (
                    <div className="mt-0.5 truncate text-[11px] text-[var(--text-3)]">
                      {activeLog.user?.email || activeLog.performedBy?.email}
                    </div>
                  )}
                </div>

                {(getDeviceDisplay(activeLog) || activeLog.deviceId || activeLog.entityId) && (
                  <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                    <div className="text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                      Target / Device
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--text-1)]">
                      {getDeviceDisplay(activeLog) || activeLog.deviceId || activeLog.entityId}
                    </div>
                    {(activeLog.entityType || activeLog.resourceType) && (
                      <div className="mt-0.5 text-[11px] text-[var(--text-3)]">
                        Type: {activeLog.entityType || activeLog.resourceType}
                      </div>
                    )}
                  </div>
                )}

                {(activeLog.ipAddress || activeLog.status) && (
                  <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                    <div className="text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                      {activeLog.ipAddress ? "IP Address" : "Status"}
                    </div>
                    <div className="mt-1 text-xs font-semibold text-[var(--text-1)]">
                      {activeLog.ipAddress || activeLog.status}
                    </div>
                    {activeLog.ipAddress && activeLog.status && (
                      <div className="mt-0.5 text-[11px] text-[var(--text-3)]">
                        Status: {activeLog.status}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {activeLog.userAgent && (
                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                  <div className="text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                    User Agent
                  </div>
                  <div className="mt-1 break-all text-xs text-[var(--text-2)]">
                    {activeLog.userAgent}
                  </div>
                </div>
              )}

              {additionalPayload && (
                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5">
                  <div className="mb-2 text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
                    Metadata & Details
                  </div>
                  <pre className="max-h-60 overflow-auto rounded-lg bg-black/20 p-3 text-xs leading-relaxed text-[var(--text-2)]">
                    {JSON.stringify(additionalPayload, null, 2)}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>
    </section>
  );
}
