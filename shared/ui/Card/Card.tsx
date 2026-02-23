"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// --- 1. Main Card Wrapper ---
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Default color #F7F7F7, rounded corners, subtle border/shadow
        "rounded-[24px] border border-slate-100 bg-[#F7F7F7] text-slate-900",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// --- 2. Card Header (for Title + Action Buttons) ---
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pb-2", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

// --- 3. Card Title ---
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-[14px] leading-none font-semibold tracking-tight text-[#667085]", // Using your primary blue
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

// --- 5. Card Content (The body) ---
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-2", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
