"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Input } from "@/shared/ui/input";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { PlusIcon, QrCode, SquarePen, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";
import UserDetails from "@/features/business-users/users/ui/UserDetails";
import { Button } from "@/shared/ui/Button/button";
import DepartmentDetails from "@/features/business-users/departments/ui/DepartmentDetails";
import LocationDetails from "@/features/business-users/locations/ui/LocationDetails";
import { useState, useEffect } from "react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import AddEditUserDetailsModal from "@/features/business-users/users/ui/AddEditUserDetailsModal";
import { cn } from "@/shared/lib/utils";
import AddEditDepartmentModal from "@/features/business-users/departments/ui/AddEditDepartmentModal";
import UsersList from "@/features/business-users/users/ui/UsersList";
import DepartmentsList from "@/features/business-users/departments/ui/DepartmentsList";
import LocationsList from "@/features/business-users/locations/ui/LocationsList";
import { useDeleteUser } from "@/features/user-management/model/useUserManagement";
import { useDeleteDepartment } from "@/features/business-users/departments/model/useDepartments";
import { useToast } from "@/shared/ui/toast";
import AddEditLocationModal from "@/features/business-users/locations/ui/AddEditLocationModal";
import { useDeleteLocation } from "@/features/business-users/locations/model/useLocations";
import { useDebounce } from "use-debounce";
import AssociatedDevicesTable from "@/features/business-users/users/ui/AssociatedDevicesTable";
import { useSearchParams } from "next/navigation";
import BusinessUserPairingQR from "@/features/business-users/users/ui/BusinessUserPairingQR";
import { Dialog, DialogContent } from "@/shared/ui/Modal/dialog";
import { useIsOrganizationAdmin } from "@/features/business-users/users/model/useIsOrganizationAdmin";
import Pagination from "@/shared/ui/Table/Pagination";
import { useGetFullBusinessDetails } from "@/features/onboarding/business/model/useGetBusinessDetails";

function ActionButtons({
  onOpenQrPairing,
  onEdit,
  onDelete,
}: {
  onOpenQrPairing?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onEdit} variant="secondary" size="icon" className="rounded-full p-5">
        <SquarePen className="text-primary size-4.5" />
      </Button>
      {/* {isOrganizationAdmin && ( */}
      <Button onClick={onDelete} variant="secondary" size="icon" className="rounded-full p-5">
        <Trash2 className="size-4.5 text-red-500" />
      </Button>
      {/* )} */}
    </div>
  );
}

