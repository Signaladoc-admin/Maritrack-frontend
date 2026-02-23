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
import { User } from "lucide-react";

interface EditChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { name: string; age: string; gender: string };
}

export function EditChildModal({ open, onOpenChange, initialData }: EditChildModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#1B3C73]">
            Edit {initialData?.name || "Child"}'s Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Avatar Placeholder */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 sm:mx-0">
            <User className="h-8 w-8 text-slate-400" />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Child name</label>
              <input
                className="border-input placeholder:text-muted-foreground flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-[#1B3C73] focus-visible:outline-none"
                placeholder="Name here"
                defaultValue={initialData?.name}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Age</label>
                <input
                  className="border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-[#1B3C73] focus-visible:outline-none"
                  placeholder="14"
                  defaultValue={initialData?.age}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-500">Gender</label>
                <select className="border-input flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-[#1B3C73] focus-visible:outline-none">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full bg-[#1B3C73]" onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
