import { BusinessRole } from "@/entities/user/model/user.schema";
import { BaseEntity } from "@/shared/api/types";

export interface LoginResponse extends BaseEntity {
  id: string;
  access_token_expires_on: string;
  refresh_token: string;
  date: string;
  isFirstLogin: boolean;
  isInvited?: boolean;
  isEmailVerified: boolean;
  role: "USER" | "ADMIN";
  businessRole: BusinessRole | null;
  businessType?: string | null;
  isDefaultPasswordChanged?: boolean;
  email: string;
  parentId: string | null;
  businessId: string | null;
  imageUrl: string | null;
  zoneId: string | null;
}

export interface User {
  id: string;
  email: string;
  refresh_token: string;
  access_token_expires_on: string;
  date: string;
  isFirstLogin: boolean;
  role: "USER" | "ADMIN";
  businessRole: BusinessRole;
  businessType?: string | null;
  isDefaultPasswordChanged?: boolean;
  isInvited?: boolean;
  parentId: string | null;
  businessId: string | null;
  imageUrl: string | null;
  zoneId: string | null;
}

export interface UserTokenPayload {
  role: "USER" | "ADMIN";
  businessRole: BusinessRole | null;
  businessType?: string | null;
  isDefaultPasswordChanged?: boolean;
  isInvited?: boolean;
  isEmailVerified?: boolean;
  email: string;
  id: string;
  parentId: string | null;
  businessId: string | null;
  imageUrl?: string | null;
  zoneId?: string | null;
  iat: number;
  exp: number;
}
