"use client";

import Link from "next/link";
import { ShieldAlert, Globe, MapPin, Sliders, ChevronRight } from "lucide-react";

interface ParentQuickControlsProps {
  deviceId: string;
  childId?: string;
  className?: string;
}

export function ParentQuickControls({
  deviceId,
  childId,
  className = "",
}: ParentQuickControlsProps) {
  const query = childId ? `&childId=${childId}` : "";

  const controls = [
    {
      title: "App Control",
      desc: "Manage rules & block user apps",
      icon: ShieldAlert,
      iconColor: "text-[var(--cyan)]",
      iconBg: "bg-[rgba(5,224,229,0.12)] border-[rgba(5,224,229,0.25)]",
      href: `/devices/${deviceId}?tab=appcontrol${query}`,
    },
    {
      title: "Blocked Sites",
      desc: "Blacklist domains & web filter",
      icon: Globe,
      iconColor: "text-[var(--coral)]",
      iconBg: "bg-[rgba(255,104,87,0.12)] border-[rgba(255,104,87,0.25)]",
      href: `/devices/${deviceId}?tab=webhistory${query}`,
    },
    {
      title: "Live Location",
      desc: "GPS tracking & live coordinates",
      icon: MapPin,
      iconColor: "text-[var(--green)]",
      iconBg: "bg-[rgba(1,219,94,0.12)] border-[rgba(1,219,94,0.25)]",
      href: `/devices/${deviceId}?tab=location${query}`,
    },
    {
      title: "Configuration",
      desc: "Screen time limits & downtime",
      icon: Sliders,
      iconColor: "text-[#FFB020]",
      iconBg: "bg-[rgba(255,176,32,0.12)] border-[rgba(255,176,32,0.25)]",
      href: `/devices/${deviceId}?tab=configuration${query}`,
    },
  ];

  return (
    <div className={`surface space-y-4 rounded-[var(--radius-lg)] p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--card-line)] pb-3.5">
        <div>
          <h4 className="text-sm font-bold tracking-wide text-[var(--text-1)]">Quick Controls</h4>
          <p className="mt-0.5 text-xs text-[var(--text-3)]">
            Direct shortcuts to manage permissions, web safety, and boundaries
          </p>
        </div>
        <span className="hidden text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase sm:inline-block">
          4 Actions Available
        </span>
      </div>

      {/* Action cards with increased height and generous spacing */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {controls.map((ctrl) => {
          const Icon = ctrl.icon;
          return (
            <Link
              key={ctrl.title}
              href={ctrl.href}
              className="group relative flex min-h-[104px] cursor-pointer items-center justify-between gap-3.5 rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 transition-all hover:border-[var(--card-line-strong)] hover:bg-[var(--card-hover)]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${ctrl.iconBg}`}
                >
                  <Icon className={`h-6 w-6 ${ctrl.iconColor}`} />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="truncate text-sm font-bold text-[var(--text-1)] transition-colors group-hover:text-[var(--accent)]">
                    {ctrl.title}
                  </div>
                  <div className="line-clamp-2 text-xs leading-relaxed text-[var(--text-3)]">
                    {ctrl.desc}
                  </div>
                </div>
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--surface)] text-[var(--text-3)] transition-colors group-hover:border-[var(--card-line-strong)] group-hover:text-[var(--text-1)]">
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ParentQuickControls;
