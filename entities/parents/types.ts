import { BaseEntity } from "@/shared/api/types";
import { Gender } from "@/shared/lib/constants";

export interface Parent extends BaseEntity {
    id: string;
    userId: string;
    gender: Gender;
    state: string;
    country: string;
    zoneId: string | null;
    address: string | null;
}