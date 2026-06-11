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
import { getDevicesColumns } from "@/features/device/columns";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import DevicesTable from "@/features/business-users/users/ui/DevicesTable";
import { Input } from "@/shared/ui/input";
import {
  DeviceAssignmentStatus,
  StaffDevice,
  useDevices,
  useExportDevices,
} from "@/entities/device";
import NewDeviceModal from "@/features/business-users/users/ui/NewDeviceModal";
import { Loader } from "@/shared/ui/loader";

export default function DevicesList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" });
  const [selectedTab, setSelectedTab] = useQueryState("assignmentStatus", { defaultValue: "ALL" });
  const [selectedFilter, setSelectedFilter] = useQueryState("filter", { defaultValue: "ALL" });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const currentPage = Math.max(1, parseInt(page) || 1);

  const { data: devicesRes, isLoading: isDevicesPending } = useDevices({
    page: currentPage,
    limit: 10,
    search: debouncedSearchQuery || undefined,
    assignmentStatus: selectedTab === "ALL" ? undefined : (selectedTab as DeviceAssignmentStatus),
  });
  const devices = devicesRes?.devices || [];
  const totalPages = devicesRes?.totalPages || 1;

  const [isShowingAssignDeviceModal, setIsShowingAssignDeviceModal] = useState(false);
  const [_, setSelectedDevice] = useState<StaffDevice | null>(null);

  const { refetch: refetchExport, isFetching: exporting } = useExportDevices({ enabled: false });

  async function handleExport() {
    const result = await refetchExport();
    const link = result.data?.data?.link;
    if (!link) return;
    const a = document.createElement("a");
    a.href = link;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handlePageChange(page: number) {
    setPage(String(page));
  }

  function handleAssignDevice(device: StaffDevice) {
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
            { label: "Damaged & returned assets", value: "RETURNED" },
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
          <Button
            onClick={handleExport}
            variant="secondary"
            size="icon"
            className="rounded-full"
            disabled={exporting}
          >
            {exporting ? <Loader /> : <DownloadCloud />}
          </Button>
        </div>
      </div>

      <DevicesTable
        data={devices}
        columns={getDevicesColumns(handleAssignDevice)}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isDevicesPending}
      />

      <NewDeviceModal
        open={isShowingAssignDeviceModal}
        onOpenChange={setIsShowingAssignDeviceModal}
      />
    </div>
  );
}
