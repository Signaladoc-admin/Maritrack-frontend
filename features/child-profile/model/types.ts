import { Gender } from "@/shared/lib/constants";
import { IChildProfile } from "../../onboarding/types";

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

export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  imageUrl: string | null;
  onboardingCode: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  image: string | null;
}

export interface ChildRelationship {
  child: Child;
  childId: string;
  parentId: string;
  zoneId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}
