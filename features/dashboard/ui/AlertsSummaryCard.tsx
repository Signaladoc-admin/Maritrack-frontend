"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";

interface AlertsSummaryCardProps {
  className?: string;
}

export function AlertsSummaryCard({ className }: AlertsSummaryCardProps) {
  return (
    <Card className={cn("h-full w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alerts</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#22C55E]/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-[#22C55E]" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-[#1B3C73]">All children are within limits</p>
              <p className="text-sm font-medium text-slate-400">No alerts triggered today</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <button className="text-sm font-bold text-[#1B3C73] hover:underline">
            View all alerts
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
