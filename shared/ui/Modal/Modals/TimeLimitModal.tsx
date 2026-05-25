"use client";

import * as React from "react";
import { ChevronRight, ChevronDown, ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";
import { cn } from "@/shared/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export interface SetTimeLimitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appName?: string;
  onSave?: (limits: Record<string, { hour: number; minutes: number }>) => Promise<void> | void;
  isLoading?: boolean;
  initialLimits?: Record<string, { hour: number; minutes: number }>;
}

const defaultLimit = { hour: 1, minutes: 0 };
const initialWeekLimits = days.reduce((acc, day) => {
  acc[day] = { ...defaultLimit };
  return acc;
}, {} as Record<string, { hour: number; minutes: number }>);

export function SetTimeLimitModal({
  open,
  onOpenChange,
  appName = "WhatsApp",
  onSave,
  isLoading = false,
  initialLimits,
}: SetTimeLimitModalProps) {
  const [view, setView] = React.useState<"general" | "custom">("general");
  const [weekLimits, setWeekLimits] = React.useState<Record<string, { hour: number; minutes: number }>>(initialWeekLimits);
  const [generalLimit, setGeneralLimit] = React.useState<{ hour: number; minutes: number }>(defaultLimit);
  const [expandedDay, setExpandedDay] = React.useState<string | null>("Monday");

  // Reset view and values when opening/closing
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => setView("general"), 300);
    } else {
      if (initialLimits && Object.keys(initialLimits).length > 0) {
        setWeekLimits(initialLimits);
        const firstDayLimit = initialLimits[days[0]];
        if (firstDayLimit) {
          const allSame = days.every(
            (d) =>
              initialLimits[d]?.hour === firstDayLimit.hour &&
              initialLimits[d]?.minutes === firstDayLimit.minutes
          );
          if (allSame) {
            setGeneralLimit({ hour: firstDayLimit.hour, minutes: firstDayLimit.minutes });
          }
        }
      } else {
        setWeekLimits(initialWeekLimits);
        setGeneralLimit(defaultLimit);
      }
    }
  }, [open, initialLimits]);

  const handleGeneralChange = (field: "hour" | "minutes", val: number) => {
    const nextGeneral = { ...generalLimit, [field]: val };
    setGeneralLimit(nextGeneral);

    const nextWeek = { ...weekLimits };
    days.forEach((day) => {
      nextWeek[day] = { ...nextGeneral };
    });
    setWeekLimits(nextWeek);
  };

  const handleDayChange = (day: string, field: "hour" | "minutes", val: number) => {
    setWeekLimits((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: val,
      },
    }));
  };

  const toggleDay = (day: string) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(weekLimits);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-lg">
        <DialogHeader className="mb-4">
          {view === "custom" && (
            <button
              onClick={() => setView("general")}
              className="mb-2 flex items-center text-sm font-medium text-[#1B3C73] hover:underline"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to general
            </button>
          )}
          <DialogTitle className="text-xl font-bold text-slate-900">
            {view === "general" ? `Set Limit for ${appName}` : `Set Limit for ${appName} (custom)`}
          </DialogTitle>
        </DialogHeader>

        {view === "general" ? (
          // === GENERAL VIEW ===
          <div className="space-y-6">
            <div className="space-y-4 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Time</span>
                <span className="font-medium text-[#1B3C73]">
                  {generalLimit.hour > 0 || generalLimit.minutes > 0
                    ? `${generalLimit.hour}hr ${generalLimit.minutes > 0 ? `${generalLimit.minutes}m` : ""}, everyday`
                    : "No limit"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hour</label>
                  <SelectBox
                    value={generalLimit.hour}
                    onChange={(val) => handleGeneralChange("hour", val)}
                    max={23}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Minutes</label>
                  <SelectBox
                    value={generalLimit.minutes}
                    onChange={(val) => handleGeneralChange("minutes", val)}
                    max={59}
                    step={5}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setView("custom")}
              className="flex w-full items-center justify-between rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
            >
              <span className="text-lg font-medium">Customize days</span>
              <ChevronRight className="h-5 w-5 text-[#1B3C73]" />
            </button>
          </div>
        ) : (
          // === CUSTOM VIEW ===
          <div className="max-h-[60vh] space-y-4 overflow-y-auto pr-2">
            {days.map((day) => {
              const isExpanded = expandedDay === day;
              const limit = weekLimits[day] || defaultLimit;
              return (
                <div key={day} className="rounded-xl bg-slate-50 p-4">
                  <button
                    type="button"
                    onClick={() => toggleDay(day)}
                    className="flex w-full items-center justify-between text-left font-medium"
                  >
                    <span>{day}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1B3C73]">
                        {limit.hour > 0 || limit.minutes > 0
                          ? `${limit.hour}h ${limit.minutes > 0 ? `${limit.minutes}m` : ""}`
                          : "No limit"}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-slate-400 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500">Hour</label>
                        <SelectBox
                          value={limit.hour}
                          onChange={(val) => handleDayChange(day, "hour", val)}
                          max={23}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500">Minutes</label>
                        <SelectBox
                          value={limit.minutes}
                          onChange={(val) => handleDayChange(day, "minutes", val)}
                          max={59}
                          step={5}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            className="h-12 w-full bg-[#1B3C73] text-base"
            onClick={handleSave}
            isLoading={isLoading}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SelectBoxProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  step?: number;
}

// Simple Helper Component for the dropdowns
function SelectBox({ value, onChange, max, step = 1 }: SelectBoxProps) {
  const options = [];
  for (let i = 0; i <= max; i += step) {
    options.push(i);
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-8 text-slate-600 focus:border-[#1B3C73] focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {max === 59 ? (opt < 10 ? `0${opt}` : opt) : opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
