"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

interface AppUsage {
  id: string;
  name: string;
  duration: string;
  icon: string;
  iconBg: string;
}

interface AppUsageListProps {
  apps: AppUsage[];
  className?: string;
}

export function AppUsageList({ apps, className }: AppUsageListProps) {
  return (
    <div className={cn("space-y-6 rounded-[32px] bg-[#F8F9FA] p-8 shadow-sm", className)}>
      <h3 className="text-sm font-medium text-slate-400">Top 5 Apps</h3>

      <div className="space-y-6">
        {apps.map((app) => (
          <div key={app.id} className="group flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl p-2.5 shadow-sm transition-transform group-hover:scale-110",
                  app.iconBg
                )}
              >
                <img src={app.icon} alt={app.name} className="h-full w-full object-contain" />
              </div>
              <span className="text-base font-semibold text-[#1B3C73]">{app.name}</span>
            </div>
            <span className="text-sm font-medium text-slate-400">{app.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
