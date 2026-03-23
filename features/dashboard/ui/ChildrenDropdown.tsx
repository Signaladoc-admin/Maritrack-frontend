"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useParentStore } from "@/shared/stores/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { IChildProfile } from "@/features/onboarding/types";

export function ChildrenDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { selectedChildId, setSelectedChildId } = useParentStore();
  const { children } = useParentChildren();

  const selectedChild = children.find((c: IChildProfile) => c.id === selectedChildId);
  const isAllSelected = selectedChildId === "all";

  console.log(selectedChild);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (id: string) => {
    setSelectedChildId(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-auto w-full cursor-pointer items-center justify-between gap-4 rounded-[60px] border-none bg-[#F8F9FA] py-2 pr-6 pl-2 shadow-none transition-all hover:bg-neutral-100/50 focus:ring-0 md:w-auto md:justify-start"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1B3C73]">
            {isAllSelected ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Avatar className="h-full w-full">
                <AvatarImage src={selectedChild?.imageUrl} alt={selectedChild?.name} />
                <AvatarFallback className="bg-[#1B3C73] text-white">
                  {selectedChild?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <span className="text-lg font-bold text-[#1B3C73]">
            {isAllSelected ? "All Children" : selectedChild?.name}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#1B3C73] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute right-0 z-50 mt-3 w-72 origin-top-right rounded-3xl bg-white p-2 shadow-2xl ring-1 ring-black/5 duration-200">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className={cn(
                "flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-[#F8F9FA]",
                isAllSelected && "bg-[#ECF1F9]"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73]">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-base font-bold text-[#1B3C73]">All Children</span>
            </button>

            {children.map((child: IChildProfile) => (
              <button
                key={child.id}
                type="button"
                onClick={() => handleSelect(child.id!)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-neutral-50",
                  selectedChildId === child.id && "bg-[#ECF1F9]"
                )}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={child.imageUrl} alt={child.name} />
                    <AvatarFallback className="bg-[#1B3C73] text-white">
                      {child.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "text-base font-bold",
                      selectedChildId === child.id ? "text-[#1B3C73]" : "text-slate-700"
                    )}
                  >
                    {child.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
