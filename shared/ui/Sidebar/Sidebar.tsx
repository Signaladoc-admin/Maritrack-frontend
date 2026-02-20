"use client";

import * as React from "react";
import { Home, Settings, LogOut, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../Tooltip/Tooltip";

// --- 2. DUMMY DATA ---
const childrenProfiles = [
  {
    id: "1",
    name: "Mide",
    status: "active",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "David",
    status: "locked",
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: "3",
    name: "New User",
    status: "active",
    image: "", // Empty to test fallback
  },
];

// --- 3. SIDEBAR COMPONENT ---
export function Sidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed left-0 top-0 z-40 flex h-screen w-[100px] flex-col items-center bg-[#F7F7F7] py-10">
        {/* --- Top: Home --- */}
        <div className="flex w-full flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="cursor-pointer rounded-full bg-[#C5D5F1] p-3 text-[#1B3C73] transition-all">
                <Home className="h-6 w-6" />
              </button>
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
            {childrenProfiles.map((child) => (
              <Tooltip key={child.id}>
                <TooltipTrigger asChild>
                  <button className="group relative cursor-pointer">
                    <div className="rounded-full p-[2px] transition-all duration-300 group-hover:scale-110">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EEEEEE]">
                        {child.image ? (
                          <img
                            src={child.image}
                            alt={child.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-[#1B3C73]" />
                        )}
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p>{child.name}</p>
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
