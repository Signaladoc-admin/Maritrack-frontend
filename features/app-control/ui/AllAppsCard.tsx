"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { cn } from "@/shared/lib/utils";

import { WhatsAppIcon, NetflixIcon, YoutubeIcon, InstagramIcon, XIcon } from "./BrandIcons";

export interface AppListItem {
  id: string;
  name: string;
  totalTime: string;
  limits: number;
  icon: React.ComponentType<{ className?: string }>;
}

export const apps: AppListItem[] = [
  {
    id: "1",
    name: "WhatsApp",
    totalTime: "2h 33mins",
    limits: 1,
    icon: WhatsAppIcon,
  },
  {
    id: "2",
    name: "Netflix",
    totalTime: "2h 33mins",
    limits: 1,
    icon: NetflixIcon,
  },
  {
    id: "3",
    name: "Youtube",
    totalTime: "2h 33mins",
    limits: 1,
    icon: YoutubeIcon,
  },
  {
    id: "4",
    name: "Instagram",
    totalTime: "2h 33mins",
    limits: 1,
    icon: InstagramIcon,
  },
  {
    id: "5",
    name: "X",
    totalTime: "2h 33mins",
    limits: 1,
    icon: XIcon,
  },
];

interface AllAppsCardProps {
  onViewApp?: (appId: string) => void;
}

export function AllAppsCard({ onViewApp }: AllAppsCardProps) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#667085]">All Apps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {apps.map((app) => (
          <div key={app.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                <app.icon className="h-full w-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#212529]">{app.name}</span>
                <span className="text-xs font-medium text-[#667085]">
                  Total: {app.totalTime}, Limits: {app.limits}
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
        ))}
      </CardContent>
    </Card>
  );
}
