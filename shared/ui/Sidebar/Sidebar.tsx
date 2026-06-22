"use client";

import { Home, Plus, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "../Tooltip/Tooltip";
import Link from "next/link";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { ProfilePopover } from "./ProfilePopover";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { Child } from "@/features/child-profile/model/types";
import { useRecentChildren } from "@/shared/hooks/useRecentChildren";
import { useMemo } from "react";

export function Sidebar() {
  const { data: parentChildren, isLoading: isFetchingChildren } = useParentChildren();
  const { recentIds } = useRecentChildren();

  const visibleChildren = useMemo(() => {
    const all: Child[] = parentChildren?.data ?? [];
    const recent = recentIds
      .map((id) => all.find((c) => c.id === id))
      .filter(Boolean) as Child[];
    const rest = all.filter((c) => !recentIds.includes(c.id));
    return [...recent, ...rest].slice(0, 5);
  }, [parentChildren?.data, recentIds]);

  const hasMore = (parentChildren?.data?.length ?? 0) > 5;

  if (isFetchingChildren) {
    return <SidebarSkeleton />;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed top-0 left-0 z-40 flex h-screen w-[100px] flex-col items-center bg-[#F7F7F7] py-10">
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

        <div className="flex w-full flex-1 flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-6">
            {visibleChildren.map((child) => (
              <Tooltip key={child.id}>
                <TooltipTrigger asChild>
                  <Link href={`/child/${child.id}`} className="group relative cursor-pointer">
                    <div className="rounded-full p-[2px] transition-all duration-300 group-hover:scale-110">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#EEEEEE]">
                        {child.imageUrl ? (
                          <img
                            src={child.imageUrl}
                            alt={child.name}
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
                  <p>{child.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {hasMore && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/children"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEEEEE] text-xs font-medium text-[#1B3C73] transition-all hover:scale-110"
                  >
                    +{(parentChildren?.data?.length ?? 0) - 5}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p>View all children</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={"/children/add"}>
                <button className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#EEEEEE] text-[#1B3C73] transition-all">
                  <Plus className="h-5 w-5" />
                </button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>Add a new child</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="mt-auto mb-10 flex flex-col items-center">
          <ProfilePopover />
        </div>
      </div>
    </TooltipProvider>
  );
}
