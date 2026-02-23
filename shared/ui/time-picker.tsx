"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface TimePickerProps {
  value?: string; // HH:mm format
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  id?: string;
}

export const TimePicker = React.forwardRef<HTMLButtonElement, TimePickerProps>(
  ({ value, onChange, className, placeholder = "Select time", id }, ref) => {
    const [open, setOpen] = React.useState(false);

    // Parse current value
    const [hours, minutes] = value ? value.split(":") : ["", ""];

    // Generate hours and minutes
    const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    const handleSelect = (h: string, m: string) => {
      onChange?.(`${h}:${m}`);
    };

    const handleHourSelect = (h: string) => {
      handleSelect(h, minutes || "00");
    };

    const handleMinuteSelect = (m: string) => {
      handleSelect(hours || "12", m);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            ref={ref}
            variant="outline"
            className={cn(
              "border-input ring-offset-background flex h-14 w-full items-center justify-between rounded border-[1.5px] bg-neutral-50/50 px-3 text-base transition-colors focus-within:ring-[1.5px] focus-within:ring-[#1b3c73] focus-within:ring-offset-0 focus-within:outline-none hover:bg-neutral-100/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              !value && "text-muted-foreground",
              className
            )}
          >
            <span>{value || placeholder}</span>
            <Clock className="text-primary ml-2 h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0" align="start">
          <div className="flex h-64">
            {/* Hours Column */}
            <div className="scroll-bar-hide flex-1 overflow-y-auto border-r p-2">
              <div className="text-muted-foreground mb-2 px-2 text-xs font-semibold">Hours</div>
              <div className="flex flex-col gap-1">
                {hourOptions.map((h) => (
                  <Button
                    key={h}
                    variant={hours === h ? "default" : "ghost"}
                    size="sm"
                    className="h-8 justify-center"
                    onClick={() => handleHourSelect(h)}
                  >
                    {h}
                  </Button>
                ))}
              </div>
            </div>
            {/* Minutes Column */}
            <div className="scroll-bar-hide flex-1 overflow-y-auto p-2">
              <div className="text-muted-foreground mb-2 px-2 text-xs font-semibold">Minutes</div>
              <div className="flex flex-col gap-1">
                {minuteOptions.map((m) => (
                  <Button
                    key={m}
                    variant={minutes === m ? "default" : "ghost"}
                    size="sm"
                    className="h-8 justify-center"
                    onClick={() => handleMinuteSelect(m)}
                  >
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end border-t p-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

TimePicker.displayName = "TimePicker";
