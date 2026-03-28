"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card/Card";
import { Button } from "@/shared/ui/Button/button";
import { LocationHistoryCardProps } from "../types";

export function LocationHistoryCard({ items, className, onSeeMore }: LocationHistoryCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Location History</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEEEEE]">
                  <MapPin className="h-5 w-5 text-[#FF736A]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#212529]">{item.name}</span>
                  <span className="text-xs font-medium text-[#667085]">{item.duration}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-[#667085]">{item.date}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-sm font-semibold text-[#667085] hover:no-underline"
            onClick={onSeeMore}
          >
            See more
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
