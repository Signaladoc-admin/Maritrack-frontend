import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  "flex items-center text-sm font-semibold rounded-full gap-1 p-1.5 pr-2.5 w-fit",
  {
    variants: {
      variant: {
        primary: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        destructive: "bg-destructive/10 text-destructive",
        outline: "bg-outline/10 text-outline",
        success: "bg-green-500/10 text-green-700",
      },
    },
  }
);

export default function Badge2({
  content,
  variant,
}: {
  content: string | React.ReactNode;
  variant?: "primary" | "secondary" | "destructive" | "outline" | "success";
}) {
  return (
    <div
      className={cn(
        badgeVariants({
          variant: variant,
        })
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-70"
      >
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
      {content}
    </div>
  );
}
