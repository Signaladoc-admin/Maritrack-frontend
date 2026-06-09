import { Parent } from "@/entities/parents/types";
import { Zone } from "@/entities/zone/types";
import { BaseEntity } from "@/shared/api/types";
import { BusinessRole } from "./user.schema";

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  zone: string;
  location: string;
  avatar?: string;
}

export interface UserProfile {
  id: string,
  firstName: string,
  lastName: string,
  role: string,
  imageUrl: string | null,
  parentId: string | null,
  parent: Parent,
  zone: Omit<Zone, "businessId" | "parentId">
}

export interface AuthUserProfile {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  businessRole: BusinessRole | null;
  parentId: string | null;
  businessId: string | null;
  zoneId: string | null;
  imageUrl: string | null;
  appRole: "PARENT" | "BUSINESS";
  firstName?: string | null;
  lastName?: string | null;
}

export interface UserDetails extends BaseEntity {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  isEmailVerified: boolean,
  isInvited: boolean,
  role: "USER" | "ADMIN",
  phone: string,
  status: string,
  isOnline: boolean,
  imageUrl: string | null,
  firstLogin: boolean,
  lastLoginAt: string,
  mdmUserId: null,
  zone: null
}