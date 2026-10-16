import { User } from "@/app/(in-app)/users/types";
import { BusinessRoleEnum, RoleValues } from "../user/model/user.schema";
import { StaffDevice } from "../device";
import { BaseEntity, QueryOptions } from "@/shared/api/types";
import { Department } from "../department/types";
import { BusinessZone } from "@/features/mdm-sync/types";
import { UserProfile } from "../user";
import { Zone } from "../zone/types";
import { UserRole } from "@/features/user-management/model/types";

export interface BusinessProfileData extends BaseEntity {
  id: string;
  profile: string;
  type: string;
  departments: string[];
  locations: string[];
  business: Business;
}

// export interface BusinessStaff {
//   id: string;
//   userId: string;
//   businessId: string;
//   location: string | null;
//   position: string | null;
//   staffDepartmentId: string | null;
//   onboardingCode: string | null;
//   businessRole: BusinessRoleEnum;
//   createdAt: string;
//   updatedAt: string;
//   deleted: boolean;
//   deletedAt: string | null;
//   user?: User;
//   business?: Business;
//   device?: StaffDevice;
// }

interface StaffBusiness extends BaseEntity {
  id: string;
  email: string;
  name: string;
  address: string;
  state: string;
  country: string;
  estimatedDevices: number;
  profileId: string;
  organizationSize: string;
}

interface StaffUserProfile extends BaseEntity {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isInvited: boolean;
  role: UserRole;
  phone: string | null;
  status: string;
  imageUrl: string | null;
  firstLogin: boolean;
  mdmUserId: null;
  zone: Zone;
}

export interface DeviceFinanceInstallment {
  id: string;
  financingId: string;
  installmentNumber: number;
  amountInKobo: string;
  amountPaidInKobo: string;
  lateFeeInKobo: string;
  dueDate: string;
  status: "PENDING" | "PAID" | "OVERDUE" | string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OnDeviceFinancing {
  id: string;
  currency: string;
  gracePeriodInDays: number;
  devicePriceInKobo: string;
  downPaymentInKobo: string;
  monthlyPaymentInKobo: string;
  totalPaymentInKobo: string;
  remainingPaymentInKobo: string;
  paymentPlan: string;
  paymentPlanDuration: number;
  interestRate: string;
  interestModel: string;
  interestAmountInKobo: string;
  latePaymentSurcharge: string;
  paymentStatus: "PENDING" | "PAID" | "ACTIVE" | "DEFAULTED" | string;
  paymentStartDate: string;
  paymentEndDate: string;
  paymentSchedule: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  deviceColour: string;
  deviceMemory: string;
  deviceRam: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
  installments?: DeviceFinanceInstallment[];
}

export interface DeviceFinanceRetailer {
  id: string;
  referenceNumber: string;
  businessId: string;
  contactPersonId: string;
  legalName: string;
  branchName: string;
  rcNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: string | null;
}

export interface DeviceFinanceActivationCode {
  id: string;
  deviceFinanceUserId: string;
  code: string;
  status: string;
  revokedByUserId: string | null;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceFinanceUser extends BaseEntity {
  id: string;
  userId: string;
  location: string | null;
  businessId: string;
  retailerId: string;
  onboardingCode: string;
  isDeviceFinanced: boolean;
  transFer: boolean;
  onDeviceFinancingId: string | null;
  gender: "MALE" | "FEMALE" | string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  user: StaffUserProfile;
  business?: Business | StaffBusiness;
  activationCode?: DeviceFinanceActivationCode | null;
  retailer?: DeviceFinanceRetailer | null;
  onDeviceFinancing?: OnDeviceFinancing | null;
  deviceFinancing?: OnDeviceFinancing | null;
  device?: StaffDevice | null;
}

export interface BusinessStaff extends BaseEntity {
  id: string;
  userId: string;
  user: StaffUserProfile;
  staffDepartmentId?: string | null;
  businessId: string;
  business: Business;
  businessRole?: BusinessRoleEnum;
  location?: string | null;
  position?: string | null;
  onboardingCode?: string | null;
  device?: StaffDevice | null;
  // Device finance properties (populated when business profile is DEVICE_FINANCING)
  retailerId?: string;
  isDeviceFinanced?: boolean;
  transFer?: boolean;
  onDeviceFinancingId?: string | null;
  gender?: "MALE" | "FEMALE" | string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  activationCode?: DeviceFinanceActivationCode | null;
  retailer?: DeviceFinanceRetailer | null;
  onDeviceFinancing?: OnDeviceFinancing | null;
  deviceFinancing?: OnDeviceFinancing | null;
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
  zone: BusinessZone;
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
  data:
    | {
        limit: number;
        page: number;
        staff: BusinessStaff[];
        total: number;
        totalPages: number;
      }
    | DeviceFinanceUser[]
    | BusinessStaff[];
}
interface NewStaffMemberResult {
  email: string;
  staffId: string;
  userId: string;
  type: "created" | "updated";
}
export interface CreateMultipleStaffMembersResponse {
  total: number;
  results: NewStaffMemberResult[];
}
