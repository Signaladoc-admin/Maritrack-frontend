"use client";

import { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useParentStore } from "@/shared/stores/user.store";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useParentChildren } from "@/entities/children/model/useChildren";

export function ChildrenDropdown() {
  const { children, selectedChildId, setSelectedChildId, setChildren } = useParentStore();

  const { data: parentChildren, isFetching: isFetchingChildren } = useParentChildren();

  useEffect(() => {
    if (parentChildren?.data) {
      // Map server data to shop-store Child interface if necessary
      setChildren(parentChildren.data);

      // Ensure a child is selected by default
      if ((selectedChildId === "all" || !selectedChildId) && parentChildren.data.length > 0) {
        setSelectedChildId(parentChildren.data[0].id);
      }
    }
  }, [parentChildren, setChildren, selectedChildId, setSelectedChildId]);

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
          className="flex h-auto cursor-pointer items-center gap-3 rounded-full border border-[var(--card-line)] bg-[var(--card-fill)] py-1.5 pr-4 pl-1.5 shadow-none transition-all hover:border-[var(--card-line-strong)] hover:bg-[var(--card-hover)] focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)]">
            <Avatar className="h-full w-full">
              <AvatarImage src={selectedChild?.imageUrl || ""} alt={selectedChild?.name} />
              <AvatarFallback className="bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                {selectedChild?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-1 items-center justify-between gap-2.5">
            <span className="text-sm font-bold text-[var(--text-1)]">
              {isFetchingChildren
                ? "Loading..."
                : isAllSelected
                  ? children?.[0]?.name || "No Children"
                  : selectedChild?.name || "Select Child"}
            </span>
            <ChevronDown className="h-4 w-4 text-[var(--text-2)] transition-transform duration-200" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-1.5 shadow-none"
      >
        {children?.map((child) => {
          const isSelected = selectedChildId === child.id;
          return (
            <DropdownMenuItem
              key={child.id}
              onSelect={() => handleSelect(child.id)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--card-hover)] focus:bg-[var(--card-hover)]",
                isSelected && "bg-[var(--accent-tint)] focus:bg-[var(--accent-tint)]"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={child.imageUrl || ""} alt={child.name} />
                  <AvatarFallback className="bg-[var(--accent-tint)] text-xs font-bold text-[var(--accent)]">
                    {child.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isSelected ? "font-bold text-[var(--accent)]" : "text-[var(--text-1)]"
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
