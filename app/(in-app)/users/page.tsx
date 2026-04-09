"use client";

import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Input } from "@/shared/ui/input";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { PlusIcon, SquarePen, Trash2, User } from "lucide-react";
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

function UsersPage() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [activeTab, setActiveTab] = useQueryState("tab", { defaultValue: "users" });
  const [selectedUserSubTab, setSelectedUserSubTab] = useQueryState("subTab", {
    defaultValue: "user-details",
  });
  const [selectedId, setSelectedId] = useQueryState("selectedId", { defaultValue: "" });

  function handleSelectTab(tab: string) {
    setActiveTab(tab);
    setSelectedId("");
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
            activeTab={activeTab}
            onTabChange={handleSelectTab}
            itemClassName="px-4"
          />
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button size="icon">
              <PlusIcon color="white" />
            </Button>
          </div>
          {activeTab === "users" && (
            <div className="space-y-1">
              {users.map((user) => (
                <EntityListItem
                  key={user.id}
                  id={user.id}
                  title={`${user.firstName} ${user.lastName}`}
                  subtitle={user.email}
                />
              ))}
            </div>
          )}
          {activeTab === "departments" && (
            <div className="space-y-1">
              {departments.map((department) => (
                <EntityListItem
                  key={department.id}
                  id={department.id}
                  title={department.name}
                  subtitle={department.description}
                />
              ))}
            </div>
          )}
          {activeTab === "locations" && (
            <div className="space-y-1">
              {locations.map((location) => (
                <EntityListItem
                  key={location.id}
                  id={location.id}
                  title={location.name}
                  subtitle={location.description}
                />
              ))}
            </div>
          )}
        </div>
      </CardWrapper>
      <CardWrapper>
        {selectedId && (
          <>
            {activeTab === "users" && (
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
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="icon" className="rounded-full p-5">
                      <SquarePen className="text-primary size-4.5" />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full p-5">
                      <Trash2 className="size-4.5 text-red-500" />
                    </Button>
                  </div>
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
            {activeTab === "departments" && (
              <DepartmentDetails department={departments.find((d) => d.id === selectedId)!} />
            )}
            {activeTab === "locations" && (
              <LocationDetails location={locations.find((l) => l.id === selectedId)!} />
            )}
          </>
        )}
      </CardWrapper>
    </div>
  );
}

export default UsersPage;
