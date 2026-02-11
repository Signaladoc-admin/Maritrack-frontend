import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
// We will import Card components after creating them, or define them locally if simple.
// For now, I'll assume standard Card structure.

const cardWrapperVariants = cva("w-full rounded-2xl bg-card text-card-foreground transition-all", {
  variants: {
    variant: {
      default: "bg-[#f7f7f7] text-slate-950 dark:bg-slate-950 dark:text-slate-50",
      primary:
        "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 border-slate-900 dark:border-slate-50",
      destructive: "bg-red-500 text-white border-red-500",
      warning: "bg-[#f87171] text-white",
      outline: "bg-transparent border-2",
      ghost: "border-none shadow-none bg-transparent",
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-3",
      default: "p-4",
      lg: "p-5",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-2xl",
      lg: "rounded-3xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
    radius: "default",
  },
});

export interface CardWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardWrapperVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  asChild?: boolean;
}

function CardWrapper({
  className,
  variant,
  padding,
  radius,
  header,
  footer,
  children,
  ...props
}: CardWrapperProps) {
  return (
    <div className={cn(cardWrapperVariants({ variant, padding, radius, className }))} {...props}>
      {header && <div className="mb-4">{header}</div>}
      <div className="h-full w-full">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export { CardWrapper, cardWrapperVariants };
