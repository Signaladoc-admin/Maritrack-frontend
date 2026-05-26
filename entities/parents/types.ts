import { Gender } from "@/shared/lib/constants";

export interface Parent {
    id: string;
    userId: string;
    gender: Gender;
    state: string;
    country: string;
    zoneId: string | null;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string | null;
    address: string | null;
}