"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { Button } from "@/shared/ui/Button/button";

// --- 1. The Wrapper Card ---
interface DashboardCardProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  actionLabel = "View all",
  onActionClick,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("h-full w-full border-none bg-[#F7F7F7] shadow-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
        <CardTitle className="text-[14px] font-semibold text-[#667085]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-6 pt-0 pb-6">{children}</CardContent>
    </Card>
  );
}
