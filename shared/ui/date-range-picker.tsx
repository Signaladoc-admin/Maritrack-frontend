"use client";

import * as React from "react";
import { format, subDays, subMonths } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateRangePickerProps {
  className?: string;
  triggerClassName?: string;
  date?: DateRange;
  onSelect?: (date: DateRange | undefined) => void;
}

const PRESETS = [
  { label: "Last 7 days", getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: "Last 14 days", getValue: () => ({ from: subDays(new Date(), 14), to: new Date() }) },
  { label: "Last 30 days", getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: "Last 3 months", getValue: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  { label: "Last 12 months", getValue: () => ({ from: subMonths(new Date(), 12), to: new Date() }) },
] as const;

function isSameRange(a: DateRange | undefined, b: DateRange | undefined) {
  if (!a?.from || !b?.from) return false;
  return (
    a.from.toDateString() === b.from.toDateString() &&
    (a.to?.toDateString() ?? "") === (b.to?.toDateString() ?? "")
  );
}

export function DateRangePicker({ className, triggerClassName, date, onSelect }: DateRangePickerProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalDate(date);
  }, [date]);

  const activePreset = PRESETS.find((p) => isSameRange(internalDate, p.getValue()));

  const handleApply = () => {
    onSelect?.(internalDate);
    setOpen(false);
  };

  const handleCancel = () => {
    setInternalDate(date);
    setOpen(false);
  };

  const triggerLabel = React.useMemo(() => {
    if (!date?.from) return "Select date range";
    if (!date.to) return format(date.from, "MMM dd, yyyy");
    return `${format(date.from, "MMM dd, yyyy")} – ${format(date.to, "MMM dd, yyyy")}`;
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap text-left font-medium transition-colors",
              !date?.from && "text-muted-foreground",
              triggerClassName
            )}
          >
            <CalendarIcon className="h-4 w-4 shrink-0" />
            <span>{triggerLabel}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 shadow-xl"
          align="start"
          sideOffset={8}
        >
          <div className="flex divide-x divide-[#f0f0f0] rounded-xl overflow-hidden">
            {/* Preset sidebar */}
            <div className="flex w-44 shrink-0 flex-col gap-0.5 p-3">
              {PRESETS.map((preset) => {
                const isActive = activePreset?.label === preset.label;
                return (
                  <button
                    key={preset.label}
                    onClick={() => setInternalDate(preset.getValue())}
                    className={cn(
                      "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      isActive
                        ? "bg-primary/8 text-primary font-medium ring-1 ring-primary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}

              <div className="my-2 border-t border-[#f0f0f0]" />

              <button
                disabled
                className="rounded-lg px-3 py-2 text-left text-sm text-slate-400 cursor-not-allowed"
              >
                Select Time
              </button>
              <button
                className="rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                onClick={() => setInternalDate(undefined)}
              >
                Custom
              </button>
            </div>

            {/* Calendar + footer */}
            <div className="flex flex-col">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={internalDate?.from}
                selected={internalDate}
                onSelect={setInternalDate}
                numberOfMonths={1}
                className="p-4"
                classNames={{
                  head_cell: "text-muted-foreground w-10 font-normal text-[0.8rem] text-center",
                  cell: "h-10 w-10 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-lg [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg focus-within:relative focus-within:z-20",
                  day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-lg",
                  caption: "flex justify-center pt-1 pb-2 relative items-center",
                  caption_label: "text-sm font-semibold text-slate-900",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-lg border border-[#e5e7eb]",
                }}
              />

              <div className="flex items-center justify-between border-t border-[#f0f0f0] px-4 py-3">
                <div className="text-xs text-slate-500">
                  {internalDate?.from && internalDate?.to
                    ? `${format(internalDate.from, "MMM dd")} – ${format(internalDate.to, "MMM dd, yyyy")}`
                    : internalDate?.from
                      ? format(internalDate.from, "MMM dd, yyyy")
                      : "No range selected"}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-4 text-xs"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 px-4 text-xs"
                    onClick={handleApply}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
