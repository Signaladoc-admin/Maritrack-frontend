import { Gender } from "@/shared/lib/constants";
import { IChildProfile } from "../../onboarding/personal/types";
import { Parent } from "@/entities/parents/types";
import { BaseEntity } from "@/shared/api/types";

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

export interface ChildDevice extends BaseEntity {
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
  childId: string;
  currentUserId: string | null;
  currentUser: null;
}

export interface ParentLink extends BaseEntity {
  parentId: string;
  childId: string;
  parent: Parent
}
export interface Child extends BaseEntity {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  imageUrl: string | null;
  onboardingCode: string;
  device: ChildDevice | null;
  parentLinks: ParentLink[];
  parent: Parent[];
}

export interface ChildRelationship extends BaseEntity {
  id: string;
  child: Child;
  childId: string;
  parentId: string;
  zoneId: string;
  imageUrl: string;
  name: string;
}
