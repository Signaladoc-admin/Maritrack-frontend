"use client";

import React from "react";
import { Edit2, Trash2 } from "lucide-react";
import { DepartmentInfo } from "@/entities/department";
import { CardWrapper } from "@/shared/ui/card-wrapper";

interface DepartmentDetailsProps {
  department: DepartmentInfo | null;
  onEdit: () => void;
  onDelete: () => void;
}

export const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({
  department,
  onEdit,
  onDelete,
}) => {
  if (!department)
    return (
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-gray-50 text-gray-400">
        Select a department to view details
      </div>
    );

  const detailGrid = [
    { label: "Department ID", value: department.id },
    { label: "Department", value: department.name },
    { label: "Total users", value: department.totalUsers.toString() },
    { label: "Date created", value: department.dateCreated },
  ];

  return (
    <div className="flex h-full flex-1 flex-col gap-6 rounded-3xl bg-gray-50 p-6">
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onEdit}
          className="rounded-full bg-white p-3 text-[#1B3C73] transition-colors hover:bg-gray-100"
        >
          <Edit2 className="size-5" />
        </button>
        <button
          onClick={onDelete}
          className="rounded-full bg-white p-3 text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="size-5" />
        </button>
      </div>

      <CardWrapper
        variant="outline"
        padding="none"
        className="flex flex-1 flex-col overflow-hidden rounded-2xl border-none"
      >
        <div className="flex h-full flex-col gap-4 overflow-y-auto p-4 md:p-6">
          {detailGrid.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-6"
            >
              <span className="text-sm font-medium text-gray-400">{item.label}</span>
              <span className="text-base font-bold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </CardWrapper>
    </div>
  );
};
