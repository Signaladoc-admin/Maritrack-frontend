import { useIsMobile } from "@/shared/hooks/use-mobile";
import { cn } from "@/shared/lib/utils";
import { H2, H3, H4, P } from "@/shared/ui/typography";
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
  variant = "base",
}: HeaderProps) {
  const titleVariants = {
    primary: "text-primary",
    neutral: "text-neutral-800",
  };

  return (
    <header className={cn("bg-background mb-12 flex items-center justify-between", className)}>
      <div className="space-y-2">
        {variant === "base" && (
          <H3 className={cn("text-2xl leading-tight md:text-3xl", titleVariants[titleVariant])}>
            {title}
          </H3>
        )}
        {variant === "sm" && (
          <H4 className={cn("text-xl leading-tight md:text-2xl", titleVariants[titleVariant])}>
            {title}
          </H4>
        )}
        {subtitle && (
          <div className="text-muted-foreground mt-0! text-sm font-medium md:text-base">
            {subtitle}
          </div>
        )}
      </div>
      <div>{action}</div>
    </header>
  );
}
