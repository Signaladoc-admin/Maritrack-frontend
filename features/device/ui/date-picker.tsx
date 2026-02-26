import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function CustomDatePicker() {
  const presets = [
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Last 3 months",
    "Last 12 months",
    "Select Time",
    "Custom",
  ];

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  // Mapping exactly to the visual mockup provided
  const days = [
    { day: "30", type: "prev" },
    { day: "31", type: "prev" },
    { day: "1", type: "current" },
    { day: "2", type: "current" },
    { day: "3", type: "current" },
    { day: "4", type: "range-start" },
    { day: "5", type: "range-end-row" },
    { day: "6", type: "range-start-row" },
    { day: "7", type: "range-mid" },
    { day: "8", type: "range-mid" },
    { day: "9", type: "range-mid" },
    { day: "10", type: "range-end" },
    { day: "11", type: "current" },
    { day: "12", type: "current" },
    { day: "13", type: "current" },
    { day: "14", type: "current" },
    { day: "15", type: "current" },
    { day: "16", type: "current" },
    { day: "17", type: "current" },
    { day: "18", type: "current" },
    { day: "19", type: "current" },
    { day: "20", type: "current" },
    { day: "21", type: "current" },
    { day: "22", type: "current" },
    { day: "23", type: "current" },
    { day: "24", type: "selected" },
    { day: "25", type: "current" },
    { day: "26", type: "current" },
    { day: "27", type: "current" },
    { day: "28", type: "current" },
    { day: "29", type: "current" },
    { day: "31", type: "current" },
    { day: "1", type: "next" },
    { day: "2", type: "next" },
    { day: "3", type: "next" },
  ];

  return (
    <div className="flex w-[580px] rounded-xl bg-white p-6 font-sans shadow-xl">
      {/* Left Sidebar Presets */}
      <div className="flex w-[160px] flex-col gap-5 pt-2">
        {presets.map((preset, index) => (
          <button
            key={index}
            className="text-left text-base font-medium text-slate-500 transition-colors hover:text-[#253961]"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 pl-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 text-slate-500">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-[1.15rem] font-bold text-[#1e325c]">February 2022</h2>
          <Button variant="outline" size="icon" className="h-9 w-9 border-slate-200 text-slate-500">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Days of Week */}
        <div className="mb-4 grid grid-cols-7 text-center">
          {weekdays.map((day, i) => (
            <div key={i} className="text-sm font-medium text-slate-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-2">
          {days.map((item, index) => {
            let cellClasses =
              "flex h-10 w-full items-center justify-center text-[15px] font-medium transition-colors ";

            // Apply specific styles based on the type of date shown in the mockup
            switch (item.type) {
              case "prev":
              case "next":
                cellClasses += "text-slate-400";
                break;
              case "current":
                cellClasses += "text-[#1e325c] hover:bg-slate-100 rounded-md cursor-pointer";
                break;
              case "range-start":
                cellClasses += "bg-[#eef3fa] text-[#1e325c] rounded-l-md cursor-pointer";
                break;
              case "range-end-row":
                cellClasses += "bg-[#eef3fa] text-[#1e325c] rounded-r-md cursor-pointer";
                break;
              case "range-start-row":
                cellClasses += "bg-[#eef3fa] text-[#1e325c] rounded-l-md cursor-pointer";
                break;
              case "range-mid":
                cellClasses += "bg-[#eef3fa] text-[#1e325c] cursor-pointer";
                break;
              case "range-end":
                cellClasses += "bg-[#eef3fa] text-[#1e325c] rounded-r-md cursor-pointer";
                break;
              case "selected":
                cellClasses += "bg-[#253961] text-white rounded-md shadow-sm cursor-pointer";
                break;
              default:
                break;
            }

            return (
              <div key={index} className="px-[1px]">
                <div className={cellClasses}>{item.day}</div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="outline"
            className="w-24 border-slate-200 text-[15px] font-medium text-slate-500"
          >
            Cancel
          </Button>
          <Button className="w-24 bg-[#253961] text-[15px] font-medium text-white hover:bg-[#1a2845]">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
