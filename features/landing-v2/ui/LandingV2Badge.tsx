import type { ReactNode } from "react";

export type BadgeTone =
  | "cyan"
  | "green"
  | "green-solid"
  | "coral"
  | "neutral"
  | "muted";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

interface LandingV2BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
  bordered?: boolean;
  dotColor?: "green" | "coral" | "cyan";
  weight?: "bold" | "extrabold";
  className?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  cyan: "bg-cyan-tint text-cyan-light",
  green: "bg-green-tint text-green-light",
  "green-solid": "bg-green text-navy",
  coral: "bg-coral-tint text-coral-light",
  neutral: "bg-surface-raised text-text-nav",
  muted: "bg-surface-raised text-text-muted",
};

const borderClasses: Record<BadgeTone, string> = {
  cyan: "border border-cyan-border",
  green: "border border-green-border",
  "green-solid": "border border-green",
  coral: "border border-coral-border",
  neutral: "border border-line",
  muted: "border border-line",
};

const sizeClasses: Record<BadgeSize, string> = {
  xs: "px-2.5 py-1 text-[11.5px]",
  sm: "px-2.5 py-1 text-[12px]",
  md: "px-[11px] py-[5px] text-[12.5px]",
  lg: "px-3 py-1.5 text-[12.5px]",
};

const dotClasses: Record<"green" | "coral" | "cyan", string> = {
  green: "bg-green",
  coral: "bg-[#FF6857]",
  cyan: "bg-cyan",
};

export default function LandingV2Badge({
  children,
  tone = "cyan",
  size = "sm",
  bordered = false,
  dotColor,
  weight = "bold",
  className = "",
}: LandingV2BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-badge ${toneClasses[tone]} ${
        bordered ? borderClasses[tone] : ""
      } ${sizeClasses[size]} ${
        weight === "extrabold" ? "font-extrabold" : "font-bold"
      } ${className}`}
    >
      {dotColor ? (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${dotClasses[dotColor]}`}
        />
      ) : null}
      {children}
    </span>
  );
}
