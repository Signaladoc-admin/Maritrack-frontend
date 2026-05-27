import { BaseEntity } from "@/shared/api/types";

export interface User {
    id: string;
    email: string;
    refresh_token: string;
    access_token_expires_on: string;
    date: string;
    isFirstLogin: boolean;
    role: string;
    businessRole: string;
    parentId: string | null;
    businessId: string | null;
    imageUrl: string | null;
    zoneId: string | null;
}

export interface LoginResponse extends User, BaseEntity { }