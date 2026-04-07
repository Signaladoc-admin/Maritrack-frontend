import * as React from "react";
import { Eye, EyeOff, Mail } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  wrapperClassName?: string;
  options?: {
    label: string;
    value: string;
    description?: string;
    containerClassName?: string;
    labelClassName?: string;
  }[];
  onValueChange?: (value: string) => void;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  value?: string | number | readonly string[] | boolean | undefined;
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
          className="text-muted-foreground hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-ring flex items-center justify-center rounded border border-transparent p-1.5 transition-colors hover:border-gray-200 hover:text-gray-900 focus-visible:border-gray-200 focus-visible:text-gray-900 focus-visible:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      ) : null);

    if (type === "textarea") {
      return (
        <div className={cn("grid w-full items-center gap-1.5", wrapperClassName)}>
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <textarea className="placeholder:text-muted-foreground w-full min-w-0 flex-1 bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed"></textarea>
        </div>
      );
    }
    if (type === "select") {
      const selectValue = (props.value ?? "") as string;
      console.log(`Input [${props.name}] select value:`, selectValue);

      return (
        <div className={cn("grid w-full items-center gap-1.5", wrapperClassName)}>
          {label && <Label htmlFor={inputId}>{label}</Label>}
          <Select
            onValueChange={(val) => {
              console.log(`Input [${props.name}] changed to:`, val);
              if (props.onValueChange) {
                props.onValueChange(val);
              } else if (props.onChange) {
                // If no onValueChange, try to call onChange with a fake event or just the value
                // Many select components in this project expect the value directly or an object
                (props.onChange as any)(val);
              }
            }}
            value={selectValue}
          >
            <SelectTrigger id={inputId} className={cn(className, "text-base!")} icon={iconLeft}>
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
          onValueChange={(val) => {
            if (props.onChange) {
              props.onChange({
                target: {
                  name: props.name || inputId,
                  value: val,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }
            props.onValueChange?.(val);
          }}
          disabled={props.disabled}
          name={props.name || inputId}
        >
          {options.map((option) => {
            const optionId = `${inputId}-${option.value}`;
            return (
              <div
                key={option.value}
                className={cn("flex items-start gap-2", option.containerClassName)}
              >
                <RadioGroupItem value={option.value} id={optionId} className="mt-0.5" />
                <div className="flex flex-col">
                  <Label
                    htmlFor={optionId}
                    className={cn("leading-normal font-normal", option.labelClassName)}
                  >
                    {option.label}
                  </Label>
                  {option.description && (
                    <p className="text-muted-foreground text-xs">{option.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </RadioGroup>
      );
    }

    if (type === "checkbox") {
      return (
        <div className={cn("flex items-start gap-2", wrapperClassName)}>
          <Checkbox
            id={inputId}
            ref={ref as any}
            checked={props.checked ?? (props.value as unknown as boolean) ?? false}
            onCheckedChange={(val) => {
              props.onCheckedChange?.(val);
              if (props.onChange) {
                props.onChange({
                  target: {
                    name: props.name,
                    value: val,
                    checked: val === true,
                  },
                } as any);
              }
            }}
            disabled={props.disabled}
            className={cn("mt-1", className)}
          />
          {label && (
            <Label htmlFor={inputId} className="leading-normal font-normal">
              {label}
            </Label>
          )}
        </div>
      );
    }

<<<<<<< HEAD
    const { value: inputValue, onValueChange, onCheckedChange: _onCheckedChange, ...inputProps } = props;
=======
    const {
      value: inputValue,
      onValueChange,
      onCheckedChange: _onCheckedChange,
      ...inputProps
    } = props;
>>>>>>> dev/dev

    const handleChange = onValueChange
      ? (e: React.ChangeEvent<HTMLInputElement>) => onValueChange(e.target.value)
      : inputProps.onChange;

    return (
      <div className={cn("grid w-full items-center gap-1.5", wrapperClassName)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div
          className={cn(
            "ring-offset-background flex h-[50px] w-full items-center rounded-xl border border-[#E5E7EB] bg-[#fafafa] px-4 text-base transition-colors focus-within:ring-[1.5px] focus-within:ring-[#1b3c73] focus-within:ring-offset-0 focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        >
          {leftIcon && (
            <div className="text-muted-foreground mr-2 flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            {...inputProps}
            value={inputValue as any}
            onChange={handleChange}
            type={resolvedType}
            className={cn(
              "placeholder:text-muted-foreground w-full min-w-0 flex-1 bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed",
              (type === "time" || type === "date") &&
                "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-clear-button]:hidden [&::-webkit-inner-spin-button]:hidden"
            )}
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
