"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import {
  MessageSquare,
  Trash2,
  Lock,
  Unlock,
  Layers,
  AlertTriangle,
  ArrowRight,
  X,
} from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  title?: string;
  buttonText?: string;
  variant?: "default" | "destructive";
  onProceed: () => void;
  onCancel: () => void;
}

export default function BulkActionBar({
  selectedCount,
  totalCount,
  title = "Send Bulk Messages",
  buttonText = "Proceed to Compose Message",
  variant = "default",
  onProceed,
  onCancel,
}: BulkActionBarProps) {
  const isDestructive = variant === "destructive";

  const getActionIcon = () => {
    const lower = title.toLowerCase();
    if (lower.includes("message")) return <MessageSquare className="h-4 w-4" />;
    if (lower.includes("wipe")) return <Trash2 className="h-4 w-4" />;
    if (lower.includes("unlock")) return <Unlock className="h-4 w-4" />;
    if (lower.includes("lock")) return <Lock className="h-4 w-4" />;
    if (lower.includes("suspend") || lower.includes("app")) return <Layers className="h-4 w-4" />;
    if (isDestructive) return <AlertTriangle className="h-4 w-4" />;
    return <Layers className="h-4 w-4" />;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 w-full px-6 py-3.5 border-b transition-colors duration-200 animate-in fade-in slide-in-from-top-1",
        isDestructive
          ? "border-[var(--coral-border)] bg-[var(--coral-soft)]/20"
          : "border-[var(--accent-border)] bg-[var(--accent-tint)]/25"
      )}
    >
      <div className="flex items-center gap-3.5 w-full sm:w-auto">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-2xs transition-colors",
            isDestructive
              ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
              : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
          )}
        >
          {getActionIcon()}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold tracking-tight text-[var(--text-1)] truncate">
              {title}
            </h2>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                isDestructive
                  ? "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
                  : "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full animate-pulse",
                  isDestructive ? "bg-[var(--coral)]" : "bg-[var(--accent)]"
                )}
              />
              {selectedCount} selected
            </span>
          </div>
          <p className="text-xs text-[var(--text-3)] truncate mt-0.5">
            {selectedCount} device{selectedCount !== 1 ? "s" : ""} of {totalCount} total in view
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] px-3.5 py-2 text-xs font-semibold text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5 text-[var(--text-3)]" />
          <span>Cancel</span>
        </button>

        <button
          type="button"
          onClick={onProceed}
          disabled={selectedCount === 0}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            isDestructive
              ? "bg-[var(--coral)] text-white hover:opacity-90 active:scale-[0.99]"
              : "bg-[var(--accent)] text-[var(--primary-fg)] hover:opacity-90 active:scale-[0.99]"
          )}
        >
          <span>{buttonText}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
