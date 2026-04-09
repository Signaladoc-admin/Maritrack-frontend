"use client";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { Header } from "@/shared/ui/layout/header";
import { TabNavigation } from "@/shared/ui/tab-navigation";
import Table from "@/shared/ui/Table/Table";
import { DownloadCloud, FilterIcon, ListFilter, SearchIcon } from "lucide-react";
import { useState } from "react";
import { devicesData } from "./data";
import { devicesColumns } from "./columns";
import { InputGroup } from "@/shared/ui/input-group";
import { Device } from "./types";
import { useRouter } from "next/navigation";

export default function DevicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const router = useRouter();

  function handleSelectDevice(device: Device) {
    setSelectedDevice(device);
    router.push(`/devices/${device.id}`);
  }
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <Header title="Devices" subtitle="Manage your devices" />
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <TabNavigation
          className="w-fit"
          tabs={[
            { label: "All Devices", value: "all" },
            { label: "Active Devices", value: "active" },
            { label: "Inactive Devices", value: "inactive" },
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
        <div className="flex items-center gap-2">
          <InputGroup
            iconLeft={<SearchIcon />}
            placeholder="Search devices"
            className="w-full rounded-full"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <ListFilter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Filter by Status</DropdownMenuItem>
              <DropdownMenuItem>Filter by Status</DropdownMenuItem>
              <DropdownMenuItem>Filter by Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary" size="icon" className="rounded-full">
            <DownloadCloud />
          </Button>
        </div>
      </div>

      <>
        {activeTab === "all" && (
          <Table data={devicesData} columns={devicesColumns} onItemClick={handleSelectDevice} />
        )}
        {activeTab === "active" && <div>Active Devices</div>}
        {activeTab === "inactive" && <div>Inactive Devices</div>}
      </>
    </div>
  );
}
