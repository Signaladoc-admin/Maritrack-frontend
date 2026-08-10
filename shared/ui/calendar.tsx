"use client";

import * as React from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("h-4 w-4", className)} {...props} />;
          }
          if (orientation === "right") {
            return <ChevronRight className={cn("h-4 w-4", className)} {...props} />;
          }
          if (orientation === "up") {
            return <ChevronUp className={cn("h-4 w-4", className)} {...props} />;
          }
          if (orientation === "down") {
            return <ChevronDown className={cn("h-4 w-4", className)} {...props} />;
          }
          return <ChevronDown className={cn("h-4 w-4", className)} {...props} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
