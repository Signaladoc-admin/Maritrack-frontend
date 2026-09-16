import { QrCode, AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface QRCodeCardProps {
  description?: string;
  src?: string;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  statusLabel?: string;
  onRefresh?: () => void;
}

export function QRCodeCard({
  description = "Scan this QR Code on the device to pair",
  src,
  isLoading,
  isError,
  className,
  statusLabel,
  onRefresh,
}: QRCodeCardProps) {
  return (
    <div
      className={cn(
        "surface flex flex-col items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 sm:p-6 text-center shadow-none transition-all",
        className
      )}
    >
      {/* Status pill badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
        {isLoading ? (
          <span className="flex items-center gap-1.5 text-[var(--info)] border-[var(--info-border)] bg-[var(--info-tint)] px-2 py-0.5 rounded-full">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Generating code...
          </span>
        ) : isError ? (
          <span className="flex items-center gap-1.5 text-[var(--coral)] border-[var(--coral-border)] bg-[var(--coral-soft)] px-2 py-0.5 rounded-full">
            <AlertCircle className="h-3 w-3" />
            Generation failed
          </span>
        ) : src ? (
          <span className="flex items-center gap-1.5 text-[var(--accent)] border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            {statusLabel || "Ready to scan"}
          </span>
        ) : (
          <span className="text-[var(--text-3)]">Awaiting code</span>
        )}
      </div>

      {/* QR Code Canvas Frame: Pure white with subtle hairline border ensures instant, error-free camera detection */}
      <div className="relative flex w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
        {isLoading ? (
          <div className="flex aspect-square w-full max-w-[240px] flex-col items-center justify-center gap-3 rounded-xl bg-slate-100/90 animate-pulse">
            <QrCode className="h-14 w-14 text-slate-300 animate-pulse" />
            <span className="text-xs font-medium text-slate-400">Encrypting pairing key...</span>
          </div>
        ) : isError ? (
          <div className="flex aspect-square w-full max-w-[240px] flex-col items-center justify-center gap-2.5 p-4 text-center">
            <AlertCircle className="h-10 w-10 text-[var(--coral)]" />
            <p className="text-xs font-semibold text-slate-700">Failed to load QR code</p>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Try again
              </button>
            )}
          </div>
        ) : src ? (
          <img
            src={src}
            alt="Pairing QR Code"
            className="aspect-square h-auto w-full max-w-[240px] min-w-[200px] object-contain select-none"
            loading="eager"
          />
        ) : (
          <div className="flex aspect-square w-full max-w-[240px] items-center justify-center">
            <QrCode className="h-28 w-28 text-slate-300" />
          </div>
        )}
      </div>

      {/* Helper caption */}
      <p className="mt-3.5 max-w-sm text-xs leading-relaxed font-medium text-[var(--text-2)]">
        {description}
      </p>
    </div>
  );
}
