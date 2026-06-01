"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface MultiTagInputProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  helpText?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function MultiTagInput({
  label,
  placeholder = "Type and press Add",
  value,
  onChange,
  error,
  helpText,
  disabled = false,
  className,
  id,
}: MultiTagInputProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const [inputValue, setInputValue] = React.useState("");

  const add = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const remove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className={cn("flex flex-col gap-y-2", className)}>
      {label && (
        <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
          {label}
        </Label>
      )}

      <div
        className={cn(
          "ring-offset-background flex h-[50px] w-full items-center rounded-xl border border-[#E5E7EB] bg-[#fafafa] px-4 text-base transition-colors focus-within:ring-[1.5px] focus-within:ring-[#1b3c73] focus-within:ring-offset-0 focus-within:outline-none md:text-sm",
          disabled && "cursor-not-allowed opacity-50",
          error && "border-destructive"
        )}
      >
        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="placeholder:text-muted-foreground w-full min-w-0 flex-1 bg-transparent focus-visible:outline-none disabled:cursor-not-allowed"
        />
        <Button
          type="button"
          size="sm"
          disabled={disabled || !inputValue.trim()}
          onClick={add}
          className="ml-2 h-8 shrink-0 px-4 text-sm"
        >
          Add
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm text-[#374151]"
            >
              {item}
              <button
                type="button"
                disabled={disabled}
                onClick={() => remove(item)}
                className="text-destructive hover:text-destructive/80 flex items-center disabled:cursor-not-allowed"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-destructive text-sm">{error}</p>}
      {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
    </div>
  );
}
