"use client";

import { Input, InputProps } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { cn } from "@/shared/lib/utils";
import * as React from "react";
import { CheckSquare, XSquare } from "lucide-react";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "At least 1 uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "At least 1 lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "At least 1 number", test: (v: string) => /[0-9]/.test(v) },
  { label: "At least 1 symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

interface InputGroupProps extends InputProps {
  label?: string;
  error?: string;
  helpText?: string;
  children?: React.ReactNode;
  isEnabled?: boolean;
  matchValue?: string;
}

function PasswordRule({ label, passed }: { label: string; passed: boolean }) {
  return (
    <li className={cn("flex items-center gap-2 text-sm", passed ? "text-green-600" : "text-red-500")}>
      {passed ? (
        <CheckSquare className="h-4 w-4 shrink-0" />
      ) : (
        <XSquare className="h-4 w-4 shrink-0" />
      )}
      <span>{label}</span>
    </li>
  );
}

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error, helpText, className, id, children, isEnabled, matchValue, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const [passwordValue, setPasswordValue] = React.useState(
      (props.value as string) ?? (props.defaultValue as string) ?? ""
    );
    const showStrength = isEnabled && props.type === "password";
    const isMatchMode = showStrength && matchValue !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showStrength) setPasswordValue(e.target.value);
      props.onChange?.(e);
    };

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
          onChange={showStrength ? handleChange : props.onChange}
        />
        {showStrength && passwordValue.length > 0 && (
          <ul className="mt-1 space-y-1.5">
            {isMatchMode ? (
              <PasswordRule
                label="Passwords match"
                passed={passwordValue.length > 0 && passwordValue === matchValue}
              />
            ) : (
              PASSWORD_RULES.map((rule) => (
                <PasswordRule key={rule.label} label={rule.label} passed={rule.test(passwordValue)} />
              ))
            )}
          </ul>
        )}
        {!showStrength && error && <p className="text-destructive text-sm">{error}</p>}
        {helpText && !error && <p className="text-muted-foreground text-sm">{helpText}</p>}
      </div>
    );
  }
);
InputGroup.displayName = "InputGroup";
