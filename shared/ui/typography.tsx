import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

/* ─── variant helpers ─── */
const headingVariants = cva("", {
  variants: {
    variant: {
      default: "text-slate-900 dark:text-slate-50",
      primary: "text-[#003366]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>;

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof headingVariants>;

type BlockquoteProps = React.HTMLAttributes<HTMLQuoteElement> &
  VariantProps<typeof headingVariants>;

/* ─── components ─── */
export function H1({ className, variant, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-medium tracking-tight",
        headingVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export function H2({ className, variant, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-medium tracking-tight first:mt-0",
        headingVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export function H3({ className, variant, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-medium tracking-tight",
        headingVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export function H4({ className, variant, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-medium tracking-tight",
        headingVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}
export function H5({ className, variant, ...props }: HeadingProps) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-medium tracking-tight",
        headingVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export function P({ className, variant, ...props }: ParagraphProps) {
  return (
    <p
      className={cn("leading-7 not-first:mt-4", headingVariants({ variant }), className)}
      {...props}
    />
  );
}

export function Blockquote({ className, variant, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", headingVariants({ variant }), className)}
      {...props}
    />
  );
}
