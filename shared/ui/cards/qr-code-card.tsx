import { QrCode } from "lucide-react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
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
    <CardWrapper
      variant="warning"
      padding="lg"
      radius="lg"
      className={cn(
        "flex w-full max-w-[500px] flex-col justify-center p-12 text-center shadow-2xl transition-transform hover:scale-[1.02] sm:aspect-square",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center rounded-3xl text-center text-white">
        <div className="mb-4 flex items-center justify-center rounded-3xl bg-white p-6 shadow-lg">
          {isLoading ? (
            <div className="h-32 w-32 animate-pulse rounded bg-slate-100" />
          ) : isError ? (
            <div className="text-destructive text-sm font-medium">Failed to load QR</div>
          ) : src ? (
            <img src={src} alt="Pairing QR Code" className="h-full w-full object-contain" />
          ) : (
            <QrCode className="h-32 w-32 text-slate-300" />
          )}
        </div>
        <p className="max-w-[200px] font-medium">{description}</p>
      </div>
    </CardWrapper>
  );
}
