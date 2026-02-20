"use client";

import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import * as React from "react";

interface DailyScreenTimeRadioInputsProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const PREDEFINED_OPTIONS = [
  { label: "1 hour", value: "1H" },
  { label: "2 hours", value: "2H" },
  { label: "3 hours", value: "3H" },
];

export default function DailyScreenTimeRadioInputs({
  value,
  onChange,
  className,
}: DailyScreenTimeRadioInputsProps) {
  const [customHours, setCustomHours] = React.useState<string>("9");

  // Determine if current value is one of the predefined ones or "NONE"
  const isPredefined = PREDEFINED_OPTIONS.some((opt) => opt.value === value) || value === "NONE";
  const isCustom = value !== undefined && !isPredefined && value.endsWith("H");

  const currentRadioValue = isCustom ? "CUSTOM" : value;

  const handleRadioChange = (val: string) => {
    if (val === "CUSTOM") {
      onChange?.(`${customHours}H`);
    } else {
      onChange?.(val);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setCustomHours(newVal);
    if (currentRadioValue === "CUSTOM") {
      onChange?.(`${newVal}H`);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-primary text-lg font-medium">Daily screen time limit</h3>
      <RadioGroup value={currentRadioValue} onValueChange={handleRadioChange}>
        <div className="divide-y divide-neutral-100">
          {PREDEFINED_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center gap-3 py-4">
              <RadioGroupItem value={option.value} id={`st-${option.value}`} />
              <Label htmlFor={`st-${option.value}`} className="cursor-pointer font-normal">
                {option.label}
              </Label>
            </div>
          ))}

          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="CUSTOM" id="st-custom" />
              <Label htmlFor="st-custom" className="cursor-pointer font-normal">
                Custom
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={customHours}
                onChange={handleCustomInputChange}
                className="h-10 w-16 bg-neutral-50 text-center"
                min="0"
              />
              <span className="text-foreground text-sm font-medium">Hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-4">
            <RadioGroupItem value="NONE" id="st-none" />
            <Label htmlFor="st-none" className="cursor-pointer font-normal">
              No limit
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
