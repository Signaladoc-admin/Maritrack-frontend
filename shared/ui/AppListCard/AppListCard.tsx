"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn, formatAppValue } from "@/shared/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { IconType } from "react-icons/lib";
import { InfoListCardProps } from "./types";

// --- Types ---

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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "group flex items-center justify-between rounded-xl p-3 transition-all",
                item.onClick && "cursor-pointer hover:border-[#1B3C73]/20 hover:shadow-md"
              )}
            >
              <div className="flex min-w-0 items-center gap-4">
                {/* Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#1B3C73]">
                  {React.isValidElement(item.icon)
                    ? item.icon
                    : item.icon &&
                      typeof item.icon === "function" &&
                      React.createElement(item.icon, { size: 50 })}
                </div>

                {/* Text Info */}
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[14px] font-bold text-[#212529] transition-colors group-hover:text-[#1B3C73]">
                    {item.name}
                  </span>
                </div>
              </div>

              {/* Right Side Value (e.g. Time) */}
              <div className="text-[14px] font-semibold text-[#667085]">
                {formatAppValue(item.totalTime)}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="py-6 text-center text-[14px] text-[#667085]">No activity found</div>
        )}
      </CardContent>
    </Card>
  );
}
