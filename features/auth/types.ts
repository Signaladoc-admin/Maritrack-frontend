import { BusinessRole } from "@/entities/user/model/user.schema";

export type VerificationTokenMethod = "sms" | "email";

export interface RequestTokenRequest {
  email: string;
}

export interface VerifyUserRequest {
  email: string;
  otp: string;
}

export interface ValidateOTPResponse {
  accessToken: string;
  refreshToken: string;
  isOnboarded: boolean;
}

export interface ResetPasswordRequest {
  password: string;
  email: string;
  token?: string;
  otp?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface RefreshTokenResponse {
  user: {
    role: "USER" | "ADMIN" | null;
    businessRole: BusinessRole | null;
    email: string;
    id: string;
    parentId: string | null;
    businessId: string | null;
    imageUrl: string | null;
  };
  access_token: string;
  refresh_token: string;
}
