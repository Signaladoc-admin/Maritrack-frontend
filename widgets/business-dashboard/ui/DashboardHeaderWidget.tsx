"use client";

import { DownloadCloud } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { DateRangePicker } from "@/shared/ui/date-range-picker";

interface DashboardHeaderWidgetProps {
  date?: DateRange;
  onDateSelect?: (range: DateRange | undefined) => void;
}

export function DashboardHeaderWidget({ date, onDateSelect }: DashboardHeaderWidgetProps) {
  return (
    <div className="mb-8 flex items-center justify-between flex-wrap gap-y-4 gap-x-10">
      <Header
        className="mb-0!"
        variant="sm"
        title="Analytics"
      // subtitle={
      //   <div className="flex items-center gap-2 text-sm text-[#667085]">
      //     <span className="whitespace-nowrap text-base">Analytics for</span>
      //     {date && (
      //       <DateRangePicker
      //         date={date}
      //         onSelect={onDateSelect}
      //         triggerClassName="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
      //       />
      //     )}
      //   </div>
      // }
      />

      <div>
        <Button variant="outline" size="sm" className="gap-2">
          <DownloadCloud className="size-4!" />
          <span className="font-medium">Download</span>
        </Button>
      </div>
    </div>
  );
}
