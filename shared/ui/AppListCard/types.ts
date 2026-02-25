import { IconType } from "react-icons/lib";

export interface InfoListItem {
  id: string;
  icon: IconType;
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
