"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/shared/ui/Modal/dialog"; // Adjust path to your Dialog component
import { cn } from "@/lib/utils";

interface LoaderModalProps {
  /** Controls visibility */
  open: boolean;
  /** Text to display below the spinner (e.g., "Pairing...", "Loading...") */
  text?: string;
  /** Path to the GIF file. Default assumes it's in public/assets/ */
  gifSrc?: string;
}

export function LoaderModal({
  open,
  text = "Loading...",
  gifSrc = "/assets/loader.gif", // Change this to where you store the image
}: LoaderModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        // We pass an empty function here to prevent the user
        // from closing the modal by clicking the backdrop
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex flex-col items-center justify-center gap-6 p-10 outline-none sm:max-w-[300px]"
      >
        {/* Loader GIF */}
        <div className="relative h-24 w-24">
          <img src={gifSrc} alt="Loading spinner" className="h-full w-full object-contain" />
        </div>

        {/* Loading Text */}
        <p className="animate-pulse text-sm font-bold text-[#1B3C73]">{text}</p>
      </DialogContent>
    </Dialog>
  );
}
