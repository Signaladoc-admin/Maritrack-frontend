"use client";

import * as React from "react";
import { Home, Settings, LogOut, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../Tooltip/Tooltip";
import Link from "next/link";
import { childrenProfiles } from "@/app/(in-app)/child/[child]/data";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";
import { Child, ChildRelationship } from "@/features/child-profile/model/types";

import { SidebarSkeleton } from "./SidebarSkeleton";

// --- 3. SIDEBAR COMPONENT ---
export function Sidebar() {
  const { data: parentZonesRes, isLoading: isFetchingChildren } = useParentZones();

  if (isFetchingChildren) {
    return <SidebarSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed top-0 left-0 z-40 flex h-screen w-[100px] flex-col items-center bg-[#F7F7F7] py-10">
        {/* --- Top: Home --- */}
        <div className="flex w-full flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={"/dashboard"}
                className="cursor-pointer rounded-full bg-[#1B3C73] p-3 text-white transition-all"
              >
                <Home className="h-6 w-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* --- Center: User Profiles & Add Button --- */}
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
          {/* User Profiles */}
          <div className="flex flex-col gap-6">
            {parentZonesRes[0]?.parentChildren?.map((child: ChildRelationship) => (
              <Tooltip key={child.childId}>
                <TooltipTrigger asChild>
                  <Link href={`/child/${child.childId}`} className="group relative cursor-pointer">
                    <div className="rounded-full p-[2px] transition-all duration-300 group-hover:scale-110">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EEEEEE]">
                        {child.child.image ? (
                          <img
                            src={child.child.image}
                            alt={child.child.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-[#1B3C73]" />
                        )}
                      </div>
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p>{child.child.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Add Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#EEEEEE] text-[#1B3C73] transition-all">
                <Plus className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Add a new child</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* --- Bottom: Actions --- */}
        <div className="flex flex-col gap-6">
          {/* Settings */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 transition-colors hover:text-[#1B3C73]">
                <Settings className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          {/* Log Out */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 transition-colors hover:text-[#FF736A]">
                <LogOut className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
