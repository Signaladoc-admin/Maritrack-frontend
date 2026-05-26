import { BaseEntity } from "@/shared/api/types";

export interface Department extends BaseEntity {
    id: string;
    name: string;
    businessId: string;
    mdmDepartmentId: null;
    zone: null;
}