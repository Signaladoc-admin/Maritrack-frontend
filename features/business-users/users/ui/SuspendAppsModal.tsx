"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { useBulkActionDevices } from "@/entities/device";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useToast } from "@/shared/ui/toast";
import {
  Ban,
  CheckCircle2,
  Search,
  Loader2,
  Layers,
  ArrowLeft,
  Smartphone,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface SuspendAppsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
  actionType: "suspend" | "unsuspend";
}

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.022 3.503c-1.4362-.6544-3.0536-1.015-4.764-1.015-1.7104 0-3.3278.3606-4.764 1.015l-2.022-3.503a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396z" />
  </svg>
);

export default function SuspendAppsModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
  actionType,
}: SuspendAppsModalProps) {
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isSuspend = actionType === "suspend";
  const actionId = isSuspend ? 27 : 28;

  const firstDeviceId =
    selectedDevices[0]?.mdmDeviceId ||
    selectedDevices[0]?.device?.mdmDeviceId ||
    selectedDevices[0]?.id ||
    "";

  const { data, isPending: isFetchingApps } = useDeviceDetail(firstDeviceId, "apps", {
    enabled: !!firstDeviceId && open,
  });

  const apps = React.useMemo(() => {
    const appsMap = new Map<string, any>();
    const deviceApps = data?.data?.apps || (data as any)?.apps || [];

    if (Array.isArray(deviceApps)) {
      deviceApps.forEach((app: any) => {
        if (app && typeof app === "object") {
          if (app.systemApp === false) {
            const pkg = app.packageName;
            if (pkg && !appsMap.has(pkg)) {
              appsMap.set(pkg, app);
            }
          }
        } else if (typeof app === "string") {
          if (!appsMap.has(app)) {
            appsMap.set(app, { packageName: app, appName: app });
          }
        }
      });
    }

    return Array.from(appsMap.values()).sort((a, b) => {
      const nameA = a.appName || a.name || a.packageName || "";
      const nameB = b.appName || b.name || b.packageName || "";
      return nameA.localeCompare(nameB);
    });
  }, [data]);

  useEffect(() => {
    if (!open) {
      setIsConfirming(false);
      setSearchQuery("");
      setSelectedApps([]);
    }
  }, [open]);

  const { mutate: sendBulkAction, isPending } = useBulkActionDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: `App(s) ${isSuspend ? "suspended" : "unsuspended"} successfully`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast({
        title: "Action Failed",
        message: err?.message || `Failed to ${isSuspend ? "suspend" : "unsuspend"} apps`,
        type: "error",
      });
    },
  });

  const handleAction = () => {
    const ids = selectedDevices.map((d) => d.mdmDeviceId || d.device?.mdmDeviceId || d.id);
    const validIds = ids.filter(Boolean);

    if (validIds.length === 0) {
      toast({
        title: "Error",
        message: "No valid devices selected",
        type: "error",
      });
      return;
    }

    sendBulkAction({
      ids: validIds,
      actionId,
      messageText: selectedApps.join(", "),
    });
  };

  const filteredApps = apps.filter((app) => {
    const name = app.appName || app.name || app.packageName || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleToggleSelectAll = () => {
    const filteredPkgs = filteredApps.map((a) => a.packageName);
    const allFilteredSelected =
      filteredPkgs.length > 0 && filteredPkgs.every((pkg) => selectedApps.includes(pkg));

    if (allFilteredSelected) {
      // Unselect filtered apps
      setSelectedApps(selectedApps.filter((pkg) => !filteredPkgs.includes(pkg)));
    } else {
      // Select all filtered apps
      const newSelected = Array.from(new Set([...selectedApps, ...filteredPkgs]));
      setSelectedApps(newSelected);
    }
  };

  const allVisibleSelected =
    filteredApps.length > 0 &&
    filteredApps.every((app) => selectedApps.includes(app.packageName));

  const getAppName = (pkg: string) => {
    const found = apps.find((a) => a.packageName === pkg);
    return found?.appName || found?.name || pkg;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-6 sm:p-7 shadow-2xl sm:max-w-[490px]">
        {!isConfirming ? (
          <>
            {/* Top Icon Badge */}
            <div
              className={cn(
                "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-2xs transition-colors",
                isSuspend
                  ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
                  : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
              )}
            >
              {isSuspend ? <Ban className="h-6 w-6" /> : <Layers className="h-6 w-6" />}
            </div>

            <DialogHeader className="space-y-1 text-center sm:text-center">
              <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
                {isSuspend ? "Suspend Applications" : "Unsuspend Applications"}
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--text-2)]">
                {isSuspend
                  ? `Select applications to restrict across ${selectedDevices.length} managed device${selectedDevices.length !== 1 ? "s" : ""}.`
                  : `Select suspended applications to restore across ${selectedDevices.length} managed device${selectedDevices.length !== 1 ? "s" : ""}.`}
              </DialogDescription>
            </DialogHeader>

            {/* Search & Select-all Toolbar */}
            <div className="flex items-center gap-2.5 my-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-3)]" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2 pl-9 pr-3 text-xs text-[var(--text-1)] placeholder:text-[var(--text-3)] focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>

              {filteredApps.length > 0 && (
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="shrink-0 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] hover:bg-[var(--card-hover)] px-3 py-2 text-xs font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
                >
                  {allVisibleSelected ? "Deselect All" : "Select All"}
                </button>
              )}
            </div>

            {/* App List Container */}
            <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
              {isFetchingApps ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-[var(--accent)]" />
                  <span className="text-xs text-[var(--text-3)]">Fetching installed apps...</span>
                </div>
              ) : apps.length === 0 ? (
                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-8 text-center text-xs text-[var(--text-3)]">
                  No third-party apps found on the selected devices.
                </div>
              ) : filteredApps.length === 0 ? (
                <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-8 text-center text-xs text-[var(--text-3)]">
                  No applications match &quot;{searchQuery}&quot;.
                </div>
              ) : (
                filteredApps.map((app) => {
                  const name = app.appName || app.name || app.packageName;
                  const icon = app.icon;
                  const isChecked = selectedApps.includes(app.packageName);

                  return (
                    <label
                      key={app.packageName}
                      className={cn(
                        "flex items-center justify-between gap-3 p-2.5 rounded-xl border transition-all cursor-pointer",
                        isChecked
                          ? isSuspend
                            ? "border-[var(--coral-border)] bg-[var(--coral-soft)]/25"
                            : "border-[var(--accent-border)] bg-[var(--accent-tint)]/25"
                          : "border-[var(--card-line)] bg-[var(--card-fill)] hover:bg-[var(--card-hover)]"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-[var(--card-line-strong)] text-[var(--accent)] accent-[var(--accent)] focus:ring-0 cursor-pointer"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedApps([...selectedApps, app.packageName]);
                            } else {
                              setSelectedApps(selectedApps.filter((p) => p !== app.packageName));
                            }
                          }}
                        />

                        <div className="w-8 h-8 rounded-lg bg-[var(--card-raised)] border border-[var(--card-line)] flex items-center justify-center overflow-hidden shrink-0">
                          {icon ? (
                            <img src={icon} alt={name} className="w-full h-full object-cover" />
                          ) : (
                            <AndroidIcon className="w-4 h-4 text-[var(--accent)]" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[var(--text-1)] truncate leading-tight">
                            {name}
                          </p>
                          <p className="text-[10px] text-[var(--text-3)] truncate mt-0.5">
                            {app.packageName}
                          </p>
                        </div>
                      </div>

                      {isChecked && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-bold shrink-0",
                            isSuspend
                              ? "bg-[var(--coral-soft)] text-[var(--coral)]"
                              : "bg-[var(--accent-tint)] text-[var(--accent)]"
                          )}
                        >
                          Selected
                        </span>
                      )}
                    </label>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <DialogFooter className="mt-4 flex flex-row items-center justify-between gap-3 sm:justify-between">
              <div className="text-xs text-[var(--text-3)]">
                <span className="font-semibold text-[var(--text-1)]">{selectedApps.length}</span>{" "}
                app{selectedApps.length !== 1 ? "s" : ""} selected
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="cursor-pointer rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2 px-3.5 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirming(true)}
                  disabled={selectedApps.length === 0 || isFetchingApps}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2 px-4 text-xs font-bold transition-all shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
                    isSuspend
                      ? "bg-[var(--coral)] text-white hover:opacity-90 active:scale-[0.99]"
                      : "bg-[var(--accent)] text-[var(--primary-fg)] hover:opacity-90 active:scale-[0.99]"
                  )}
                >
                  <span>Review ({selectedApps.length})</span>
                </button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            {/* Step 2: Confirmation Review */}
            <div
              className={cn(
                "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-2xs transition-colors",
                isSuspend
                  ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
                  : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
              )}
            >
              {isSuspend ? <Ban className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
            </div>

            <DialogHeader className="space-y-1 text-center sm:text-center">
              <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
                {isSuspend ? "Confirm App Suspension" : "Confirm App Unsuspension"}
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--text-2)]">
                {isSuspend
                  ? `Are you sure you want to suspend access to these ${selectedApps.length} application(s)?`
                  : `Are you sure you want to restore access to these ${selectedApps.length} application(s)?`}
              </DialogDescription>
            </DialogHeader>

            {/* Target Fleet & Apps Preview Box */}
            <div className="my-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--text-2)] flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5 text-[var(--text-3)]" />
                  Target Fleet
                </span>
                <span className="font-bold text-[var(--text-1)]">
                  {selectedDevices.length} device{selectedDevices.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)] block mb-1.5">
                  Selected Applications ({selectedApps.length})
                </span>
                <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                  {selectedApps.map((pkg) => (
                    <span
                      key={pkg}
                      className="inline-flex items-center rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] px-2.5 py-1 text-xs font-medium text-[var(--text-1)]"
                    >
                      {getAppName(pkg)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-center">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isPending}
                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 px-4 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleAction}
                disabled={isPending}
                className={cn(
                  "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 px-5 text-xs font-bold transition-all shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
                  isSuspend
                    ? "bg-[var(--coral)] text-white hover:opacity-90 active:scale-[0.99]"
                    : "bg-[var(--accent)] text-[var(--primary-fg)] hover:opacity-90 active:scale-[0.99]"
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{isSuspend ? "Suspend Apps" : "Unsuspend Apps"}</span>
                )}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
