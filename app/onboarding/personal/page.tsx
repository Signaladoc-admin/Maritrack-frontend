"use client";

import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";
import ChildrenProfiles from "@/features/onboarding/ui/ChildrenProfiles";
import ParentalControlSetup from "@/features/parents/ui/ParentalControlSetup";
import { MultiStepForm } from "@/shared/ui/multi-step-form";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/features/payments/model/usePayments";
import { useToast } from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { useLogout } from "@/features/auth/model/useLogout";
import { cn } from "@/shared/lib/utils";
import { useParentStore } from "@/shared/stores/user-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";

export function ChildrenDropdown() {
  const { children, selectedChildId, setSelectedChildId, setChildren } = useParentStore();
  const { data: userProfile } = useUserProfile();
  const parentId = userProfile?.parentId;

  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones();

  useEffect(() => {
    if (parentZonesRes) {
      // Map server data to shop-store Child interface if necessary
      const mappedChildren = parentZonesRes[0]?.parentChildren?.map((child: any) => ({
        id: child.childId,
        name: child.child.name,
        avatar: child.child.imageUrl,
      }));
      setChildren(mappedChildren);
    }
  }, [parentZonesRes, setChildren]);

  const selectedChild = children?.find((c) => c.id === selectedChildId);
  const isAllSelected = selectedChildId === "all";

  const handleSelect = (id: string) => {
    setSelectedChildId(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex h-auto cursor-pointer items-center gap-4 rounded-[60px] border-none bg-[#F8F9FA] py-2 pr-6 pl-2 shadow-none transition-all hover:bg-neutral-100/50 focus:ring-0 focus:outline-hidden"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#1B3C73]">
            {isAllSelected ? (
              <User className="h-5 w-5 text-white" />
            ) : (
              <Avatar className="h-full w-full">
                <AvatarImage src={selectedChild?.avatar} alt={selectedChild?.name} />
                <AvatarFallback className="bg-[#1B3C73] text-white">
                  {selectedChild?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#1B3C73]">
              {isAllSelected ? "All Children" : selectedChild?.name}
            </span>
            <ChevronDown className="h-5 w-5 text-[#1B3C73] transition-transform duration-200" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72 rounded-3xl p-2 shadow-2xl">
        <DropdownMenuItem
          onSelect={() => handleSelect("all")}
          className={cn(
            "flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-[#F8F9FA] focus:bg-[#F8F9FA]",
            isAllSelected && "bg-[#ECF1F9] focus:bg-[#ECF1F9]"
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1B3C73]">
            <User className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold text-[#1B3C73]">All Children</span>
        </DropdownMenuItem>

        {children?.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <DropdownMenuItem
              key={child.id}
              onSelect={() => handleSelect(child.id)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-neutral-50 focus:bg-neutral-50",
                isSelected && "bg-[#ECF1F9] focus:bg-[#ECF1F9]"
              )}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={child.avatar} alt={child.name} />
                  <AvatarFallback className="bg-[#1B3C73] text-white">
                    {child.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "text-base font-bold",
                    isSelected ? "text-[#1B3C73]" : "text-slate-700"
                  )}
                >
                  {child.name}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
