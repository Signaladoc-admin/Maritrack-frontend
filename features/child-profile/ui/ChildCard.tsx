"use client";

import { Child } from "../model/types";
import { getInitials } from "@/shared/lib/utils";
import { ChevronRight, Smartphone } from "lucide-react";

export default function ChildCard({ child }: { child: Child }) {
  const device = child?.device;
  const relation =
    child?.gender === "FEMALE" ? "Daughter" : child?.gender === "MALE" ? "Son" : "Child";

  return (
    <div className="surface group flex h-full cursor-pointer flex-col justify-between rounded-[var(--radius-lg)] p-5 transition-all hover:border-[var(--card-line-strong)]">
      <div>
        {/* Top Header: Avatar & Device Badge */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-base font-bold text-[var(--accent)]">
            {child?.imageUrl ? (
              <img src={child.imageUrl} alt={child.name} className="h-full w-full object-cover" />
            ) : (
              getInitials(child?.name)
            )}
          </div>

          <span
            className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${
              device
                ? "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--green)]"
                : "border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--text-3)]"
            }`}
          >
            {device ? "Device paired" : "No device"}
          </span>
        </div>

        {/* Child Info */}
        <div className="space-y-1">
          <h3 className="truncate text-base font-bold text-[var(--text-1)] transition-colors group-hover:text-[var(--accent)]">
            {child?.name}
          </h3>
          <p className="text-xs text-[var(--text-3)]">
            {relation}
            {child?.age ? ` · ${child.age} yrs` : ""}
          </p>
        </div>

        {/* Device Info preview */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] p-2.5 text-xs text-[var(--text-2)]">
          <Smartphone className="h-3.5 w-3.5 shrink-0 text-[var(--text-3)]" />
          <span className="truncate">
            {device
              ? [device.manufacturer, device.model].filter(Boolean).join(" ") || "Enrolled Device"
              : "No active device enrolled"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[var(--card-line)] pt-3.5">
        <span className="text-xs font-medium text-[var(--text-3)]">Manage profile</span>
        <span className="flex items-center gap-1 text-xs font-bold text-[var(--green)] transition-transform group-hover:translate-x-0.5">
          View overview <ChevronRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
