import * as React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  titleAction?: React.ReactNode;
  contentClassName?: string;
}

export const DashboardCard = React.forwardRef<HTMLDivElement, DashboardCardProps>(
  ({ className, title, titleAction, contentClassName, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col rounded-2xl border border-gray-100 bg-white p-5 sm:p-6",
          className
        )}
        {...props}
      >
        {(title || titleAction) && (
          <div className="mb-4 flex items-center justify-between">
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {titleAction && <div>{titleAction}</div>}
          </div>
        )}
        <div className={cn("flex-1", contentClassName)}>{children}</div>
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";
