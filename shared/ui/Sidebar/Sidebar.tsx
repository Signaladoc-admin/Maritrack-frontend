"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Plus, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { ProfilePopover } from "./ProfilePopover";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { Child } from "@/features/child-profile/model/types";
import { useRecentChildren } from "@/shared/hooks/useRecentChildren";
import { useParentStore } from "@/shared/stores/user.store";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isAppCollapsed?: boolean;
  setIsAppCollapsed?: (collapsed: boolean) => void;
}

export function Sidebar(_props?: SidebarProps) {
  const { data: parentChildren, isLoading: isFetchingChildren } = useParentChildren();
  const { recentIds, push: pushRecentChild } = useRecentChildren();
  const { selectedChildId, setSelectedChildId } = useParentStore();
  const pathname = usePathname();
  const router = useRouter();

  const childrenList: Child[] = parentChildren?.data ?? [];
  const hasMore = childrenList.length > 5;

  const visibleChildren = useMemo(() => {
    const recent = recentIds
      .map((id) => childrenList.find((c) => c.id === id))
      .filter(Boolean) as Child[];
    const rest = childrenList.filter((c) => !recentIds.includes(c.id));
    return [...recent, ...rest].slice(0, 5);
  }, [childrenList, recentIds]);

  const handleChildClick = (e: React.MouseEvent, childId: string) => {
    setSelectedChildId(childId);
    pushRecentChild(childId);
    if (pathname === "/dashboard") {
      e.preventDefault();
    } else if (!pathname.startsWith("/child/")) {
      e.preventDefault();
      router.push("/dashboard");
