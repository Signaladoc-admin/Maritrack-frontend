"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Input } from "@/shared/ui/input";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { PlusIcon, SquarePen, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";
import { departments, locations, users } from "./data";
import UserDetails from "./ui/UserDetails";
import { Button } from "@/shared/ui/Button/button";
import Table from "@/shared/ui/Table/Table";
import { devicesData } from "../devices/data";
import { devicesColumns } from "../devices/columns";
import EntityListItem from "./ui/EntityListItem";
import DepartmentDetails from "./ui/DepartmentDetails";
import LocationDetails from "./ui/LocationDetails";
import { useState } from "react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import AddEditUserDetailsModal from "@/features/child-profile/ui/AddEditUserDetailsModal";
import { cn } from "@/shared/lib/utils";
import AddEditDepartmentModal from "@/features/child-profile/ui/AddEditDepartmentModal";
import AddEditRoleModal from "@/features/child-profile/ui/AddEditRoleModal";
import UsersList from "./ui/UsersList";
import DepartmentsList from "./ui/DepartmentsList";
import LocationsList from "./ui/LocationsList";

function UsersPage() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [selectedTab, setSelectedTab] = useQueryState("tab", { defaultValue: "users" });
  const [selectedUserSubTab, setSelectedUserSubTab] = useQueryState("subTab", {
    defaultValue: "user-details",
  });
  const [selectedId, setSelectedId] = useQueryState("selectedId", { defaultValue: "" });
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  function handleSelectTab(tab: string) {
    setSelectedTab(tab);

    // reset other states
    setSelectedId("");
    setSelectedUserSubTab("user-details");
    setIsAddEditModalOpen(false);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[auto_1fr]">
      <CardWrapper className="bg-[#f7f7f7]">
        <div className="space-y-5">
          <TabNavigation
            className="bg-[#eee]"
            tabs={[
              { label: "Users", value: "users" },
              { label: "Departments", value: "departments" },
              { label: "Locations", value: "locations" },
            ]}
            activeTab={selectedTab}
            onTabChange={handleSelectTab}
            itemClassName="px-4"
          />
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button size="icon" onClick={() => setIsAddEditModalOpen(true)}>
              <PlusIcon color="white" />
            </Button>
          </div>
          {selectedTab === "users" && <UsersList />}
          {selectedTab === "departments" && <DepartmentsList />}
          {selectedTab === "locations" && <LocationsList />}
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
                      { label: "Associated devices", value: "associated-devices" },
                    ]}
                    activeTab={selectedUserSubTab}
                    onTabChange={setSelectedUserSubTab}
                    itemClassName="px-4"
                  />
                  <ActionButtons
                    onEdit={() => setIsAddEditModalOpen(true)}
                    onDelete={() => setIsConfirmationModalOpen(true)}
                  />
                </div>
                <div>
                  {selectedUserSubTab === "user-details" && (
                    <div>
                      <UserDetails user={users.find((user) => user.id === selectedId)!} />
                    </div>
                  )}
                  {selectedUserSubTab === "associated-devices" && (
                    <Table
                      data={devicesData.slice(0, 3)}
                      columns={devicesColumns}
                      isPaginated={false}
                    />
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
                <DepartmentDetails department={departments.find((d) => d.id === selectedId)!} />
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
                <LocationDetails location={locations.find((l) => l.id === selectedId)!} />
              </div>
            )}
          </>
        )}
      </CardWrapper>

      <AddEditUserDetailsModal
        open={selectedTab === "users" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        initialData={users.find((user) => user.id === selectedId)!}
      />
      <AddEditDepartmentModal
        open={selectedTab === "departments" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        initialData={departments.find((d) => d.id === selectedId)!}
      />
      <AddEditRoleModal
        open={selectedTab === "locations" && isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
        initialData={locations.find((location) => location.id === selectedId)!}
      />
      <ConfirmationModal
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
        title={`Are you sure you want to delete this ${selectedTab.slice(0, -1)}?`}
        description="This action cannot be undone"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {}}
      />
    </div>
  );
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onEdit} variant="secondary" size="icon" className="rounded-full p-5">
        <SquarePen className="text-primary size-4.5" />
      </Button>
      <Button onClick={onDelete} variant="secondary" size="icon" className="rounded-full p-5">
        <Trash2 className="size-4.5 text-red-500" />
      </Button>
    </div>
  );
}

export default UsersPage;
