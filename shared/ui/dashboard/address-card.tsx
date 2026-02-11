import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";
import { MapPin } from "lucide-react";

interface AddressCardProps {
  address: string;
  className?: string;
}

export function AddressCard({ address, className }: AddressCardProps) {
  return (
    <CardWrapper
      padding="none"
      className={cn(
        "flex items-center gap-3 border border-slate-100 bg-white p-4 shadow-none dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <MapPin className="h-4 w-4 fill-current text-red-500" />
      </div>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{address}</span>
    </CardWrapper>
  );
}
