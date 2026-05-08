"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import { UserInfo } from "@/entities/user";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { UserAssociatedDevicesTable } from "./UserAssociatedDevicesTable";
import { MOCK_ASSETS } from "@/entities/device";

interface UserDetailsProps {
  user: UserInfo | null;
  onEditUser: () => void;
  onDeleteUser: () => void;
}

interface DetailItem {
  label: string;
  value: string | undefined;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, onEditUser, onDeleteUser }) => {
  const [activeTab, setActiveTab] = React.useState("details");
  const [selectedDeviceIds, setSelectedDeviceIds] = React.useState<string[]>([]);

  if (!user)
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-50 text-gray-400">
        Select a user to view details
      </div>
    );

  const tabs = [
    { label: "User details", value: "details" },
    { label: "Associated devices", value: "devices" },
  ];

  const detailGrid: DetailItem[] = [
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Department", value: user.department },
    { label: "Location", value: user.location },
    { label: "Cell Number", value: user.phoneNumber },
    { label: "Email", value: user.email },
    { label: "Address", value: user.address },
    { label: "State", value: user.state },
    { label: "City", value: user.city },
    { label: "Postal code", value: user.postalCode },
    { label: "Country", value: user.country },
    { label: "Zone", value: user.zone },
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-6 rounded-3xl bg-gray-50 p-6">
      <div className="flex items-center justify-between">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="rounded-2xl bg-gray-100 p-1 md:w-auto"
        />
        <div className="flex items-center gap-3">
          <button
            onClick={onEditUser}
            className="rounded-full bg-white p-3 text-[#1B3C73] transition-colors hover:bg-gray-100"
          >
            <Edit2 className="size-5" />
          </button>
          <button
            onClick={onDeleteUser}
            className="rounded-full bg-white p-3 text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-5" />
          </button>
        </div>
      </div>

      <CardWrapper
        variant="outline"
        padding="none"
        className="flex flex-1 flex-col overflow-hidden rounded-2xl border-none shadow-none"
      >
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-4 md:p-6">
          {activeTab === "details" ? (
            <>
              {/* User ID Section */}
              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                <span className="text-sm font-medium text-gray-400">User ID</span>
                <span className="text-base font-bold text-gray-900">{user.id}</span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {detailGrid.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                      {item.label}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{item.value || "—"}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <UserAssociatedDevicesTable
              data={MOCK_ASSETS.slice(0, 2)} // Mocking first 2 as associated
              selectedIds={selectedDeviceIds}
              onToggleSelect={(id, checked) =>
                setSelectedDeviceIds((prev) =>
                  checked ? [...prev, id] : prev.filter((i) => i !== id)
                )
              }
              onToggleSelectAll={() =>
                setSelectedDeviceIds((prev) =>
                  prev.length === 2 ? [] : MOCK_ASSETS.slice(0, 2).map((a) => a.id)
                )
              }
            />
          )}
        </div>
      </CardWrapper>
    </div>
  );
};
