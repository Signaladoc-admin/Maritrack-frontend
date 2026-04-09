import { Device } from "../devices/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  zone: string;
  associatedDevices: Device[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  totalUsers: number;
  createdAt: Date;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  totalUsers: number;
  createdAt: Date;
}
