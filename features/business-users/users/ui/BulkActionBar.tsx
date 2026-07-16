import React from "react";
import { Button } from "@/shared/ui/button";

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  title?: string;
  buttonText?: string;
  variant?: "default" | "destructive";
  onProceed: () => void;
  onCancel: () => void;
}

export default function BulkActionBar({
  selectedCount,
  totalCount,
  title = "Send Bulk Messages",
  buttonText = "Proceed to Compose Message",
  variant = "default",
  onProceed,
  onCancel,
}: BulkActionBarProps) {
  const isDestructive = variant === "destructive";
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full min-h-[48px]">
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-[#1b3c73]">{title}</h2>
        <p className="text-sm text-gray-500">
          {selectedCount} device{selectedCount !== 1 && "s"} of {totalCount} selected
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          onClick={onProceed} 
          className={isDestructive ? "bg-[#d9534f] hover:bg-[#c9302c] text-white" : "bg-[#1b3c73] hover:bg-[#142d57] text-white"}
        >
          {buttonText}
        </Button>
        <Button variant="ghost" onClick={onCancel} className="text-[#1b3c73]">
          Cancel
        </Button>
      </div>
    </div>
  );
}
