"use client";

import React from "react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { DepartmentInfo } from "@/entities/department";

interface DeleteDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: DepartmentInfo | null;
  onConfirm: () => void;
  loading?: boolean;
}

export const DeleteDepartmentModal: React.FC<DeleteDepartmentModalProps> = ({
  open,
  onOpenChange,
  department,
  onConfirm,
  loading,
}) => {
  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="Are you sure you want to delete this department?"
      description="This action cannot be undone"
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
      variant="destructive"
      loading={loading}
    />
  );
};
