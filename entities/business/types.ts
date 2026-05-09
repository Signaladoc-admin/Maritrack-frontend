import { User } from "@/app/(in-app)/users/types";
import { BusinessRoleEnum } from "../user/model/user.schema";
import { StaffDevice } from "../device";

export interface BusinessProfileData {
  id: string;
  profile: string;
  departments: string[];
  locations: string[];
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export interface BusinessStaff {
  id: string;
  userId: string;
  businessId: string;
  location: string | null;
  position: string | null;
  staffDepartmentId: string | null;
  onboardingCode: string | null;
  businessRole: BusinessRoleEnum;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  user?: User;
  business?: Business;
  device?: StaffDevice;
}

export interface Business {
  id: string;
  email: string;
  name: string;
  address: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  estimatedDevices: number;
  profileId: string;
  profile: BusinessProfileData;
  organizationSize: string;
  departments: string[];
  devices: unknown[];
  staff: BusinessStaff[];
}

/** Legacy alias kept for existing usages */
export type BusinessProfile = BusinessProfileData;

export interface PaginatedStaff {
  staff: BusinessStaff[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
