"use client";

import { Input, InputProps } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";
import * as React from "react";

interface InputGroupProps extends InputProps {
  label?: string;
  error?: string;
  helpText?: string;
  children?: React.ReactNode;
}

export function InputGroup({
  label,
  error,
  helpText,
  className,
  id,
  children,
  ...props
}: InputGroupProps) {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  /* Check if it's a single checkbox or radio (no options provided) */
  const isCheckboxOrRadio =
    (props.type === "checkbox" || props.type === "radio") && !props.options?.length;

  if (isCheckboxOrRadio) {
    return (
      <div className={cn("flex flex-col gap-y-2", className)}>
        <div className="flex items-center gap-2">
          {children ? (
            children
          ) : (
            <Input
              id={inputId}
              className={cn(
                "h-4 w-4 shadow-none",
                error ? "border-destructive focus-visible:ring-destructive" : ""
              )}
              {...props}
            />
          )}
          <Label
            htmlFor={inputId}
            className={cn("font-normal opacity-80", error ? "text-destructive" : "")}
          >
            {label}
          </Label>
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
        {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-3", className)}>
      <Label htmlFor={inputId} className={cn("text-neutral-700", error ? "text-destructive" : "")}>
        {label}
      </Label>
      {children ? (
        children
      ) : (
        <Input
          id={inputId}
          wrapperClassName="max-w-none"
          className={cn("w-full", error ? "border-destructive focus-visible:ring-destructive" : "")}
          {...props}
        />
      )}
      {error && <p className="text-destructive text-sm">{error}</p>}
      {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
    </div>
  );
}
