"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
// Import your specific Card components here
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";

// --- Types ---
export interface InfoListItem {
  id: string;
  icon: React.ReactNode; // Can be an Image, an SVG, or Lucide Icon
  title: string;
  subtitle?: string;
  value?: string | React.ReactNode; // The text on the right (e.g., "1hr 20m")
  onClick?: () => void;
}

interface InfoListCardProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  items: InfoListItem[];
  className?: string;
}

// --- Component ---
export function InfoListCard({
  title,
  actionText = "View all",
  onActionClick,
  items,
  className,
}: InfoListCardProps) {
  return (
    <Card className={cn("h-full w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={item.onClick}
            className={cn(
              "group flex items-center justify-between rounded-xl p-3 transition-all",
              item.onClick && "cursor-pointer hover:border-[#1B3C73]/20 hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#1B3C73]">
                {item.icon}
              </div>

              {/* Text Info */}
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#212529] transition-colors group-hover:text-[#1B3C73]">
                  {item.title}
                </span>
              </div>
            </div>

            {/* Right Side Value (e.g. Time) */}
            <div className="text-[14px] font-semibold text-[#667085]">{item.value}</div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-6 text-center text-[14px] text-[#667085]">No activity found</div>
        )}
      </CardContent>
    </Card>
  );
}
