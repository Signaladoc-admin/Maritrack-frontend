"use client";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/shared/ui/dropdown-menu";
import { Header } from "@/shared/ui/layout/header";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { DownloadCloud, ListFilter, Plus, SearchIcon, MoreHorizontal } from "lucide-react";
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
  DeviceStatus,
  StaffDevice,
  deviceKeys,
  useDevices,
  useExportDevices,
} from "@/entities/device";
import { useQueryClient } from "@tanstack/react-query";
import NewDeviceModal from "@/features/business-users/users/ui/NewDeviceModal";
import { Loader } from "@/shared/ui/loader";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useToast } from "@/shared/ui/toast";
import { BusinessRole } from "@/entities/user/model/user.schema";
import ReassignDeviceModal from "@/features/business-users/users/ui/ReassignDeviceModal";
import BulkActionBar from "@/features/business-users/users/ui/BulkActionBar";
import BulkMessageModal from "@/features/business-users/users/ui/BulkMessageModal";
import BulkActionConfirmModal from "@/features/business-users/users/ui/BulkActionConfirmModal";
import SuspendAppsModal from "@/features/business-users/users/ui/SuspendAppsModal";

export default function DevicesList() {
  const [searchQuery, setSearchQuery] = useQueryState("search", { defaultValue: "" });
  const [selectedTab, setSelectedTab] = useQueryState("assignmentStatus", { defaultValue: "ALL" });
  const [selectedFilter, setSelectedFilter] = useQueryState("deviceStatus", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const currentPage = Math.max(1, parseInt(page) || 1);

  const { data: devicesRes, isLoading: isDevicesPending } = useDevices({
    page: currentPage,
    limit: 10,
    search: debouncedSearchQuery || undefined,
    assignmentStatus: selectedTab === "ALL" ? undefined : (selectedTab as DeviceAssignmentStatus),
    deviceStatus: selectedFilter === "" ? undefined : (selectedFilter as DeviceStatus),
  });
  const devices = devicesRes?.devices || [];
  const totalPages = devicesRes?.totalPages || 1;

  const [isShowingNewDeviceModal, setIsShowingNewDeviceModal] = useState(false);

  const [isShowingAssignDeviceModal, setIsShowingAssignDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<StaffDevice | null>(null);

  const { refetch: refetchExport, isFetching: exporting } = useExportDevices({ enabled: false });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedDevices, setSelectedDevices] = useState<StaffDevice[]>([]);
  const [bulkActionMode, setBulkActionMode] = useState<"message" | "wipe" | "lock" | "unlock" | "suspend" | "unsuspend" | null>(null);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAppsModalOpen, setIsAppsModalOpen] = useState(false);
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(0);

  const handleBulkActionSelect = (mode: "message" | "wipe" | "lock" | "unlock" | "suspend" | "unsuspend") => {
    if (selectedDevices.length === 0) {
      toast({
        title: "Action Required",
        message: "select a device for this action",
        type: "error",
      });
      return;
    }
    setBulkActionMode(mode);
  };

  const handleBulkMessageClick = () => handleBulkActionSelect("message");
  const handleWipeDeviceClick = () => handleBulkActionSelect("wipe");
  const handleLockDeviceClick = () => handleBulkActionSelect("lock");
  const handleUnlockDeviceClick = () => handleBulkActionSelect("unlock");
  const handleSuspendAppsClick = () => handleBulkActionSelect("suspend");
  const handleUnsuspendAppsClick = () => handleBulkActionSelect("unsuspend");

  async function handleDeviceAssigned() {
    await Promise.all([
      selectedDevice?.id
        ? queryClient.invalidateQueries({ queryKey: deviceKeys.item(selectedDevice.id) })
        : Promise.resolve(),
      queryClient.invalidateQueries({ queryKey: deviceKeys.list({}) }),
    ]);
  }

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

  function handleNewDevice() {
    setIsShowingNewDeviceModal(true);
  }

  function handleShowToast(message: string) {
    toast({
      title: "Device Assignment",
      message,
      type: "error",
    });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex items-center justify-between gap-10">
        <Header title="Devices" subtitle="Manage your devices" className="mb-0!" />
        <Button size="sm" onClick={handleNewDevice}>
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
              <div className="relative">
                <Button
                  variant="secondary"
                  size="icon"
                  className={cn(
                    "rounded-full transition-colors",
                    selectedFilter !== "" && "bg-primary/10 text-primary hover:bg-primary/15"
                  )}
                >
                  <ListFilter />
                </Button>
                {selectedFilter !== "" && (
                  <span className="bg-primary ring-background pointer-events-none absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ring-2" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-2">
              <p className="mb-4 px-2 text-sm font-semibold">Filter By:</p>
              <div className="space-y-1">
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("")}
                  className={cn(
                    "flex items-center gap-2",
                    selectedFilter === "" &&
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="h-10 w-[64px] rounded-full flex items-center justify-center border-none">
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Messaging</DropdownMenuLabel>
                <DropdownMenuItem className="py-2" onClick={handleBulkMessageClick}>Bulk message</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">General Actions</DropdownMenuLabel>
                <DropdownMenuItem className="py-2" onClick={handleWipeDeviceClick}>Wipe device</DropdownMenuItem>
                <DropdownMenuItem className="py-2" onClick={handleLockDeviceClick}>Lock device</DropdownMenuItem>
                <DropdownMenuItem className="py-2" onClick={handleUnlockDeviceClick}>Unlock device</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="my-1" />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">App Management</DropdownMenuLabel>
                <DropdownMenuItem className="py-2" onClick={handleSuspendAppsClick}>Suspend apps</DropdownMenuItem>
                <DropdownMenuItem className="py-2" onClick={handleUnsuspendAppsClick}>Unsuspend apps</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {bulkActionMode && (
        <BulkActionBar
          selectedCount={selectedDevices.length}
          totalCount={devices.length}
          title={
            bulkActionMode === "message" ? "Send Bulk Messages" :
            bulkActionMode === "wipe" ? "Wipe Devices" :
            bulkActionMode === "lock" ? "Lock devices" : 
            bulkActionMode === "unlock" ? "Unlock devices" :
            bulkActionMode === "suspend" ? "Suspend apps" : "Unsuspend apps"
          }
          buttonText={
            bulkActionMode === "message" ? "Proceed to Compose Message" :
            bulkActionMode === "wipe" ? "Wipe Devices" :
            bulkActionMode === "lock" ? "Lock Devices" : 
            bulkActionMode === "unlock" ? "Unlock Devices" :
            bulkActionMode === "suspend" ? "Suspend Apps" : "Unsuspend Apps"
          }
          variant={["message", "unlock", "unsuspend"].includes(bulkActionMode as string) ? "default" : "destructive"}
          onProceed={() => {
            if (bulkActionMode === "message") setIsComposeModalOpen(true);
            else if (bulkActionMode === "suspend" || bulkActionMode === "unsuspend") setIsAppsModalOpen(true);
            else setIsConfirmModalOpen(true);
          }}
          onCancel={() => {
            setBulkActionMode(null);
            setSelectedDevices([]);
            setClearSelectionTrigger(prev => prev + 1);
          }}
        />
      )}

      <DevicesTable
        data={devices}
        columns={getDevicesColumns(
          handleAssignDevice,
          user?.businessRole as BusinessRole,
          handleShowToast
        )}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isDevicesPending}
        selectable={true}
        onRowSelect={(selected) => setSelectedDevices(selected as StaffDevice[])}
        clearSelectionTrigger={clearSelectionTrigger}
      />

      <NewDeviceModal open={isShowingNewDeviceModal} onOpenChange={setIsShowingNewDeviceModal} />

      <ReassignDeviceModal
        open={isShowingAssignDeviceModal}
        onOpenChange={setIsShowingAssignDeviceModal}
        selectedDevice={selectedDevice!}
        type="ASSIGN"
        refetch={handleDeviceAssigned}
      />

      <BulkMessageModal
        open={isComposeModalOpen}
        onOpenChange={setIsComposeModalOpen}
        selectedDevices={selectedDevices}
        onSuccess={() => {
          setBulkActionMode(null);
          setSelectedDevices([]);
          setClearSelectionTrigger(prev => prev + 1);
        }}
      />
      {bulkActionMode && ["wipe", "lock", "unlock"].includes(bulkActionMode) && (
        <BulkActionConfirmModal
          open={isConfirmModalOpen}
          onOpenChange={setIsConfirmModalOpen}
          selectedDevices={selectedDevices}
          actionType={bulkActionMode as "wipe" | "lock" | "unlock"}
          onSuccess={() => {
            setBulkActionMode(null);
            setSelectedDevices([]);
            setClearSelectionTrigger(prev => prev + 1);
          }}
        />
      )}
      {bulkActionMode && ["suspend", "unsuspend"].includes(bulkActionMode) && (
        <SuspendAppsModal
          open={isAppsModalOpen}
          onOpenChange={setIsAppsModalOpen}
          selectedDevices={selectedDevices}
          actionType={bulkActionMode as "suspend" | "unsuspend"}
          onSuccess={() => {
            setBulkActionMode(null);
            setSelectedDevices([]);
            setClearSelectionTrigger(prev => prev + 1);
          }}
        />
      )}
    </div>
  );
}
