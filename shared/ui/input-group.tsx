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

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error, helpText, className, id, children, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    // Determine if the input should be rendered "inline" with the label (e.g. single checkbox)
    // This applies when it's a checkbox or radio AND no options array is provided.
    const isInlineType =
      (props.type === "checkbox" || props.type === "radio") && !props.options?.length;

    if (children) {
      return (
        <div className={cn("flex flex-col gap-y-2", className)}>
          {label && (
            <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
              {label}
            </Label>
          )}
          {children}
          {error && <p className="text-destructive text-sm">{error}</p>}
          {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
        </div>
      );
    }

    if (isInlineType) {
      return (
        <div className={cn("flex flex-col gap-y-2", className)}>
          <Input
            id={inputId}
            ref={ref}
            label={label} // Pass label down to Input for horizontal rendering
            className={error ? "border-destructive focus-visible:ring-destructive" : ""}
            {...props}
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-y-2", className)}>
        {label && (
          <Label htmlFor={inputId} className={error ? "text-destructive" : ""}>
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          className={error ? "border-destructive focus-visible:ring-destructive" : ""}
          {...props}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";
