import React from "react";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { Checkbox } from "@/shared/ui/checkbox";
import { DeviceAsset } from "@/entities/device";

interface UserAssociatedDevicesTableProps {
  data: DeviceAsset[];
  selectedIds: string[];
  onToggleSelect: (id: string, checked: boolean) => void;
  onToggleSelectAll: () => void;
}

export const UserAssociatedDevicesTable: React.FC<UserAssociatedDevicesTableProps> = ({
  data,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  return (
    <CardWrapper
      variant="outline"
      padding="none"
      className="overflow-hidden rounded-2xl border-none shadow-none"
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
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">IMEI Number</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">Serial Number</th>
              <th className="px-4 py-4 font-semibold text-[#1b3c73]">MAC Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((item) => (
              <tr key={item.id} className="group transition-colors hover:bg-gray-50/50">
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
                <td className="px-4 py-5 font-medium text-gray-400">{item.imei || "Mobile phone"}</td>
                <td className="px-4 py-5 font-medium text-gray-400">{item.serialNumber}</td>
                <td className="px-4 py-5 font-medium text-gray-400">{item.macAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
};
