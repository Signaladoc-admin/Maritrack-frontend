import { IconType } from "react-icons/lib";
import React from "react";

export interface InfoListItem {
  id: string;
  icon: IconType | React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string | React.ReactNode;
  onClick?: () => void;
}

export interface InfoListCardProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  items: InfoListItem[];
  className?: string;
}
