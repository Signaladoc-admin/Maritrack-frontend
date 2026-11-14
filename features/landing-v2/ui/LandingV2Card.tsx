import type { ReactNode } from "react";
import Link from "next/link";
import type { NavIconName } from "@/features/landing-v2/data";
import LandingV2Badge, {
  type BadgeSize,
  type BadgeTone,
} from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";
import { CheckIcon, NavItemIcon } from "@/features/landing-v2/ui/LandingV2Icons";

export type CardSurface = "surface" | "navy" | "green-tint" | "cyan-tint";
export type CardPadding = "sm" | "24" | "md" | "lg" | "xl";
export type CardRadius = "md" | "lg";

export interface LandingV2CardProps {
  as?: "div" | "li" | "article";
  href?: string;
  surface?: CardSurface;
  padding?: CardPadding;
  radius?: CardRadius;
  gap?: "xs" | "sm" | "2.5" | "md" | "lg";
  badge?: {
    label: string;
    tone?: BadgeTone;
    size?: BadgeSize;
    bordered?: boolean;
    weight?: "bold" | "extrabold";
  };
  icon?: {
    name: NavIconName;
    tone?: "cyan" | "green";
    bordered?: boolean;
  };
  customIcon?: ReactNode;
  title?: string;
  titleAs?: "h2" | "h3" | "span";
  titleClassName?: string;
  description?: ReactNode;
  descriptionClassName?: string;
  checklist?: {
    items: string[];
    tone?: "cyan" | "green";
  };
  linkLabel?: string;
  cta?: {
    label: string;
    href: string;
    variant: "primary" | "secondary";
  };
  children?: ReactNode;
  className?: string;
}

const surfaceClasses: Record<CardSurface, string> = {
  surface: "bg-surface border border-line",
  navy: "bg-navy border border-line",
  "green-tint": "bg-green-tint border border-green-border",
  "cyan-tint": "bg-cyan-tint border border-cyan-border",
};

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-5",
  "24": "p-6",
  md: "p-[26px]",
  lg: "p-8",
  xl: "p-9",
};

const radiusClasses: Record<CardRadius, string> = {
  md: "rounded-md",
  lg: "rounded-lg",
};

const gapClasses: Record<"xs" | "sm" | "2.5" | "md" | "lg", string> = {
  xs: "gap-1.5",
  sm: "gap-2",
  "2.5": "gap-2.5",
  md: "gap-3",
  lg: "gap-4",
};

export default function LandingV2Card({
  as: Component = "div",
  href,
  surface = "surface",
  padding = "md",
  radius = "lg",
  gap = "md",
  badge,
  icon,
  customIcon,
  title,
  titleAs: TitleTag = "h3",
  titleClassName = "text-[20px] font-bold text-white",
  description,
  descriptionClassName = "text-[16px] leading-[1.6] text-text-muted",
  checklist,
  linkLabel,
  cta,
  children,
  className = "",
}: LandingV2CardProps) {
  const baseClassName = `flex flex-col ${surfaceClasses[surface]} ${paddingClasses[padding]} ${radiusClasses[radius]} ${gapClasses[gap]} text-white ${
    href
      ? "no-underline transition-colors hover:border-line-strong hover:bg-surface-hover"
      : ""
  } ${className}`;

  const content = (
    <>
      {badge ? (
        <div className="self-start">
          <LandingV2Badge
            tone={badge.tone}
            size={badge.size}
            bordered={badge.bordered}
            weight={badge.weight}
          >
            {badge.label}
          </LandingV2Badge>
        </div>
      ) : null}

      {icon ? (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-icon ${
            icon.tone === "green" ? "bg-green-tint" : "bg-cyan-tint"
          } ${
            icon.bordered
              ? icon.tone === "green"
                ? "border border-green-border"
                : "border border-cyan-border"
              : ""
          }`}
        >
          <NavItemIcon icon={icon.name} tone={icon.tone ?? "cyan"} />
        </span>
      ) : null}

      {customIcon ?? null}

      {title ? (
        <TitleTag className={`m-0 ${titleClassName}`}>{title}</TitleTag>
      ) : null}

      {description ? (
        <div className={`m-0 ${descriptionClassName}`}>{description}</div>
      ) : null}

      {checklist ? (
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15.5px]">
          {checklist.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckIcon tone={checklist.tone ?? "green"} size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {children}

      {linkLabel ? (
        <span className="text-[14px] font-bold text-green-light">
          {linkLabel}
        </span>
      ) : null}

      {cta ? (
        <LandingV2Button
          href={cta.href}
          variant={cta.variant}
          size="md"
          className={
            cta.variant === "primary"
              ? "mt-1 self-start px-5 py-3"
              : "mt-1 self-start"
          }
        >
          {cta.label}
        </LandingV2Button>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClassName}>
        {content}
      </Link>
    );
  }

  return <Component className={baseClassName}>{content}</Component>;
}
