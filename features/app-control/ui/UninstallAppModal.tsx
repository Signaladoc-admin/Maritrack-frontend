"use client";

import React from "react";
import { Trash2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";

export interface AppToUninstall {
  id: string;
  name: string;
  packageName: string;
  iconLetter: string;
  iconBg: string;
  category?: string;
}

interface UninstallAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  app: AppToUninstall | null;
  onConfirm: () => Promise<void> | void;
  isLoading?: boolean;
}

export function UninstallAppModal({
  open,
  onOpenChange,
  app,
  onConfirm,
  isLoading = false,
}: UninstallAppModalProps) {
  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-6 text-center shadow-none sm:max-w-[420px]">
        {/* Warning Icon Badge */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]">
          <Trash2 className="h-6 w-6" />
        </div>

        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
            Uninstall Application
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-[var(--text-2)]">
            Are you sure you want to uninstall this application? An MDM command will be dispatched
            to remove it and its local data from the managed device.
          </DialogDescription>
        </DialogHeader>

        {/* Selected App Preview Card */}
        <div className="my-4 flex items-center gap-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3 text-left">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-xs"
            style={{ background: app.iconBg }}
          >
            {app.iconLetter}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-[var(--text-1)]">{app.name}</div>
            <div className="truncate text-xs text-[var(--text-3)]">{app.packageName}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <DialogFooter className="mt-5 flex flex-row gap-3 sm:justify-center">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 cursor-pointer rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 px-4 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--coral)] py-2.5 px-4 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Uninstalling...
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                Uninstall
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
