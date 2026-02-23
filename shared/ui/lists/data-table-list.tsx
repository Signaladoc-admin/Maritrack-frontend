import { CardWrapper } from "@/shared/ui/card-wrapper";
import { H3 } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface DataTableListProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function DataTableList({
  title,
  actionLabel,
  onAction,
  children,
  className,
}: DataTableListProps) {
  return (
    <CardWrapper className={cn("flex flex-col", className)} padding="none">
      <div className="flex items-center justify-between p-6 pb-2">
        <H3 className="text-base font-semibold">{title}</H3>
        {actionLabel && onAction && (
          <Button variant="ghost" size="sm" onClick={onAction} className="text-xs">
            {actionLabel}
          </Button>
        )}
      </div>
      <div className="flex-1 space-y-4 overflow-auto px-6 pt-2 pb-6">{children}</div>
    </CardWrapper>
  );
}
