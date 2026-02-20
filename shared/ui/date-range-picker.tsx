"use client";

import * as React from "react";
import { addDays, format, subMonths, subDays } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateRangePickerProps {
  className?: string;
  date?: DateRange;
  onSelect?: (date: DateRange | undefined) => void;
}

export function DateRangePicker({ className, date, onSelect }: DateRangePickerProps) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(date);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalDate(date);
  }, [date]);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setInternalDate(selectedDate);
  };

  const handleApply = () => {
    onSelect?.(internalDate);
    setOpen(false);
  };

  const handleCancel = () => {
    setInternalDate(date);
    setOpen(false);
  };

  const presets = [
    {
      label: "Last 7 days",
      getValue: () => ({
        from: subDays(new Date(), 7),
        to: new Date(),
      }),
    },
    {
      label: "Last 14 days",
      getValue: () => ({
        from: subDays(new Date(), 14),
        to: new Date(),
      }),
    },
    {
      label: "Last 30 days",
      getValue: () => ({
        from: subDays(new Date(), 30),
        to: new Date(),
      }),
    },
    {
      label: "Last 3 months",
      getValue: () => ({
        from: subMonths(new Date(), 3),
        to: new Date(),
      }),
    },
    {
      label: "Last 12 months",
      getValue: () => ({
        from: subMonths(new Date(), 12),
        to: new Date(),
      }),
    },
  ];

  const handlePresetSelect = (preset: { getValue: () => DateRange }) => {
    setInternalDate(preset.getValue());
  };

  // Format the display text
  const displayText = React.useMemo(() => {
    if (internalDate?.from) {
      if (internalDate.to) {
        return `${format(internalDate.from, "LLL dd, y")} - ${format(
          internalDate.to,
          "LLL dd, y"
        )}`;
      }
      return format(internalDate.from, "LLL dd, y");
    }
    return "Select date range";
  }, [internalDate]);

  // Format current month for header
  const currentMonthDisplay = React.useMemo(() => {
    // A bit tricky to get the exact "February 2022" from the calendar state directly
    // without digging into DayPicker props, but we can just show the 'from' date's month or current
    if (internalDate?.from) return format(internalDate.from, "MMMM yyyy");
    return format(new Date(), "MMMM yyyy");
  }, [internalDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "bg-background/50 border-input hover:bg-accent/50 w-[260px] justify-start text-left font-normal backdrop-blur-sm",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="flex w-40 shrink-0 flex-col gap-1 border-r p-3">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  className="h-8 justify-start px-2 text-sm font-normal"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.label}
                </Button>
              ))}
              <div className="my-1 border-b" />
              <Button
                variant="ghost"
                className="h-8 justify-start px-2 text-sm font-normal"
                disabled
              >
                Select Time
              </Button>
              <Button variant="ghost" className="h-8 justify-start px-2 text-sm font-normal">
                Custom
              </Button>
            </div>

            {/* Calendar Area */}
            <div className="flex flex-col">
              <div className="text-primary-foreground/80 flex items-center justify-center py-4 text-sm font-medium">
                {/* We rely on Calendar's own header usually, but screenshot shows specific positioning. 
                             React Day Picker handles this well enough by default. */}
              </div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={internalDate?.from}
                selected={internalDate}
                onSelect={setInternalDate}
                numberOfMonths={1}
                className="p-3"
              />
              <div className="flex items-center justify-between border-t p-3">
                <Button variant="outline" className="h-8" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button className="h-8" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
