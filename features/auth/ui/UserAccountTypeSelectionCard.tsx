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
    <Link href={href} className="block space-y-3 rounded-lg bg-neutral-100 p-5">
      <div className="bg-primary inline-flex rounded-full p-3 text-white">
        <Icon className="size-6" />
      </div>
      <h3 className="font-semibold text-neutral-700">{label}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}
