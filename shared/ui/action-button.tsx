import { Button, ButtonProps } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Loader2 } from "lucide-react";

interface ActionButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function ActionButton({
  isLoading,
  children,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <Button className={cn("min-w-[100px]", className)} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
