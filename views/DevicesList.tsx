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
    <section className="page active" id="page-devices">
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <h1>Devices</h1>
            <p>Manage every device financed, leased, or issued to your fleet.</p>
          </div>
          <button className="btn-primary cursor-pointer" onClick={handleNewDevice}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>
            New device
          </button>
        </div>
      </div>

      <div className="surface table-panel">
        <div className="table-head-row">
          <div className="tabs">
            <button
              className={cn("tab", selectedTab === "ALL" && "active")}
              onClick={() => setSelectedTab("ALL")}
            >
              All assets
            </button>
            <button
              className={cn("tab", selectedTab === "RETURNED" && "active")}
              onClick={() => setSelectedTab("RETURNED")}
            >
              Damaged & returned
            </button>
          </div>

          <div className="toolbar-right">
            <div className="search-wrap toolbar-search">
              <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              <input
                type="text"
                placeholder="Search devices"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="dropdown-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="icon-btn-square cursor-pointer" aria-label="Filter devices">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M7 12h10M10 18h4"/></svg>
                    {selectedFilter !== "" && <span className="filter-dot"></span>}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 p-2">
                  <p className="mb-4 px-2 text-sm font-semibold">Filter By:</p>
                  <div className="space-y-1">
                    <DropdownMenuItem
                      onClick={() => setSelectedFilter("")}
                      className={cn("flex items-center gap-2", selectedFilter === "" && "bg-primary text-white")}
                    >
                      All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedFilter("ACTIVE")}
                      className={cn("flex items-center gap-2", selectedFilter === "ACTIVE" && "bg-primary text-white")}
                    >
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedFilter("INACTIVE")}
                      className={cn("flex items-center gap-2", selectedFilter === "INACTIVE" && "bg-primary text-white")}
                    >
                      Inactive
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <button
              onClick={handleExport}
              className="icon-btn-square cursor-pointer flex items-center justify-center"
              disabled={exporting}
              aria-label="Export devices"
            >
              {exporting ? <Loader /> : <DownloadCloud size={16} />}
            </button>

            <div className="dropdown-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="icon-btn-square cursor-pointer" aria-label="Bulk actions">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Messaging</DropdownMenuLabel>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleBulkMessageClick}>Bulk message</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">General Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleWipeDeviceClick}>Wipe device</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleLockDeviceClick}>Lock device</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleUnlockDeviceClick}>Unlock device</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">App Management</DropdownMenuLabel>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleSuspendAppsClick}>Suspend apps</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 cursor-pointer" onClick={handleUnsuspendAppsClick}>Unsuspend apps</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
      </div>

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
    </section>
  );
}
