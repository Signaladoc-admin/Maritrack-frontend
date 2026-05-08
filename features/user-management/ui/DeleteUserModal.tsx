"use client";

import React from "react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { UserInfo } from "@/entities/user";

interface DeleteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserInfo | null;
  onConfirm: () => void;
  loading?: boolean;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onOpenChange,
  user,
  onConfirm,
  loading,
}) => {
  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="Are you sure you want to delete this user?"
      description="This action cannot be undone"
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={onConfirm}
      variant="destructive"
      loading={loading}
    />
  );
};
