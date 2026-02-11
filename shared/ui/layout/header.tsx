import { cn } from "@/shared/lib/utils";
import { H1, P } from "@/shared/ui/typography";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function Header({ title, subtitle, action, className }: HeaderProps) {
  return (
    <header className={cn("bg-background flex items-center justify-between py-6", className)}>
      <div className="space-y-5">
        <H1 className="leading-tight">{title}</H1>
        {subtitle && <P className="text-muted-foreground font-medium">{subtitle}</P>}
      </div>
      <div>{action}</div>
    </header>
  );
}
