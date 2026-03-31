"use client";

import React, { useState, useMemo } from "react";
import { BusinessDevicesToolbar } from "./BusinessDevicesToolbar";
import { BusinessDevicesTable } from "./BusinessDevicesTable";
import { MOCK_ASSETS, MOCK_DAMAGED } from "@/entities/device";

export const BusinessDevicesWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState("assets");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const tabs = [
    { label: "Assets (4,000)", value: "assets" },
    { label: "Damaged & returned assets (4,000)", value: "damaged" },
  ];

  const currentData = activeTab === "assets" ? MOCK_ASSETS : MOCK_DAMAGED;

  const filteredData = useMemo(() => {
    return currentData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.possessorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assetId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentData, searchQuery]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((d) => d.id));
    }
  };

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-[#1b3c73]">
          {activeTab === "assets" ? "Devices" : "Products"}
        </h1>
        <p className="text-sm text-gray-500">Keep track of your products</p>
      </div>

      <BusinessDevicesToolbar
        activeTab={activeTab}
        onTabChange={(val) => {
          setActiveTab(val);
          setSelectedIds([]);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tabs={tabs}
      />

      <BusinessDevicesTable
        data={filteredData}
        activeTab={activeTab}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
      />
    </div>
  );
};
