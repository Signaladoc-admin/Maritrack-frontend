"use client";

import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { QrCode, AlertCircle, RefreshCw, Maximize2, X, Download } from "lucide-react";
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
  /** Max on-screen size (CSS px) of the inline QR code. Defaults to 400. */
  maxCssPx?: number;
  /** Enable download button for high-res offline/screen-glare fallback */
  allowDownload?: boolean;
  /** Custom download filename */
  downloadFileName?: string;
  /** Version or provider label shown under QR code (e.g. "v4.1.0 - Flentra") */
  versionLabel?: string;
}

/** Default max on-screen size (CSS px) of the inline QR code to ensure legibility on all cameras. */
const DEFAULT_INLINE_MAX_CSS_PX = 400;

function CrispQrImage({
  src,
  maxCssPx,
  className,
}: {
  src: string;
  maxCssPx: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Pairing QR Code"
      draggable={false}
      loading="eager"
      decoding="sync"
      className={cn("qr-crisp-image block h-auto w-full select-none", className)}
      style={{
        maxWidth: maxCssPx,
        // Nearest-neighbour keeps module edges sharp black/white instead of blurred grey
        imageRendering: "pixelated",
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
  maxCssPx = DEFAULT_INLINE_MAX_CSS_PX,
  allowDownload = false,
  downloadFileName = "pairing-qr-code.png",
  versionLabel,
}: QRCodeCardProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleDownload = useCallback(() => {
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [src, downloadFileName]);

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

      {/* QR Code Canvas Frame: Pure white with generous quiet zone ensures instant, error-free camera detection */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        {isLoading ? (
          <div
            className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl bg-slate-100/90 animate-pulse"
            style={{ maxWidth: maxCssPx }}
          >
            <QrCode className="h-16 w-16 text-slate-300 animate-pulse" />
            <span className="text-xs font-medium text-slate-400">Encrypting pairing key...</span>
          </div>
        ) : isError ? (
          <div
            className="flex aspect-square w-full flex-col items-center justify-center gap-2.5 p-4 text-center"
            style={{ maxWidth: maxCssPx }}
          >
            <AlertCircle className="h-10 w-10 text-[var(--coral)]" />
            <p className="text-xs font-semibold text-slate-700">Failed to load QR code</p>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Try again
              </button>
            )}
          </div>
        ) : src ? (
          <div className="flex w-full flex-col items-center">
            <CrispQrImage src={src} maxCssPx={maxCssPx} />

            {(versionLabel || allowDownload) && (
              <div className="mt-3.5 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                {versionLabel ? (
                  <span className="font-mono text-[11px] font-medium text-slate-600">{versionLabel}</span>
                ) : (
                  <span />
                )}
                {allowDownload && (
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Simplified QR
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center"
            style={{ maxWidth: maxCssPx }}
          >
            <QrCode className="h-32 w-32 text-slate-300" />
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

      {/* Full-screen view: nested Radix dialog so it doesn't dismiss the parent modal */}
      {allowEnlarge && src && (
        <DialogPrimitive.Root open={isEnlarged} onOpenChange={setIsEnlarged}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-xs" />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className="fixed inset-0 z-[100001] flex items-center justify-center p-4 outline-none"
              onClick={() => setIsEnlarged(false)}
            >
              <DialogPrimitive.Title className="sr-only">Enlarged pairing QR code</DialogPrimitive.Title>
              <div
                className="relative flex flex-col items-center rounded-3xl bg-white p-8 sm:p-10 shadow-2xl max-w-[95vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <CrispQrImage
                  src={src}
                  maxCssPx={Math.min(640, window.innerHeight - 180, window.innerWidth - 80)}
                />
                <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <span className="font-mono text-xs font-semibold">{versionLabel || "Flentra MDM Enrollment"}</span>
                  {allowDownload && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      Download Image
                    </button>
                  )}
                </div>
                <DialogPrimitive.Close className="absolute top-3 right-3 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer">
                  <X className="h-5 w-5" />
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
