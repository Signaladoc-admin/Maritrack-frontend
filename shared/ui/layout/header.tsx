import { cn } from "@/shared/lib/utils";
import { H1, H2, P } from "@/shared/ui/typography";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  titleVariant?: "primary" | "neutral";
}

export function Header({
  title,
  subtitle,
  action,
  className,
  titleVariant = "primary",
}: HeaderProps) {
  const titleVariants = {
    primary: "text-primary",
    neutral: "text-neutral-800",
  };
  return (
    <header className={cn("bg-background mb-12 flex items-center justify-between", className)}>
      <div className="space-y-3">
        <H1 className={cn("leading-tight", titleVariants[titleVariant])}>{title}</H1>
        {subtitle && <P className="text-muted-foreground mt-0! font-medium">{subtitle}</P>}
      </div>
      <div>{action}</div>
    </header>
  );
}
