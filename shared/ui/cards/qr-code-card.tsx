"use client";

import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { QrCode, AlertCircle, RefreshCw, Maximize2, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface QRCodeCardProps {
  description?: string;
  src?: string;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
  statusLabel?: string;
  onRefresh?: () => void;
  /** Show an "Enlarge" button that opens the QR code full-screen. Don't enable when the card is nested inside a <button>. */
  allowEnlarge?: boolean;
}

/** Max on-screen size (CSS px) of the inline QR code. */
const INLINE_MAX_CSS_PX = 280;

/**
 * Returns a CSS size for the QR image such that every source pixel maps to an
 * integer number of *device* pixels (or an integer fraction when downscaling).
 *
 * Dense QR codes (e.g. Android provisioning payloads) break when the browser
 * resamples them at a fractional ratio: module edges become grey/blurred and
 * module widths become uneven, which weaker phone cameras can't decode.
 */
function getCrispSize(naturalPx: number, dpr: number, maxCssPx: number): number {
  const nativeCss = naturalPx / dpr;

  if (nativeCss <= maxCssPx) {
    const scale = Math.max(1, Math.floor(maxCssPx / nativeCss));
    return nativeCss * scale;
  }

  const divisor = Math.ceil(nativeCss / maxCssPx);
  return nativeCss / divisor;
}

function useCrispQrSize(maxCssPx: number) {
  const [naturalPx, setNaturalPx] = useState<number | null>(null);
  const [dpr, setDpr] = useState(() =>
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  );

  useEffect(() => {
    // devicePixelRatio changes on browser zoom or when moving between monitors
    const onResize = () => setDpr(window.devicePixelRatio || 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    setNaturalPx(e.currentTarget.naturalWidth || null);
    setDpr(window.devicePixelRatio || 1);
  }, []);

  const size = naturalPx ? getCrispSize(naturalPx, dpr, maxCssPx) : null;
  const isUpscaledOrNative = !!naturalPx && !!size && size * dpr >= naturalPx;

  return { size, onLoad, isUpscaledOrNative };
}

function CrispQrImage({ src, maxCssPx, className }: { src: string; maxCssPx: number; className?: string }) {
  const { size, onLoad, isUpscaledOrNative } = useCrispQrSize(maxCssPx);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Pairing QR Code"
      onLoad={onLoad}
      draggable={false}
      loading="eager"
      decoding="sync"
      className={cn("block h-auto max-w-full select-none", className)}
      style={{
        width: size ?? maxCssPx,
        // Nearest-neighbour keeps module edges hard black/white instead of anti-aliased grey
        imageRendering: isUpscaledOrNative ? "pixelated" : "auto",
      }}
    />
  );
}

export function QRCodeCard({
  description = "Scan this QR Code on the device to pair",
  src,
  isLoading,
  isError,
  className,
  statusLabel,
  onRefresh,
  allowEnlarge = false,
}: QRCodeCardProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

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
      <div className="relative flex w-full max-w-fit items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
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
          <CrispQrImage src={src} maxCssPx={INLINE_MAX_CSS_PX} />
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

      {allowEnlarge && src && !isLoading && !isError && (
        <button
          type="button"
          onClick={() => setIsEnlarged(true)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[var(--card-line)] px-3 py-1.5 text-[11px] font-semibold text-[var(--text-2)] transition-colors hover:bg-[var(--card-hover)] hover:text-[var(--text-1)] cursor-pointer"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Having trouble scanning? Enlarge
        </button>
      )}

      {/* Full-screen view: nested Radix dialog so it doesn't dismiss the parent modal.
          Centered with flexbox (no translate/scale transforms) so the image lands on whole pixels. */}
      {allowEnlarge && src && (
        <DialogPrimitive.Root open={isEnlarged} onOpenChange={setIsEnlarged}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-[100000] bg-black/80" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[100001] flex items-center justify-center p-4 outline-none"
              onClick={() => setIsEnlarged(false)}
            >
              <DialogPrimitive.Title className="sr-only">Enlarged pairing QR code</DialogPrimitive.Title>
              <div
                className="relative rounded-2xl bg-white p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <CrispQrImage
                  src={src}
                  maxCssPx={Math.min(560, window.innerHeight - 160, window.innerWidth - 96)}
                />
                <DialogPrimitive.Close className="absolute top-2 right-2 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </div>
  );
}
