"use client";

import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Child {
  id: string;
  name: string;
  image?: string;
}

export function ChildrenDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const children: Child[] = [
    {
      id: "1",
      name: "Solomon Grundy",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Solomon",
    },
    {
      id: "2",
      name: "Kuroebi Grundy",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kuroebi",
    },
    {
      id: "3",
      name: "Sammie Grundy",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sammie",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 rounded-[60px] border border-transparent bg-[#F8F9FA] py-2 pr-6 pl-2 transition-all hover:bg-neutral-100/50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73] p-2">
          <User className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold text-[#1B3C73]">All Children</span>
        <ChevronDown
          className={cn("h-6 w-6 text-[#1B3C73] transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-72 origin-top-right rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-black/5">
          <div className="space-y-1">
            <button className="flex w-full items-center gap-4 rounded-2xl bg-[#F8F9FA] px-4 py-3 text-left transition-colors hover:bg-neutral-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73] p-1.5">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-bold text-[#1B3C73]">All Children</span>
            </button>

            {children.map((child) => (
              <button
                key={child.id}
                className="flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-neutral-50"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full transition-transform group-hover:scale-105">
                  <img src={child.image} alt={child.name} className="h-full w-full object-cover" />
                </div>
                <span className="text-base font-bold text-slate-700">{child.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
