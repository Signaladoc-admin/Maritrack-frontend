"use client";

import * as React from "react";
import { Search, Globe, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";

export function BlockedWebsitesModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Mock data state
  const [websites, setWebsites] = React.useState([
    "www.medium.com",
    "www.facebook.com",
    "www.twitter.com",
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 sm:max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-xl font-bold text-slate-900">Blocked websites</DialogTitle>
        </DialogHeader>

        {/* Add Website Input */}
        <div className="mb-4 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="flex h-11 w-full rounded-md border border-slate-200 bg-slate-50 pr-3 pl-10 text-sm focus:ring-2 focus:ring-[#1B3C73] focus:outline-none"
              placeholder="Enter website url to block a website"
            />
          </div>
          <Button className="h-11 bg-[#D95D55] px-6 hover:bg-[#c04d45]">Add Website</Button>
        </div>

        {/* List of Websites */}
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          {websites.map((site, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                  <Globe className="h-4 w-4 text-[#1B3C73]" />
                </div>
                <span className="font-medium text-slate-700">{site}</span>
              </div>
              <button className="text-sm font-medium text-[#1B3C73] hover:underline">
                Unblock
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
