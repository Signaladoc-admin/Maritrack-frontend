import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm cursor-pointer font-bold transition-[color,background-color,border-color] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#00c452]",
        destructive: "bg-destructive text-white hover:bg-[#e05244]",
        outline:
          "border border-border bg-card-fill hover:bg-card-hover hover:border-card-line-strong text-foreground",
        outlinePrimary:
          "border border-primary bg-card-fill hover:bg-accent-tint text-primary hover:border-accent-border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-card-hover border border-border",
        ghost: "hover:bg-card-hover hover:text-foreground",
        link: "font-medium text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[44px] py-2.5 px-6 rounded-sm text-sm",
        sm: "h-[36px] py-2 px-4 rounded-sm text-xs",
        lg: "h-[54px] py-3 px-10 rounded-sm text-base",
        icon: "size-[34px] rounded-sm shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href = "", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (href)
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as any)}
        />
      );

    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
