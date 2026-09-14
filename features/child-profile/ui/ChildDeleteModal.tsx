"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";
import { AlertTriangle, User } from "lucide-react";
import { DeleteChildModalProps } from "../model/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { ChildProfileCard } from "@/shared/ui/cards/child-profile-card";

export function DeleteChildModal({
  open,
  onOpenChange,
  data,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "destructive",
}: DeleteChildModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-6 text-center shadow-none sm:max-w-[420px]">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--coral-border)] bg-[var(--coral-soft)]">
          <AlertTriangle className="h-6 w-6 text-[var(--coral)]" />
        </div>

        <DialogHeader className="space-y-3 text-center">
          <DialogTitle className="text-lg font-bold text-[var(--text-1)]">{title}</DialogTitle>

          <ChildProfileCard {...data} showActions={false} />

          {description && (
            <DialogDescription className="text-xs text-[var(--text-2)]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="mt-6 w-full flex-row gap-3 sm:justify-center">
          <Button
            variant="secondary"
            className="flex-1 cursor-pointer border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--text-1)] hover:bg-[var(--card-hover)]"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            className={`flex-1 cursor-pointer font-bold ${
              variant === "destructive"
                ? "bg-[var(--coral)] text-white hover:opacity-90"
                : "btn-primary"
            }`}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
