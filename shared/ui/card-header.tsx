import React from "react";
import { cn } from "../lib/utils";

export default function CardHeader({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-y-1.5", className)}>
      <h3 className="mb-0! text-lg font-bold text-[var(--text-1)]">{title}</h3>
      <p className="mt-0! text-sm text-[var(--text-2)]">{description}</p>
    </div>
  );
}
