"use client";

import React from "react";
import { Search, Plus, User } from "lucide-react";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { cn } from "@/shared/lib/utils";

export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
}

interface UserListProps {
  items: ListItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const UserList: React.FC<UserListProps> = ({
  items,
  selectedId,
  onSelect,
  onAdd,
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { label: "Users", value: "users" },
    { label: "Departments", value: "departments" },
    { label: "Locations", value: "locations" },
  ];

  const searchPlaceholder = `Search for a ${activeTab.slice(0, -1)}`;

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-3xl bg-[#F9FAFB] p-4 md:w-[320px]">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="rounded-2xl bg-gray-100 p-1"
      />

      <div className="flex items-center gap-2">
        <Input
          placeholder={searchPlaceholder}
          iconLeft={<Search className="size-4 text-gray-400" />}
          className="h-11 flex-1 rounded-xl border bg-white"
          wrapperClassName="gap-0"
          value={searchQuery}
          onValueChange={onSearchChange}
        />
        <Button
          size="icon"
          onClick={onAdd}
          className="h-11 w-11 rounded-xl bg-[#1B3C73] shadow-none hover:bg-[#152e5a]"
        >
          <Plus className="size-5" />
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "group flex items-center gap-4 rounded-2xl p-3 text-left transition-all",
              selectedId === item.id
                ? "border border-[#1B3C73]"
                : "border border-transparent hover:bg-white/50"
            )}
          >
            <Avatar className="h-12 w-12 bg-gray-200">
              <AvatarImage src={item.avatar} />
              <AvatarFallback className="bg-gray-100 text-[#1B3C73]">
                <User className="size-4 opacity-50" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 transition-colors group-hover:text-[#1B3C73]">
                {item.title}
              </span>
              <span className="text-xs text-gray-400">{item.id}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
