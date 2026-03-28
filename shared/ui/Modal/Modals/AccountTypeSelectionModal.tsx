"use client";

import * as React from "react";
import { User, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog";
import { cn } from "@/lib/utils";

interface AccountTypeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (type: "personal" | "business") => void;
}

export function AccountTypeModal({ open, onOpenChange, onSelect }: AccountTypeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 sm:max-w-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-left text-2xl font-bold text-[#1B3C73]">
            What type of account do you want to create?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Personal Account Card */}
          <div
            onClick={() => onSelect("personal")}
            className="group flex cursor-pointer flex-col gap-3 rounded-xl bg-[#F8F9FA] p-6 transition-all hover:bg-[#F0F4FF] hover:ring-2 hover:ring-[#1B3C73]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73] text-white">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1B3C73]">A Personal Account</h3>
              <p className="mt-1 text-sm text-slate-500">
                Suitable for parents who want to keep track of their children’s app usage
              </p>
            </div>
          </div>

          {/* Business Account Card */}
          <div
            onClick={() => onSelect("business")}
            className="group flex cursor-pointer flex-col gap-3 rounded-xl bg-[#F8F9FA] p-6 transition-all hover:bg-[#F0F4FF] hover:ring-2 hover:ring-[#1B3C73]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73] text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1B3C73]">A Business Account</h3>
              <p className="mt-1 text-sm text-slate-500">
                Suitable for businesses or large industries that want to keep track of their staffs’
                usage
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
