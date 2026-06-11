"use client";

import * as React from "react";
import { createContext, useContext } from "react";
import { BarChart2, Calendar, DownloadCloud } from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";

// ---------------------------------------------------------------------------
// Filter context — central date range label flows down to every card badge
// ---------------------------------------------------------------------------

const DashboardFilterContext = createContext<string>("All time");

export function DashboardFilterProvider({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <DashboardFilterContext.Provider value={label}>{children}</DashboardFilterContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Theme context — flows color from DashboardValueCard down into chart children
// ---------------------------------------------------------------------------

const ThemeContext = createContext<string>("#6366F1");

interface ThemeProviderProps {
  children: React.ReactNode;
  color: string;
}

export function ThemeProvider({ children, color }: ThemeProviderProps) {
  return <ThemeContext.Provider value={color}>{children}</ThemeContext.Provider>;
}

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export interface DashboardDonutSlice {
  name: string;
  value: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Internal constant — keeps all chart tooltips consistent
// ---------------------------------------------------------------------------

const tooltipStyle: React.CSSProperties = {
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
};

// ---------------------------------------------------------------------------
// Primitive UI atoms
// ---------------------------------------------------------------------------

/**
 * Read-only badge shown on every card. Displays the label from the nearest
 * DashboardFilterProvider — change that provider's label to update every badge
 * on the page at once.
 */
export function DashboardTimeRangeButton() {
  const label = useContext(DashboardFilterContext);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f7fe] px-4 py-2.5 text-sm font-medium text-[#a3aed0]">
      <Calendar className="h-5 w-5" />
      {label}
    </span>
  );
}

/** Ghost download button shown in the header of titled chart cards. */
export function DashboardDownloadButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto gap-1.5 px-2 py-1 text-xs font-medium text-[#667085] hover:text-slate-900"
    >
      <DownloadCloud className="h-3.5 w-3.5" />
      Download
    </Button>
  );
}

/** Small themed box with a BarChart2 icon — top-right accent on value chart cards. */
export function DashboardChartIcon() {
  const color = useContext(ThemeContext);
  return (
    <div
      className="bg-primary/5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
      style={{ color }}
    >
      <BarChart2 className="h-4 w-4" strokeWidth={4} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty / loading states
// ---------------------------------------------------------------------------

/** Centred placeholder shown when a chart or table has no data yet. */
export function DashboardEmptyState({
  message = "No data available",
  height = 200,
}: {
  message?: string;
  height?: number;
}) {
  return (
    <div
      className="flex items-center justify-center text-sm text-[#667085]"
      style={{ height: `${height}px` }}
    >
      {message}
    </div>
  );
}

/** Skeleton rows used while a table-based card is loading. */
export function DashboardTableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-full rounded-lg" />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card containers
// ---------------------------------------------------------------------------

/**
 * Outline card with a bold title on the left and the filter badge on the right.
 * Used for charts/tables that surface a title rather than a KPI value at the top
 * (Compliance, Asset Tracking, Blacklisted Websites).
 */
export function DashboardTitledCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <CardWrapper variant="outline" padding="lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        <DashboardTimeRangeButton />
      </div>
      {children}
    </CardWrapper>
  );
}

interface DashboardValueCardProps {
  /** Large KPI number displayed above the chart. */
  value: string;
  /** Label shown below the value. */
  label: string;
  trendValue?: string;
  trendDirection?: "up" | "down";
  isLoading?: boolean;
  /** Accent colour used for the chart icon and passed to child charts via ThemeContext. */
  color?: string;
  /** Optional floating pill label rendered over the chart area (e.g. "Learning Videos (20%)"). */
  chartBadge?: string;
  /** The chart itself — DashboardAreaChart or DashboardLineChart. */
  children: React.ReactNode;
}

/**
 * Outline card with a filter badge + chart icon at the top, a large KPI
 * value + label + optional trend below, then a chart slot. Used for
 * Device Utilization and Connectivity charts.
 */
export function DashboardValueCard({
  value,
  label,
  trendValue,
  trendDirection,
  isLoading = false,
  color = "#6366F1",
  chartBadge,
  children,
}: DashboardValueCardProps) {
  return (
    <ThemeProvider color={color}>
      <CardWrapper variant="outline" padding="xl">
        <div className="space-y-5">
          <div className="flex w-full items-center justify-between">
            <DashboardTimeRangeButton />
            <DashboardChartIcon />
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-3xl font-bold text-slate-900">{value}</h4>
                <p className="mt-1 text-sm font-medium text-[#667085]">{label}</p>
                {trendValue && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-medium">
                    <span
                      className={trendDirection === "up" ? "text-emerald-500" : "text-rose-500"}
                    >
                      {trendDirection === "up" ? "↑" : "↓"} {trendValue}
                    </span>
                    <span className="text-[#667085]">since last month</span>
                  </div>
                )}
              </div>
              {/* Chart area — floating badge overlaid at top-left if provided */}
              <div className="relative">
                {chartBadge && (
                  <div
                    className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {chartBadge}
                  </div>
                )}
                {children}
              </div>
            </div>
          )}
        </div>
      </CardWrapper>
    </ThemeProvider>
  );
}

// ---------------------------------------------------------------------------
// Chart primitives
// ---------------------------------------------------------------------------

interface DashboardAreaChartProps {
  data: Record<string, string | number>[];
  dataKey: string;
  xAxisKey: string;
  /** Must be unique across the page to avoid SVG gradient conflicts. */
  gradientId: string;
  height?: number;
  /** Fallback colour when used outside a ThemeProvider. */
  initialColor?: string;
}

/** Recharts area chart with consistent axis, tooltip, and gradient styling. */
export function DashboardAreaChart({
  data,
  dataKey,
  xAxisKey,
  gradientId,
  height = 200,
  initialColor = "#6366F1",
}: DashboardAreaChartProps) {
  const color = useContext(ThemeContext) || initialColor;

  return (
    <div className="min-w-0 w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            dy={10}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 6, strokeWidth: 0, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface DashboardLineChartProps {
  data: Record<string, string | number>[];
  dataKey: string;
  xAxisKey: string;
  height?: number;
}

/** Recharts line chart with consistent axis and tooltip styling. */
export function DashboardLineChart({
  data,
  dataKey,
  xAxisKey,
  height = 200,
}: DashboardLineChartProps) {
  const color = useContext(ThemeContext);

  return (
    <div className="min-w-0 w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <LineChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <XAxis
            dataKey={xAxisKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            dy={10}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Donut chart with a colour-coded legend on the left and the chart on the right. */
export function DashboardDonutChart({ data }: { data: DashboardDonutSlice[] }) {
  if (data.every((d) => d.value === 0)) {
    return <DashboardEmptyState height={220} />;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
      {/* Legend */}
      <div className="flex w-full flex-col gap-4 sm:w-2/5">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              className="h-3.5 w-3.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium text-slate-700">
              {item.name} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
      {/* Donut */}
      <div className="flex min-w-0 h-[220px] w-full justify-center sm:w-3/5">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={0}
              stroke="none"
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={`donut-cell-${i}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              itemStyle={{ color: "#111827", fontSize: "14px", fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
