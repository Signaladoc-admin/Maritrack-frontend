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
      <DialogContent className={cn("z-99999 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl p-5 sm:max-w-md", className)}>
        <DialogHeader className="flex flex-col items-start space-y-3">
          <DialogTitle asChild className="mb-0! text-xl">
            <H3 className="text-primary">{title}</H3>
          </DialogTitle>
          <p className="mt-3 text-sm opacity-70">{subtitle}</p>
        </DialogHeader>

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
