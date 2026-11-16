"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { useBulkActionDevices } from "@/entities/device";
import { useToast } from "@/shared/ui/toast";
import { Trash2, Lock, Unlock, Loader2, AlertCircle, Smartphone } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface BulkActionConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
  actionType: "wipe" | "lock" | "unlock";
}

interface ActionDetail {
  actionId: number;
  title: string;
  description: string;
  warningNote?: string;
  buttonText: string;
  successMessage: string;
  isDestructive: boolean;
  icon: React.ReactNode;
}

const ACTION_CONFIGS: Record<"wipe" | "lock" | "unlock", ActionDetail> = {
  wipe: {
    actionId: 8,
    title: "Wipe Selected Devices",
    description:
      "A remote MDM command will be dispatched to initiate a complete factory reset. All installed applications, local storage, and enrolled credentials will be permanently erased.",
    warningNote: "This action is irreversible. The selected devices must be re-enrolled manually to be managed again.",
    buttonText: "Wipe Devices",
    successMessage: "Wipe command dispatched successfully",
    isDestructive: true,
    icon: <Trash2 className="h-6 w-6" />,
  },
  lock: {
    actionId: 401,
    title: "Lock Selected Devices",
    description:
      "An MDM lock command will be dispatched immediately. Device users will be locked out and cannot access apps, system settings, or local data until unlocked.",
    buttonText: "Lock Devices",
    successMessage: "Lock command dispatched successfully",
    isDestructive: true,
    icon: <Lock className="h-6 w-6" />,
  },
  unlock: {
    actionId: 201,
    title: "Unlock Selected Devices",
    description:
      "An MDM unlock command will be dispatched to remove the lock screen restriction. Standard device access will be restored immediately.",
    buttonText: "Unlock Devices",
    successMessage: "Unlock command dispatched successfully",
    isDestructive: false,
    icon: <Unlock className="h-6 w-6" />,
  },
};

export default function BulkActionConfirmModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
  actionType,
}: BulkActionConfirmModalProps) {
  const { toast } = useToast();
  const config = ACTION_CONFIGS[actionType];

  const { mutate: sendBulkAction, isPending } = useBulkActionDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: config.successMessage,
        type: "success",
      });
      if (onSuccess) onSuccess();
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast({
        title: "Action Failed",
        message: err?.message || "Failed to execute bulk action",
        type: "error",
      });
    },
  });

  const getValidIds = () => {
    const ids = selectedDevices.map((d) => d.mdmDeviceId || d.device?.mdmDeviceId || d.id);
    return ids.filter(Boolean);
  };

  const handleAction = () => {
    const validIds = getValidIds();

    if (validIds.length === 0) {
      toast({
        title: "Validation Error",
        message: "No valid devices selected for this operation",
        type: "error",
      });
      return;
    }

    sendBulkAction({
      ids: validIds,
      actionId: config.actionId,
    });
  };

  const getDevicePreviews = () => {
    const names: string[] = [];
    selectedDevices.forEach((device) => {
      const name =
        device.possessorName ||
        (device.currentUser
          ? `${device.currentUser.firstName || ""} ${device.currentUser.lastName || ""}`.trim()
          : null) ||
        device.name ||
        device.model ||
        device.imei ||
        (device.id ? `ID #${String(device.id).slice(-4)}` : null);
      if (name && !names.includes(name)) {
        names.push(name);
      }
    });
    return names;
  };

  const devicePreviews = getDevicePreviews();
  const visibleDevices = devicePreviews.slice(0, 3);
  const remainingCount = devicePreviews.length - visibleDevices.length;
  const count = selectedDevices.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-6 sm:p-7 text-center shadow-2xl sm:max-w-[440px]">
        {/* Top Icon Badge */}
        <div
          className={cn(
            "mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-2xl border shadow-xs transition-colors",
            config.isDestructive
              ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
              : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
          )}
        >
          {config.icon}
        </div>

        <DialogHeader className="space-y-1.5 text-center sm:text-center">
          <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
            {config.title}
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-[var(--text-2)]">
            {config.description}
          </DialogDescription>
        </DialogHeader>

        {/* Selected Devices Preview Card */}
        <div className="my-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3.5 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[var(--text-2)] flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-[var(--text-3)]" />
              Target Fleet
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-bold",
                config.isDestructive
                  ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
                  : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
              )}
            >
              {count} device{count !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {visibleDevices.map((name, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] px-2 py-1 text-[11px] font-medium text-[var(--text-1)] truncate max-w-[180px]"
              >
                {name}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="inline-flex items-center rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] px-2 py-1 text-[11px] font-medium text-[var(--text-3)]">
                +{remainingCount} more
              </span>
            )}
            {devicePreviews.length === 0 && (
              <span className="text-[11px] text-[var(--text-3)]">
                {count} selected device{count !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Caution Callout (if destructive) */}
        {config.warningNote && (
          <div className="flex items-start gap-2.5 rounded-xl border border-[var(--coral-border)] bg-[var(--coral-soft)]/40 p-3 text-left">
            <AlertCircle className="h-4 w-4 shrink-0 text-[var(--coral)] mt-0.5" />
            <p className="text-[11px] leading-relaxed text-[var(--coral)]">
              {config.warningNote}
            </p>
          </div>
        )}

        {/* Action Footer */}
        <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-center">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
            className="flex-1 cursor-pointer rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 px-4 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAction}
            disabled={isPending}
            className={cn(
              "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 px-4 text-xs font-bold transition-all shadow-xs disabled:cursor-not-allowed disabled:opacity-50",
              config.isDestructive
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
              <>
                {config.buttonText}
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
