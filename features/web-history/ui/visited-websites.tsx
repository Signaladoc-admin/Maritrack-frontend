"use client";

import React from "react";
import { Search, Globe, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/input";

interface WebsiteItem {
  id: string;
  url: string;
  time: string;
  isBlocked?: boolean;
}

const visitedWebsites: WebsiteItem[] = [
  { id: "1", url: "www.facebook.com", time: "2h 33mins" },
  { id: "2", url: "www.medium.com", time: "2h 33mins" },
  { id: "3", url: "Snapchat.com", time: "2h 33mins", isBlocked: true },
  { id: "4", url: "www.web3school.com", time: "2h 33mins" },
  { id: "5", url: "www.pinterest.com", time: "2h 33mins" },
];

const VisitedWebsites = () => {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="text-base font-medium text-slate-500">Visited websites</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <Input
          placeholder="Search for a website"
          iconLeft={<Search className="h-4 w-4 text-slate-400" />}
          className="rounded-xl border-slate-200 bg-slate-50"
          wrapperClassName="mb-6"
        />

        <div className="space-y-4">
          {visitedWebsites.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    item.isBlocked ? "bg-[#8D302A]/10 text-[#8D302A]" : "bg-slate-50 text-[#1B3C73]"
                  )}
                >
                  <Globe className="h-6 w-6" />
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {item.isBlocked && <AlertCircle className="h-4 w-4 text-[#8D302A]" />}
                    <span
                      className={cn(
                        "text-base font-bold",
                        item.isBlocked ? "text-[#8D302A]" : "text-[#212529]"
                      )}
                    >
                      {item.url}
                    </span>
                  </div>
                  {item.isBlocked && (
                    <span className="text-sm font-medium text-[#8D302A]">Attempt blocked</span>
                  )}
                </div>
              </div>

              {/* Time Label */}
              <span className="text-sm font-medium text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitedWebsites;
