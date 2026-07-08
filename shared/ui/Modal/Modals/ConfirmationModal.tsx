"use client";

import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "../../button";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "destructive" | "default";
  loading?: boolean;
  loadingText?: string;
}

export function ConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive",
  loading,
  loadingText = "Loading...",
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 text-center sm:max-w-[400px]">
        {/* Icon Section */}
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-[#D95D55]" />
        </div>

        <DialogHeader className="space-y-2">
          <DialogTitle className="text-center text-xl text-[#1B3C73]">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center text-gray-500">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="mt-6 flex w-full flex-col gap-3 sm:grid sm:grid-cols-2 sm:justify-center">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm} disabled={loading}>
            {loading ? loadingText : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
