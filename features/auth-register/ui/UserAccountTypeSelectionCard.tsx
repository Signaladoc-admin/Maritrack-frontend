import { LucideIcon } from "lucide-react";
import Link from "next/link";

export default function UserAccountTypeSelectionCard({
  icon: Icon,
  label,
  description,
  href,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="hover:border-accent-border transition-colors block space-y-3 rounded-lg border border-border bg-card-fill p-5 duration-100 hover:bg-card-hover"
    >
      <div className="bg-accent-tint inline-flex rounded-full p-3 text-accent">
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold text-foreground">{label}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}
