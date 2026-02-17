"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/Button/button"; // Ensure this path is correct

// --- Types ---
export interface PricingFeatureItem {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: string;
  currency?: string;
  frequency?: string;
  description: string;
  features: PricingFeatureItem[];
  buttonText?: string;
  isPremium?: boolean;
  onButtonClick?: () => void;
  className?: string;
}

// --- Component ---
export function PricingCard({
  title,
  price,
  currency = "$",
  frequency = "Per month",
  description,
  features,
  buttonText = "Get Started",
  isPremium = false,
  onButtonClick,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm flex-col rounded-[32px] p-8 shadow-xl transition-all duration-300",
        isPremium
          ? "bg-[#1B3C73] text-white ring-1 ring-[#1B3C73]" // Premium Styles
          : "bg-white text-slate-900 ring-1 ring-slate-100", // Basic Styles
        className
      )}
    >
      {/* "Best Choice" Badge for Premium */}
      {isPremium && (
        <div className="absolute -top-5 -right-4 rounded-full bg-[#222222] px-4 py-2 text-xs font-bold tracking-wide text-white uppercase shadow-md">
          Best choice
        </div>
      )}

      {/* Header Section */}
      <div className="mb-6 space-y-4">
        <h3
          className={cn(
            "text-sm font-bold tracking-widest uppercase",
            isPremium ? "text-slate-200" : "text-[#1B3C73]"
          )}
        >
          {title}
        </h3>

        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-extrabold tracking-tight">
            {currency}
            {price}
          </span>
          <span
            className={cn("text-lg font-medium", isPremium ? "text-slate-300" : "text-slate-400")}
          >
            {frequency}
          </span>
        </div>

        <p
          className={cn(
            "text-base leading-relaxed opacity-90",
            isPremium ? "text-slate-300" : "text-slate-500"
          )}
        >
          {description}
        </p>
      </div>

      {/* Divider */}
      <div className={cn("mb-8 h-px w-full", isPremium ? "bg-white/20" : "bg-slate-100")} />

      {/* Features List */}
      <ul className="mb-10 flex-1 space-y-5">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            {/* Icon Circle */}
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                feature.included
                  ? isPremium
                    ? "bg-white text-[#1B3C73]" // Premium Check
                    : "bg-[#1B3C73] text-white" // Basic Check
                  : "bg-red-100 text-[#D95D55]" // Not Included (Red)
              )}
            >
              {feature.included ? (
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              ) : (
                <X className="h-3.5 w-3.5 stroke-[3]" />
              )}
            </div>

            {/* Feature Text */}
            <span
              className={cn(
                "text-sm font-medium",
                // Strikethrough logic for excluded items
                !feature.included && "text-slate-400 line-through decoration-slate-300",
                // Text color logic
                feature.included && isPremium && "text-slate-100",
                feature.included && !isPremium && "text-slate-700"
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <Button
        onClick={onButtonClick}
        className={cn(
          "h-14 w-full rounded-full text-base font-bold shadow-none transition-transform hover:scale-[1.02] active:scale-[0.98]",
          isPremium
            ? "bg-white text-[#1B3C73] hover:bg-slate-100" // Premium Button
            : "border-2 border-slate-100 bg-white text-[#1B3C73] hover:bg-slate-50" // Basic Button
        )}
      >
        {buttonText}
      </Button>
    </div>
  );
}
