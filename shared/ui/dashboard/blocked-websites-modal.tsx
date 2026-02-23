"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/shared/ui/dialog";
import { Globe, Plus, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface BlockedWebsitesModalProps {
  websites?: string[];
  trigger?: React.ReactNode;
  className?: string;
}

export function BlockedWebsitesModal({
  websites: initialWebsites = [
    "www.facebook.com",
    "www.tiktok.com",
    "www.reddit.com",
    "www.twitter.com",
  ],
  trigger,
  className,
}: BlockedWebsitesModalProps) {
  const [sites, setSites] = useState(initialWebsites);
  const [newSite, setNewSite] = useState("");

  const addSite = () => {
    const trimmed = newSite.trim();
    if (trimmed && !sites.includes(trimmed)) {
      setSites((prev) => [...prev, trimmed]);
      setNewSite("");
    }
  };

  const removeSite = (domain: string) => {
    setSites((prev) => prev.filter((s) => s !== domain));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSite();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || <Button>Manage websites</Button>}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader>
          <DialogTitle>Blocked Websites</DialogTitle>
          <DialogDescription>
            Manage websites that are blocked on your child&rsquo;s device.
          </DialogDescription>
        </DialogHeader>

        {/* add input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="www.example.com"
            className="h-9 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#1b3c73] focus:ring-1 focus:ring-[#1b3c73]"
          />
          <Button size="sm" onClick={addSite} className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add
          </Button>
        </div>

        {/* list */}
        <div className="max-h-60 space-y-1 overflow-y-auto">
          {sites.map((domain) => (
            <div
              key={domain}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-[#1b3c73]" />
                <span className="text-sm">{domain}</span>
              </div>
              <button
                onClick={() => removeSite(domain)}
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {sites.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-400">No blocked websites</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
