import { Gender } from "@/shared/lib/constants";
import { IChildProfile } from "../../onboarding/personal/types";
import { Parent } from "@/entities/parents/types";

export interface AddEditChildModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: IChildProfile | null;
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

export interface ChildDevice {
  id: string;
  serialNumber: string;
  imei: string;
  mdmDeviceId: string;
  mdmId: string;
  macAddress: string;
  manufacturer: string;
  model: string | null;
  operatingSystem: string | null;
  assignmentStatus: string;
  mdmEnrollmentStatus: string;
  mdmComplianceStatus: string | null;
  deviceStatus: "ACTIVE" | "INACTIVE" | string;
  lastSeenAt: string | null;
  lastKnownLocation: { latitude: number; longitude: number } | null;
  flagged: boolean;
  flagReason: string | null;
  mdmLastSyncAt: string | null;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  childId: string;
  currentUserId: string | null;
  currentUser: null;
}

export interface ParentLink {
  parentId: string;
  childId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  parent: Parent
}
export interface Child {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  imageUrl: string | null;
  onboardingCode: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  device: ChildDevice | null;
  parentLinks: ParentLink[];
  parent: Parent[];
}

export interface ChildRelationship {
  id: string;
  child: Child;
  childId: string;
  parentId: string;
  zoneId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  imageUrl: string;
  name: string;
}
