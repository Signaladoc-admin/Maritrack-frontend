import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { cn } from "../lib/utils";
import { ReactNode } from "react";
import { H3 } from "./typography";

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  confirmText,
  confirmClassName,
  onConfirm,
  cancelText,
  cancelClassName,
  onCancel,
  className,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  confirmText?: string;
  confirmClassName?: string;
  onConfirm?: () => void;
  cancelText?: string;
  cancelClassName?: string;
  onCancel?: () => void;
  /** Extra classes applied to DialogContent — use to override max-width, padding, etc. */
  className?: string;
  children: ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("z-[99999] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-5", !className?.includes("max-w") && "sm:max-w-md", className)}>
        {title || subtitle ? (
          <DialogHeader className="flex flex-col items-start space-y-1.5">
            {title && (
              <DialogTitle asChild className="mb-0! text-xl font-bold text-[var(--text-1)]">
                <H3 className="text-[var(--text-1)]">{title}</H3>
              </DialogTitle>
            )}
            {subtitle && <p className="text-sm text-[var(--text-3)]">{subtitle}</p>}
          </DialogHeader>
        ) : (
          <DialogTitle className="sr-only">Modal dialog</DialogTitle>
        )}

        {/* Modal Body */}
        <>{children}</>

        {/* Footer Actions */}
        {(cancelText || confirmText) && (
          <div className="flex items-center gap-3">
            {cancelText && (
              <Button
                className={cn(cancelClassName, "w-full")}
                variant="outline"
                onClick={() => {
                  onClose();
                  onCancel?.();
                }}
              >
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button
                className={cn(confirmClassName, "w-full")}
                onClick={() => {
                  onConfirm?.();
                }}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
