import { Loader2 } from "lucide-react"

import { cn } from "@/shared/lib/utils"

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg"
}

export function Loader({ className, size = "default", ...props }: LoaderProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2
        className={cn("animate-spin text-primary", {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "default",
          "h-12 w-12": size === "lg",
        })}
      />
    </div>
  )
}

// Full-screen loader using a CSS border spinner.
// Runs on the compositor thread (GPU) so it never freezes during JS work or
// React reconciliation — unlike SVG-based spinners which can stall.
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="h-12 w-12 rounded-full border-4 border-[#E5E7EB] border-t-[#1B3C73] will-change-transform animate-spin" />
    </div>
  )
}
