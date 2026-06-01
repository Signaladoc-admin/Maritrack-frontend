import { BaseEntity } from "@/shared/api/types";

export interface Zone extends BaseEntity {
    id: string;
    name: string;
    mdmZoneId: string;
    parentId: string | null;
    businessId: string | null;
}