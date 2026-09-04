import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { H4, P } from "./typography";
// We will import Card components after creating them, or define them locally if simple.
// For now, I'll assume standard Card structure.

const cardWrapperVariants = cva("w-full bg-card-fill border border-card-line text-foreground transition-all shadow-none", {
  variants: {
    variant: {
      default: "bg-card-fill text-foreground border-card-line",
      primary:
        "bg-accent text-background border-accent",
      destructive: "bg-destructive text-white border-destructive",
      warning: "bg-[#f87171] text-white",
      outline: "bg-transparent border border-card-line",
      ghost: "border-none shadow-none bg-transparent",
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-3",
      default: "p-5",
      lg: "p-6",
      xl: "p-8",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-sm",
      lg: "rounded-md",
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
    <div className={cn(cardWrapperVariants({ variant, padding, radius, className }), "flex flex-col")} {...props}>
      {header && <div className="mb-4">{header}</div>}
      <div className="flex-1 min-h-0 flex flex-col">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

function CardHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3">
      <H4 variant="primary" className="mt-0!">
        {title}
      </H4>
      <P className="text-muted-foreground mt-0! text-sm">{description}</P>
    </div>
  );
}

CardWrapper.Header = CardHeader;

export { CardWrapper, cardWrapperVariants };
