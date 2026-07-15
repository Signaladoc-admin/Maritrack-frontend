import React from "react";
import { Search, SlidersHorizontal, DownloadCloud, MoreHorizontal } from "lucide-react";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/shared/ui/dropdown-menu";

interface BusinessDevicesToolbarProps {
  activeTab: string;
  onTabChange: (val: string) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  tabs: { label: string; value: string }[];
}

export const BusinessDevicesToolbar: React.FC<BusinessDevicesToolbarProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  tabs,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className="w-full md:w-auto"
      />

      <div className="flex items-center gap-3 w-full md:w-auto">
        <Input
          placeholder="Search here"
          iconLeft={<Search className="size-4 text-gray-400" />}
          className="w-full md:w-[320px] h-12 bg-[#F9FAFB] border-none"
          wrapperClassName="gap-0"
          value={searchQuery}
          onValueChange={onSearchChange}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-[#F9FAFB] border-none">
              <SlidersHorizontal className="size-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => {}}>Asset Name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>IMEI Number</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Serial Number</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>MAC Address</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-[#F9FAFB] border-none">
          <DownloadCloud className="size-5 text-gray-600" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-12 w-12 rounded-xl bg-[#F9FAFB] hover:bg-gray-100 border-none">
              <MoreHorizontal className="size-6 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Messaging</DropdownMenuLabel>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Bulk message</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">General Actions</DropdownMenuLabel>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Wipe device</DropdownMenuItem>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Lock device</DropdownMenuItem>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Unlock device</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Suspensions</DropdownMenuLabel>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Suspend app</DropdownMenuItem>
              <DropdownMenuItem className="py-2" onClick={() => {}}>Unsuspend app</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
