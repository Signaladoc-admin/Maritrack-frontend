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
import { DeleteChildModalProps, EditChildModalProps } from "../types";
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
      <DialogContent className="p-8 text-center sm:max-w-[400px]">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-[#D95D55]" />
        </div>

        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl text-[#1B3C73]">{title}</DialogTitle>

          <ChildProfileCard {...data} showActions={false} />

          {description && (
            <DialogDescription className="text-gray-500">{description}</DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="mt-6 w-full flex-row gap-3 sm:justify-center">
          <Button
            variant="secondary"
            className="flex-1 bg-[#EEEEEE] text-[#1B3C73] hover:bg-[#E5E5E5]"
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant}
            className={`flex-1 ${
              variant === "destructive" ? "bg-[#D95D55] hover:bg-[#C84D45]" : "bg-[#1B3C73]"
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
