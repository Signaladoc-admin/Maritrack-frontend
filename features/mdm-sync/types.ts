import { Business } from "@/entities/business/types";
import { BaseEntity } from "@/shared/api/types";

export interface ParentZone extends BaseEntity {
  id: string;
  name: string;
  mdmZoneId: string;
  parentId: string;
  businessId: string | null;
  parent: ParentZone[];
}

export interface BusinessZone extends BaseEntity {
  id: string;
  name: string;
  mdmZoneId: string;
  parentId: null;
  businessId: string;
  business: Business;
}

interface Domain extends BaseEntity {
  domain: string;
  name: string;
  deviceId: string;
}
export interface GeofenceLocation extends BaseEntity {
  lat: number;
  lng: number;
  radius: number;
  deviceId: string;
}

export interface Restrictions {
  domains?: string[];
  geofences?: GeofenceLocation[];
}

export interface RestrictionsRequest {
  domains?: string[];
  geofences?: GeofencesRequest[];
  organizationName?: string;
}

export interface GeofencesRequest {
  lat: number;
  lng: number;
  radius: number;
}
interface NewRestriction {
  type: string;
  value: string;
  order: number;
  overridden: boolean;
}

export interface SetRestrictionsResponse {
  data: {
    name: string;
    updatedAt: number;
    time: number;
    order: number;
    restrictions: NewRestriction[];
  };
}
