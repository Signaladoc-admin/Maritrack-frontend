import { QrCode } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface QRCodeCardProps {
  description?: string;
  src?: string;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
}

export function QRCodeCard({
  description = "Scan this QR Code on the child’s device to pair",
  src,
  isLoading,
  isError,
  className,
}: QRCodeCardProps) {
  return (
    <div
      className={cn(
        "surface flex flex-col items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-6 text-center shadow-none",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-3 flex w-full items-center justify-center rounded-xl border border-black/5 bg-white p-4 shadow-none">
          {isLoading ? (
            <div className="aspect-square h-auto w-64 animate-pulse rounded bg-neutral-200" />
          ) : isError ? (
            <div className="text-destructive py-12 text-xs font-medium">Failed to load QR code</div>
          ) : src ? (
            <img
              src={src}
              alt="Pairing QR Code"
              className="h-auto w-full max-w-[260px] min-w-[220px] object-contain"
            />
          ) : (
            <QrCode className="h-28 w-28 text-neutral-400" />
          )}
        </div>
        <p className="max-w-[240px] text-xs leading-relaxed font-medium text-[var(--text-2)]">
          {description}
        </p>
      </div>
    </div>
  );
}
