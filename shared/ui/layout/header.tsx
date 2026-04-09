import { cn } from "@/shared/lib/utils";
import { H2, H4, P } from "@/shared/ui/typography";
import { ReactNode } from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  title: string;
  subtitle?: string | ReactNode;
  action?: ReactNode;
  titleVariant?: "primary" | "neutral";
  variant?: "sm" | "base";
}

export function Header({
  title,
  subtitle,
  action,
  className,
  titleVariant = "primary",
  variant = "sm",
}: HeaderProps) {
  const titleVariants = {
    primary: "text-primary",
    neutral: "text-neutral-800",
  };
  return (
    <header className={cn("bg-background mb-12 flex items-center justify-between", className)}>
      <div className="space-y-2">
        {variant === "base" && (
          <H2 className={cn("leading-tight", titleVariants[titleVariant])}>{title}</H2>
        )}
        {variant === "sm" && (
          <H4 className={cn("leading-tight", titleVariants[titleVariant])}>{title}</H4>
        )}
        {subtitle && <P className="text-muted-foreground mt-0! font-medium">{subtitle}</P>}
      </div>
      <div>{action}</div>
    </header>
  );
}
