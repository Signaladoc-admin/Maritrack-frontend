import { Loader2 } from "lucide-react";

import { cn } from "@/shared/lib/utils";

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

// Full-screen loader matching the new Flentra dark-theme design system.
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-foreground">
      {/* Brand logo */}
      <div className="relative mb-6 flex items-center justify-center">
        <img
          src="/assets/FlentraLogo.svg"
          alt="Flentra Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Pure green spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-card-line border-t-accent will-change-transform" />
    </div>
  );
}
