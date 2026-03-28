"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/shared/ui/Card/Card";

interface AlertItem {
  id: string;
  title: string;
  subtitle: string;
}

interface AlertsSummaryCardProps {
  className?: string;
  variant?: "success" | "warning";
  title?: string;
  subtitle?: string;
  items?: AlertItem[];
  footerActionText?: string;
  onFooterAction?: () => void;
}

export function AlertsSummaryCard({
  className,
  variant = "success",
  title = "All children are within limits",
  subtitle = "No alerts triggered today",
  items = [],
  footerActionText = "View all alerts",
  onFooterAction,
}: AlertsSummaryCardProps) {
  const isWarning = variant === "warning";

  const colors = {
    icon: isWarning ? "text-[#8D302A]" : "text-[#044230]",
    iconBg: isWarning ? "bg-[#FFABA6]" : "bg-[#6EEBC5]",
    footerText: isWarning ? "text-[#8D302A]" : "text-[#1B3C73]",
  };

  const Icon = isWarning ? AlertCircle : CheckCircle2;

  return (
    <Card className={cn("h-full w-full", className)}>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>

      <CardContent className="pb-0">
        <div
          className={cn(items.length > 0 ? "flex-1 space-y-6 border-b pb-4" : "flex-1 space-y-6")}
        >
          <div className="flex items-center gap-4 border-b pb-4">
            <div className={cn("rounded-full p-3", colors.iconBg)}>
              <Icon className={cn("h-8 w-8", colors.icon)} />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-bold text-[#1B3C73]">{title}</p>
              <p className="text-base font-medium text-slate-400">{subtitle}</p>
            </div>
          </div>

          {isWarning && items.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="h-px w-full bg-slate-100" />
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-[#8D302A]" />
                    <span className="text-base text-slate-500">{item.title}</span>
                  </div>
                  <span className="text-base font-medium text-[#1B3C73]">{item.subtitle}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-8">
        <button
          onClick={onFooterAction}
          className={cn("text-base font-bold hover:underline", colors.footerText)}
        >
          {footerActionText}
        </button>
      </CardFooter>
    </Card>
  );
}
