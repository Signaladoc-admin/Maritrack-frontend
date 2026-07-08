import React from "react";
import { H3, P } from "./typography";
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
    <div className={cn("mb-8 flex flex-col gap-y-2", className)}>
      <H3 variant="primary" className="mb-0!">
        {title}
      </H3>
      <P className="text-muted-foreground mt-0! text-sm">{description}</P>
    </div>
  );
}
