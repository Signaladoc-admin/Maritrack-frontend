import { IChildProfile } from "../onboarding/types";

export interface EditChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: IChildProfile;
}

export interface IconProps {
  action: () => void;
  icon: React.ReactNode;
}

export interface DeleteChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: IChildProfile;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  variant: "destructive" | "default";
}
