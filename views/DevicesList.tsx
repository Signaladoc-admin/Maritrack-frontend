"use client";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Header } from "@/shared/ui/layout/header";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { DownloadCloud, ListFilter, Plus, SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getDevicesColumns } from "@/app/(in-app)/devices/columns";
import { Device } from "@/app/(in-app)/devices/types";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import DevicesTable from "@/features/business-users/users/ui/DevicesTable";
import AssignDeviceModal from "@/features/business-users/users/ui/AssignDeviceModal";
import { Input } from "@/shared/ui/input";
import useGetDevices from "@/entities/business/model/useDevices";

export default function DevicesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" });
  const [selectedTab, setSelectedTab] = useQueryState("tab", { defaultValue: "ALL" });
  const [selectedFilter, setSelectedFilter] = useQueryState("filter", { defaultValue: "ALL" });
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { devices, numPages, totalElements } = useGetDevices();

  console.log(devices);

  function handleSelectDevice(device: Device) {
    router.push(`/devices/${device.id}`);
  }

  // const filteredDevices = useMemo(() => {
  //   let result = devicesData;

  //   if (selectedFilter === "ACTIVE") {
  //     result = result.filter((device) => device.status === "ACTIVE");
  //   } else if (selectedFilter === "INACTIVE") {
  //     result = result.filter((device) => device.status === "INACTIVE");
  //   }

  //   if (debouncedSearchQuery) {
  //     result = result.filter((device) =>
  //       device.model.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  //     );
  //   }

  //   if (selectedTab === "DAMAGED_RETURNED") {
  //     result = result.filter(
  //       (device) => device.condition === "DAMAGED" || device.condition === "RETURNED"
  //     );
  //   } else if (selectedTab === "GOOD") {
  //     result = result.filter((device) => device.condition === "GOOD");
  //   }

  //   return result;
  // }, [selectedFilter, debouncedSearchQuery, selectedTab]);

  const [isShowingAssignDeviceModal, setIsShowingAssignDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  function handleAssignDevice(device: Device) {
    console.log("device", device);
    setIsShowingAssignDeviceModal(true);
    setSelectedDevice(device);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex items-center justify-between gap-10">
        <Header title="Devices" subtitle="Manage your devices" className="mb-0!" />
        <Button size="sm" onClick={() => setIsShowingAssignDeviceModal(true)}>
          <Plus size={16} />
          New device
        </Button>
      </div>
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <TabNavigation
          className="w-fit"
          tabs={[
            { label: "All assets", value: "ALL" },
            { label: "Damaged & returned assets", value: "DAMAGED_RETURNED" },
            // { label: "Good condition assets", value: "GOOD" },
          ]}
          activeTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
        <div className="flex items-center gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            iconLeft={<SearchIcon size={16} className="text-gray-500" />}
            placeholder="Search devices"
            className="h-11!"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <ListFilter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-2">
              <p className="mb-4 px-2 text-sm font-semibold">Filter By:</p>
              <div className="space-y-1">
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("ALL")}
                  className={cn(
                    "flex items-center gap-2",
                    selectedFilter === "ALL" &&
                      "bg-primary hover:bg-primary! text-white hover:text-white!"
                  )}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("ACTIVE")}
                  className={cn(
                    "flex items-center gap-2",
                    selectedFilter === "ACTIVE" &&
                      "bg-primary hover:bg-primary! text-white hover:text-white!"
                  )}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("INACTIVE")}
                  className={cn(
                    "flex items-center gap-2",
                    selectedFilter === "INACTIVE" &&
                      "bg-primary hover:bg-primary! text-white hover:text-white!"
                  )}
                >
                  Inactive
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary" size="icon" className="rounded-full">
            <DownloadCloud />
          </Button>
        </div>
      </div>

      <DevicesTable data={devices} columns={getDevicesColumns(handleAssignDevice)} />

      <AssignDeviceModal
        open={isShowingAssignDeviceModal}
        onOpenChange={setIsShowingAssignDeviceModal}
      />
    </div>
  );
}
