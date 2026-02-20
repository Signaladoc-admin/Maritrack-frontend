import { QrCode } from "lucide-react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { cn } from "@/shared/lib/utils";

interface QRCodeCardProps {
  description?: string;
  qrCodeValue?: string;
  className?: string;
}

export function QRCodeCard({
  description = "Scan this QR Code on the child\u2019s device to pair",
  qrCodeValue,
  className,
}: QRCodeCardProps) {
  return (
    <CardWrapper
      variant="warning"
      padding="lg"
      className={cn("flex w-full flex-col items-center text-center", className)}
    >
      {/* QR placeholder */}
      <div className="mb-5 flex aspect-square w-full items-center justify-center rounded-2xl bg-white/20">
        <QrCode className="h-2/3 w-2/3 text-white" strokeWidth={1.5} />
      </div>

      <p className="text-sm leading-snug font-medium text-white">{description}</p>
    </CardWrapper>
  );
}
