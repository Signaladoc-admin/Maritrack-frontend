import { Business } from "@/entities/business/types";
import { BaseEntity } from "@/shared/api/types";

export interface ParentZone extends BaseEntity {
    id: string
    name: string
    mdmZoneId: string
    parentId: string
    businessId: string | null
    parent: ParentZone[]
}

export interface BusinessZone extends BaseEntity {
    id: string,
    name: string,
    mdmZoneId: string,
    parentId: null,
    businessId: string,
    business: Business
}