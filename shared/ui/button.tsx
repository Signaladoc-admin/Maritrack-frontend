import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl cursor-pointer font-semibold transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-[1.5px] border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        outlinePrimary:
          "border border-[1.5px] border-primary bg-background shadow-xs hover:bg-accent text-primary",
        secondary:
          "bg-secondary text-secondary-foreground text-primary shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "font-medium text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[50px] py-2.5 px-6 rounded-xl text-base",
        sm: "py-1.5 px-4 rounded-lg text-sm",
        lg: "py-3 px-10 rounded-xl text-lg",
        icon: "size-10 rounded-xl text-base shrink-0",
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
