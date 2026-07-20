"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { cn, formatAppValue } from "@/shared/lib/utils";

import { WhatsAppIcon, NetflixIcon, YoutubeIcon, InstagramIcon, XIcon } from "./BrandIcons";

export interface AppListItem {
  id: string;
  name: string;
  totalTime: string;
  limits: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface AllAppsCardProps {
  onViewApp?: (appId: string) => void;
  apps?: any[];
  isLoading?: boolean;
}

import { Skeleton } from "@/shared/ui/skeleton";

export function AllAppsCard({ onViewApp, apps: dynamicApps, isLoading }: AllAppsCardProps) {
  const hasData = dynamicApps && dynamicApps.length > 0;

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#667085]">All Apps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : hasData ? (
          dynamicApps.map((app) => (
            <div key={app.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                  {app.icon ? <app.icon className="h-full w-full" /> : <div className="text-gray-400 text-xs text-center overflow-hidden w-full">{app.appName?.slice(0, 2)}</div>}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-[#212529]">{app.appName || app.name}</span>
                  <span className="text-xs font-medium text-[#667085]">
                    {formatAppValue(app.totalTime || `Size: ${app.installedAPKSize || app.appSize || 0}`)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onViewApp?.(app.id)}
                className="text-xs font-bold text-[#1B3C73] hover:underline"
              >
                View app
              </button>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500">No applications found on this device.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
