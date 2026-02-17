"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

type InputConstraint = "numeric" | "alpha" | "alphanumeric";

const constraintPatterns: Record<InputConstraint, RegExp> = {
  numeric: /^[0-9]$/,
  alpha: /^[a-zA-Z]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
};

const pastePatterns: Record<InputConstraint, RegExp> = {
  numeric: /[^0-9]/g,
  alpha: /[^a-zA-Z]/g,
  alphanumeric: /[^a-zA-Z0-9]/g,
};

const inputModeMap: Record<InputConstraint, React.HTMLAttributes<HTMLInputElement>["inputMode"]> = {
  numeric: "numeric",
  alpha: "text",
  alphanumeric: "text",
};

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  inputType?: InputConstraint;
  className?: string;
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  onComplete,
  inputType = "numeric",
  className,
}: OTPInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const isCharAllowed = (char: string) => constraintPatterns[inputType].test(char);

  const sanitizePaste = (text: string) => text.replace(pastePatterns[inputType], "");

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value;
    if (char.length > 1) return;

    // Reject characters that don't match the constraint
    if (char && !isCharAllowed(char)) return;

    const newValue = value.split("");
    while (newValue.length < length) newValue.push("");

    newValue[index] = char;
    const newString = newValue.join("").slice(0, length);

    onChange(newString);

    if (char && index < length - 1) {
      focusInput(index + 1);
    }

    if (newString.length === length && onComplete) {
      onComplete(newString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        focusInput(index - 1);
        const newValue = value.split("");
        newValue[index - 1] = "";
        onChange(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = sanitizePaste(e.clipboardData.getData("text")).slice(0, length);
    if (!pastedData) return;

    onChange(pastedData);
    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
    focusInput(Math.min(pastedData.length, length - 1));
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode={inputModeMap[inputType]}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "border-input bg-muted/20 aspect-square h-auto w-full rounded-md border-[1.5px] text-center text-lg font-medium transition-all outline-none focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            value[i] ? "bg-background border-primary" : "border-input border-[1.5px]"
          )}
        />
      ))}
    </div>
  );
}
