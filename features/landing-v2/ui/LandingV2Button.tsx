import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "block";
export type ButtonRadius = "sm" | "md" | "lg" | "xl" | "full";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
}

type LinkButtonProps = BaseButtonProps & {
  href: string;
  onClick?: () => void;
  type?: never;
};

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type LandingV2ButtonProps = LinkButtonProps | NativeButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-navy font-semibold border-none transition-opacity hover:text-navy hover:opacity-90",
  secondary:
    "bg-surface border border-line-strong text-white font-semibold transition-colors hover:bg-surface-hover hover:text-white",
  ghost:
    "bg-surface border border-line text-white font-semibold transition-colors hover:bg-surface-hover hover:text-white",
};

function getSizeClasses(variant: ButtonVariant, size: ButtonSize): string {
  switch (size) {
    case "lg":
      return variant === "primary"
        ? "px-6 py-3.5 text-[16px]"
        : "px-[22px] py-[13px] text-[16px]";
    case "md":
      return variant === "primary"
        ? "px-[22px] py-[13px] text-[15px]"
        : "px-[19px] py-[11px] text-[15px] font-bold";
    case "sm":
      return variant === "primary"
        ? "px-5 py-3 text-[14px]"
        : "px-4 py-[11px] text-[14px]";
    case "block":
      return "w-full p-3.5 text-[15px] text-center justify-center";
  }
}

const radiusClasses: Record<ButtonRadius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export default function LandingV2Button(props: LandingV2ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    radius,
    className = "",
  } = props;

  const defaultRadius = size === "sm" ? "rounded-full" : "rounded-full";
  const activeRadiusClass = radius ? radiusClasses[radius] : defaultRadius;

  const combinedClassName = `inline-flex cursor-pointer items-center ${activeRadiusClass} no-underline ${variantClasses[variant]} ${getSizeClasses(
    variant,
    size
  )} ${className}`;

  if (typeof props.href === "string") {
    const isExternalOrMailto =
      props.href.startsWith("mailto:") ||
      props.href.startsWith("http://") ||
      props.href.startsWith("https://") ||
      props.href.startsWith("#");

    if (isExternalOrMailto) {
      return (
        <a
          href={props.href}
          onClick={props.onClick}
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        className={combinedClassName}
      >
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...buttonProps
  } = props;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
