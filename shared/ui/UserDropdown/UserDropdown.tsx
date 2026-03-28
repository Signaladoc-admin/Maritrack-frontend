"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select/Select"; // Ensure you have the select component created previously
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { cn } from "@/lib/utils";

export interface UserOption {
  id: string;
  name: string;
  image?: string; // URL to image
  email?: string; // Optional subtitle
}

interface UserSelectProps {
  users: UserOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function UserSelect({
  users,
  value,
  onChange,
  placeholder = "Select a user...",
  className,
  label,
}: UserSelectProps) {
  // Helper to find the currently selected user object to display in Trigger
  const selectedUser = users.find((u) => u.id === value);

  return (
    <div className={cn("w-full space-y-2", className)}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-14 w-full rounded-full border-none bg-[#F7F7F7] focus:ring-[#1B3C73]">
          {selectedUser ? (
            // CUSTOM TRIGGER VIEW (When a user is selected)
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-[#EEEEEE]">
                <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
                <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-semibold text-[#1B3C73]">{selectedUser.name}</span>
              </div>
            </div>
          ) : (
            // PLACEHOLDER VIEW
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </SelectTrigger>

        <SelectContent className="rounded-[20px] border-none shadow">
          {users.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id}
              className="cursor-pointer rounded-full py-3 focus:bg-[#1B3C73]/5 focus:text-[#1B3C73]"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
