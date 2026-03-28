import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";

interface EmptyDeviceCardProps {
  onClick?: () => void;
  className?: string;
}

export function EmptyDeviceCard({ onClick, className }: EmptyDeviceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-[24px] bg-[#EEEEEE] p-8 transition-colors hover:bg-[#e4e4e4]",
        className
      )}
    >
      {/* Plus icon in a circle */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full transition-colors">
        <Plus className="h-8 w-8 text-[#FF736A]" strokeWidth={1.5} />
      </div>

      <span className="text-base font-semibold tracking-wide text-[#1B3C73]">Pair new device</span>
    </button>
  );
}
