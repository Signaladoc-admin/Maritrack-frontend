import { QrCode } from "lucide-react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";

interface QRCodeCardProps {
  description?: string;
  src?: string;
  isLoading?: boolean;
  className?: string;
}

export function QRCodeCard({
  description = "Scan this QR Code on the child’s device to pair",
  src,
  isLoading,
  className,
}: QRCodeCardProps) {
  return (
    <CardWrapper
      variant="warning"
      padding="lg"
      radius="lg"
      className={cn(
        "flex aspect-square w-full max-w-[500px] flex-col justify-center p-12 text-center shadow-2xl transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <div className="flex w-full flex-1 items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <p className="text-sm font-medium opacity-80">Generating QR Code...</p>
          </div>
        ) : src ? (
          <div className="flex aspect-square w-full items-center justify-center rounded-[32px] bg-orange-100/30 p-4 shadow-inner">
            <img
              src={src}
              alt="QR Code"
              className="h-full w-full object-contain mix-blend-screen invert"
            />
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-[32px] bg-orange-100/30 shadow-inner">
            <QrCode className="h-2/3 w-2/3 text-white opacity-40" strokeWidth={1} />
          </div>
        )}
      </div>

      <p className="mt-6 px-4 text-center leading-relaxed text-white/95">{description}</p>
    </CardWrapper>
  );
}
