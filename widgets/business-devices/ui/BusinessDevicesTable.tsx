import React from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { DeviceAsset } from "@/entities/device";

interface BusinessDevicesTableProps {
  data: DeviceAsset[];
  activeTab: string;
  selectedIds: string[];
  onToggleSelect: (id: string, checked: boolean) => void;
  onToggleSelectAll: () => void;
}

export const BusinessDevicesTable: React.FC<BusinessDevicesTableProps> = ({
  data,
  activeTab,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  return (
    <CardWrapper
      variant="outline"
      padding="none"
      className="overflow-hidden rounded-2xl border-[#E5E7EB]"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[#EBF1FD]">
            <tr>
              <th className="w-12 px-6 py-4 text-center">
                <Checkbox
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={onToggleSelectAll}
                  className="rounded border-gray-300 data-[state=checked]:border-[#1b3c73] data-[state=checked]:bg-[#1b3c73]"
                />
              </th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">Asset</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">Possessor</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">IMEI Number</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">Serial Number</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">MAC Address</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">
                {activeTab === "assets" ? "Last synced" : "Date returned"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="group transition-colors hover:bg-gray-50">
                <td className="px-6 py-5 text-center">
                  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    onCheckedChange={(checked) => onToggleSelect(item.id, !!checked)}
                    className="rounded border-gray-300 data-[state=checked]:border-[#1b3c73] data-[state=checked]:bg-[#1b3c73]"
                  />
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 transition-colors group-hover:text-[#1b3c73]">
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-gray-400">{item.assetId}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  {item.isUnassigned ? (
                    <div className="inline-flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 px-6 py-1.5 text-xs font-semibold text-gray-500">
                      Unassigned
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="leading-tight font-semibold text-gray-900">
                        {item.possessorName}
                      </span>
                      <span className="text-xs font-medium text-gray-400">
                        {item.possessorEmail}
                      </span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-5 font-medium text-gray-500">{item.imei}</td>
                <td className="px-4 py-5 font-medium text-gray-500">{item.serialNumber}</td>
                <td className="px-4 py-5 font-medium text-gray-500">{item.macAddress}</td>
                <td className="px-4 py-5 font-medium whitespace-nowrap text-gray-500">
                  {activeTab === "assets" ? item.lastSynced : item.dateReturned}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-6">
        <span className="text-sm font-medium text-gray-500">Page 1 of 10</span>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-lg border-gray-200 bg-white px-5 text-sm font-semibold shadow-none hover:bg-gray-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-lg border-gray-200 bg-white px-5 text-sm font-semibold shadow-none hover:bg-gray-50"
          >
            Next
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};
