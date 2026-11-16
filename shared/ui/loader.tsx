"use client";

import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

const LANDING_V2_EXACT_ROUTES = new Set([
  "/",
  "/landing",
  "/book-a-demo",
  "/company",
  "/family",
  "/forgot-password",
  "/privacy-policy",
  "/sign-in",
  "/terms-of-service",
]);

const LANDING_V2_PREFIX_ROUTES = [
  "/platform",
  "/solutions",
  "/resources",
  "/blog",
];

/** Returns true when the current route renders inside the Version 2 navy shell. */
export function isLandingV2Route(pathname: string | null): boolean {
  if (!pathname) return false;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  if (LANDING_V2_EXACT_ROUTES.has(normalized)) return true;
  return LANDING_V2_PREFIX_ROUTES.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`)
  );
}

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg";
}

export function Loader({ className, size = "default", ...props }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2
        className={cn("text-accent animate-spin", {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "default",
          "h-12 w-12": size === "lg",
        })}
      />
    </div>
  );
}

export interface PageLoaderProps {
  variant?: "auto" | "v2" | "default";
}

// Full-screen loader scoped to Version 2 navy styling on V2 routes and theme tokens elsewhere.
export function PageLoader({ variant = "auto" }: PageLoaderProps = {}) {
  const pathname = usePathname();
  const useV2Theme =
    variant === "v2" || (variant === "auto" && isLandingV2Route(pathname));

  return (
    <div
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center",
        useV2Theme
          ? "bg-navy text-white"
          : "bg-background text-foreground"
      )}
    >
      {/* Brand logo */}
      <div className="relative mb-6 flex items-center justify-center">
        <img
          src={useV2Theme ? "/assets/flentra-logo.png" : "/assets/FlentraLogo.svg"}
          alt="Flentra Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Pure green spinner */}
      <div
        className={cn(
          "h-10 w-10 animate-spin rounded-full border-2 will-change-transform",
          useV2Theme
            ? "border-white/15 border-t-green"
            : "border-card-line border-t-accent"
        )}
      />
    </div>
  );
}
