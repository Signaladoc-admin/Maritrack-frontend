"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
// Import your specific Card components here
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";

// --- Types ---
export interface TimelineItemData {
  id: string;
  title: string; // Main bold text (e.g., "Device Paired")
  app: string; // Secondary text (e.g., "Mide's iPhone")
  time: string; // Time on the right (e.g., "10:20 AM")
  // Variant determines color scheme. Default is primary blue.
  variant?: "default" | "success" | "danger" | "warning";
}

interface TimelineCardProps {
  title?: string;
  actionText?: string;
  onActionClick?: () => void;
  items: TimelineItemData[];
  className?: string;
}

// --- Helper: Color Styles Map ---
const variantStyles = {
  default: { bg: "bg-[#1B3C73]/10", text: "text-[#1B3C73]" }, // Primary Blue
  success: { bg: "bg-green-100", text: "text-green-600" }, // Green
  danger: { bg: "bg-[#D95D55]/10", text: "text-[#D95D55]" }, // Red
  warning: { bg: "bg-yellow-100", text: "text-yellow-600" }, // Yellow
};

// --- Helper Component: Single Timeline Row ---
function TimelineItem({ item, isLast }: { item: TimelineItemData; isLast: boolean }) {
  const { bg, text } = variantStyles[item.variant || "default"];

  return (
    // The container for a single row. 'pb-8' creates space between items.
    <div className={cn("relative flex gap-4", !isLast && "pb-8")}>
      {/* 1. The Connecting Vertical Line */}
      {/* Drawn absolutely behind the icon. Hidden for the last item. */}
      {!isLast && (
        <div className="absolute top-8 left-4 h-full w-[4px] bg-[#1B3C73]" aria-hidden="true" />
      )}

      {/* 2. The Icon Bubble */}
      <div
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          // We add a thick border matching the card background (#F7F7F7)
          // to cleanly "cut" the vertical line visually.
          "border-[8px] border-[#FF736A] bg-[#F7F7F7]",
          text
        )}
      ></div>

      {/* 3. Text Content */}
      <div className="flex flex-1 flex-col pt-1.5">
        <div className="flex items-start justify-between">
          <p className="text-sm leading-none font-bold text-[#1B3C73]">{item.title}</p>
        </div>
        <div className="mt-1.5 flex items-center gap-3">
          <p className="text-xs font-medium text-[#667085]">{item.app}</p>
          <div className="h-[8px] w-[8px] rounded-full bg-[#D0D5DD]" />
          <span className="text-xs font-medium text-[#667085] tabular-nums">{item.time}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export function TimelineCard({
  title = "Recent Activity",
  actionText = "View all",
  onActionClick,
  items,
  className,
}: TimelineCardProps) {
  return (
    <Card className={cn("h-full w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-6">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              // Pass true if it's the last item in the array
              isLast={index === items.length - 1}
            />
          ))}
          {items.length === 0 && (
            <div className="py-6 text-center text-sm font-medium text-slate-400">
              No recent activity
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
