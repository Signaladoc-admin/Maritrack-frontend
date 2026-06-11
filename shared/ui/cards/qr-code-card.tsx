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
      className={cn(
        "flex flex-col justify-center p-8 text-center shadow-2xl transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center rounded-3xl text-center text-white">
        <div className="mb-4 flex w-full items-center justify-center rounded-xl bg-white p-4 shadow-lg">
          {isLoading ? (
            <div className="aspect-square h-auto w-72 animate-pulse rounded bg-slate-100" />
          ) : isError ? (
            <div className="text-destructive text-sm font-medium">Failed to load QR</div>
          ) : src ? (
            <img
              src={src}
              alt="Pairing QR Code"
              className="h-auto w-full max-w-[300px] min-w-[265px] object-contain lg:max-w-[350px] lg:min-w-[350px]"
            />
          ) : (
            <QrCode className="h-32 w-32 text-slate-300" />
          )}
        </div>
        <p className="mt-4 max-w-[200px]">{description}</p>
      </div>
    </CardWrapper>
  );
}
