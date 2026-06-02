import { User } from "@/app/(in-app)/users/types";
import { BusinessRoleEnum } from "../user/model/user.schema";
import { StaffDevice } from "../device";
import { BaseEntity, QueryOptions } from "@/shared/api/types";
import { Department } from "../department/types";
import { BusinessZone } from "@/features/mdm-sync/types";

export interface BusinessProfileData extends BaseEntity {
  id: string;
  profile: string;
  departments: string[];
  locations: string[];
  business: Business;
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

export interface Business extends BaseEntity {
  id: string;
  email: string;
  name: string;
  address: string;
  state: string;
  country: string;
  estimatedDevices: number;
  profileId: string;
  profile: BusinessProfileData;
  organizationSize: string;
  departments: Department[];
  devices: unknown[];
  staff: BusinessStaff[];
  zone: BusinessZone
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


export interface StaffMemberFiltersRequest extends QueryOptions {
  search?: string;
  location?: string;
  businessId?: string;
  position?: string;
}

export interface RegisterBusinessRequest {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  adminBusinessRole: string;
  password: string;
  address: string;
  state: string;
  country: string;
  organizationSize: string;
  estimatedDevices: number;
}

export interface StaffMembersPaginatedResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: { staff: BusinessStaff[] };
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}