export default function Users() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [currentPage, setCurrentPage] = useQueryState("currentPage", {
    defaultValue: 1,
    parse: (value) => Number(value),
  });

  const [debouncedSearchTerm] = useDebounce(search, 1000);
  const [selectedTab, setSelectedTab] = useQueryState("tab", { defaultValue: "users" });
  const [selectedTabTotalPages, setSelectedTabTotalPages] = useState(0);

  const [selectedUserSubTab, setSelectedUserSubTab] = useQueryState("subTab", {
    defaultValue: "user-details",
  });
  const [selectedId, setSelectedId] = useQueryState("selectedId", { defaultValue: "" });

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [showQrPairing, setShowQrPairing] = useState(false);

  const { business, isLoadingBusiness, isLoadingBusinessProfile } = useGetFullBusinessDetails();
  // Reset QR view whenever the selected user or sub-tab changes
  useEffect(() => {
    setShowQrPairing(false);
  }, [selectedId, selectedUserSubTab]);

  const isDeviceFinance = (business?.profile as any)?.type === "DEVICE_FINANCING";

  const availableTabs = isDeviceFinance
    ? [
        { label: "Users", value: "users" },
      ]
    : [
        { label: "Users", value: "users" },
        { label: "Departments", value: "departments" },
        { label: "Locations", value: "locations" },
      ];

  // Deletion api hooks
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();
  const { mutateAsync: deleteDepartment, isPending: isDeletingDepartment } = useDeleteDepartment();
  const { mutateAsync: deleteLocation, isPending: isDeletingLocation } = useDeleteLocation();

  const { toast } = useToast();

  function handleSelectTab(tab: string) {
    setSelectedTab(tab);
    setSelectedId("");
    setSelectedUserSubTab("user-details");
    setIsAddEditModalOpen(false);
    setSearch("");
    setCurrentPage(1);
  }

  const handleDeleteTabItem = async () => {
    const capitalizedTabName = `${selectedTab?.charAt(0).toUpperCase() + selectedTab?.slice(1)}`;
    const itemName = capitalizedTabName?.slice(0, -1);

    try {
      if (selectedTab === "users") {
        await deleteUser(selectedId);
      } else if (selectedTab === "departments") {
        await deleteDepartment(selectedId);
      } else if (selectedTab === "locations") {
        await deleteLocation(selectedId);
      }

      toast({
        type: "success",
        title: "Success",
        message: `${itemName} deleted successfully`,
      });
    } catch (error: any) {
      toast({
        type: "error",
        title: "Error",
        message: error?.message || `Failed to delete ${itemName}`,
      });
    } finally {
      setIsConfirmationModalOpen(false);
      setSelectedId("");
    }
  };

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr]">
      <CardWrapper className="bg-[#f7f7f7]">
        <div className="space-y-5">
          <TabNavigation
            className="bg-[#eee]"
            tabs={availableTabs}
            activeTab={selectedTab}
            onTabChange={handleSelectTab}
            itemClassName="px-4"
          />
          <div className="flex items-center gap-2">
            <Input className="h-10!" placeholder="Search" value={search} onChange={handleSearch} />
            <Button
              className="h-10 w-10 shrink-0 rounded-xl"
              onClick={() => {
                setIsAddEditModalOpen(true);
                setSelectedId("");
              }}
            >
              <PlusIcon color="white" className="size-5" />
            </Button>
          </div>
          {selectedTab === "users" && (
            <UsersList
              searchTerm={debouncedSearchTerm.trim()}
              currentPage={currentPage}
              setSelectedTabTotalPages={setSelectedTabTotalPages}
            />
          )}
          {selectedTab === "departments" && (
            <DepartmentsList
              searchTerm={debouncedSearchTerm.trim()}
              currentPage={currentPage}
              setSelectedTabTotalPages={setSelectedTabTotalPages}
            />
          )}
          {selectedTab === "locations" && (
            <LocationsList
              searchTerm={debouncedSearchTerm.trim()}
              currentPage={currentPage}
              setSelectedTabTotalPages={setSelectedTabTotalPages}
            />
          )}
          <Pagination
            className="border-none p-0!"
            currentPage={currentPage}
            totalPages={selectedTabTotalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </CardWrapper>
      <CardWrapper className={cn(selectedId ? "" : "hidden md:block")}>
        {selectedId && (
          <>
            {selectedTab === "users" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <TabNavigation
                    className="w-fit bg-[#eee]"
                    tabs={[
                      { label: "User details", value: "user-details" },
                      { label: "Associated device", value: "associated-device" },
                    ]}
                    activeTab={selectedUserSubTab}
                    onTabChange={setSelectedUserSubTab}
                    itemClassName="px-4"
                  />
                  <ActionButtons
                    onOpenQrPairing={() => setShowQrPairing(true)}
                    onEdit={() => setIsAddEditModalOpen(true)}
                    onDelete={() => setIsConfirmationModalOpen(true)}
                  />
                </div>
                <div>
                  {selectedUserSubTab === "user-details" && (
                    <UserDetails selectedId={selectedId!} />
                  )}
                  {selectedUserSubTab === "associated-device" && (
                    <AssociatedDevicesTable staffId={selectedId!} />
                  )}
                </div>
              </div>
            )}
            {selectedTab === "departments" && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <ActionButtons
                    onEdit={() => setIsAddEditModalOpen(true)}
                    onDelete={() => setIsConfirmationModalOpen(true)}
                  />
                </div>
                <DepartmentDetails departmentId={selectedId} />
              </div>
            )}
            {selectedTab === "locations" && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <ActionButtons
                    onEdit={() => setIsAddEditModalOpen(true)}
                    onDelete={() => setIsConfirmationModalOpen(true)}
                  />
                </div>
                <LocationDetails locationId={selectedId!} />
              </div>
            )}
          </>
        )}
      </CardWrapper>

      <AddEditUserDetailsModal
        open={selectedTab === "users" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        selectedId={selectedId}
      />
      <AddEditDepartmentModal
        open={selectedTab === "departments" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        selectedId={selectedId}
      />
      <AddEditLocationModal
        open={selectedTab === "locations" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        selectedId={selectedId}
      />
      <Dialog open={showQrPairing} onOpenChange={setShowQrPairing}>
        <DialogContent className="max-w-md">
          {selectedId && (
            <BusinessUserPairingQR
              staffId={selectedId}
              onBack={() => setShowQrPairing(false)}
              onComplete={() => setShowQrPairing(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
        title={`Are you sure you want to delete this ${selectedTab.slice(0, -1)}?`}
        description="This action cannot be undone"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteTabItem}
        loading={
          selectedTab === "users"
            ? isDeletingUser
            : selectedTab === "departments"
              ? isDeletingDepartment
              : selectedTab === "locations"
                ? isDeletingLocation
                : false
        }
      />
    </div>
  );
}
