import * as React from "react";
import { Eye, EyeOff, Mail } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  wrapperClassName?: string;
  options?: { label: string; value: string }[];
  onValueChange?: (value: string) => void;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, id, iconLeft, iconRight, wrapperClassName, options, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const isEmail = type === "email";

    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Determine icons
    const leftIcon = iconLeft || (isEmail ? <Mail className="size-4" /> : null);

    const rightIcon =
      iconRight ||
      (isPassword ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="text-muted-foreground hover:text-foreground focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      ) : null);

    if (type === "select") {
      return (
        <div className={cn("grid w-full max-w-sm items-center gap-1.5", wrapperClassName)}>
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <Select onValueChange={props.onValueChange} defaultValue={props.defaultValue as string}>
            <SelectTrigger id={inputId} className={className} icon={iconLeft}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (type === "radio" && options?.length) {
      return (
        <RadioGroup
          className={cn("flex flex-col gap-2", wrapperClassName)}
          value={props.value as string}
          defaultValue={props.defaultValue as string}
          onValueChange={props.onValueChange}
          disabled={props.disabled}
          name={props.name || inputId}
        >
          {options.map((option) => {
            const optionId = `${inputId}-${option.value}`;
            return (
              <div key={option.value} className="flex items-center gap-2">
                <RadioGroupItem value={option.value} id={optionId} />
                <Label htmlFor={optionId} className="font-normal">
                  {option.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      );
    }

    if (type === "checkbox") {
      return (
        <div className={cn("flex items-center gap-2", wrapperClassName)}>
          <Checkbox
            id={inputId}
            ref={ref as any}
            checked={props.checked as boolean | "indeterminate"}
            onCheckedChange={props.onCheckedChange}
            disabled={props.disabled}
            className={className}
          />
          {label && (
            <Label htmlFor={inputId} className="font-normal">
              {label}
            </Label>
          )}
        </div>
      );
    }

    return (
      <div className={cn("grid w-full max-w-sm items-center gap-1.5", wrapperClassName)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div
          className={cn(
            "border-input ring-offset-background flex h-10 w-full items-center rounded border-[1.5px] bg-transparent px-3 text-base transition-colors focus-within:ring-[1.5px] focus-within:ring-[#1b3c73] focus-within:ring-offset-0 focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        >
          {leftIcon && (
            <div className="text-muted-foreground mr-2 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            {...props}
            type={resolvedType}
            className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed"
            ref={ref}
            id={inputId}
          />
          {rightIcon && (
            <div className="text-muted-foreground ml-2 flex items-center justify-center leading-none">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
