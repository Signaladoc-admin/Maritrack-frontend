import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Badge({
  content,
  variant = "primary",
}: {
  content: string | ReactNode;
  variant?: "primary" | "secondary" | "destructive" | "outline";
}) {
  return (
    <div
      className={cn(
        "rounded-lg px-3 py-2 text-xs font-medium",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        variant === "destructive" && "bg-destructive text-destructive-foreground",
        variant === "outline" && "bg-outline text-outline-foreground"
      )}
    >
      {content}
    </div>
  );
}
