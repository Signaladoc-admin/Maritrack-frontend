export interface Department {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedDepartments {
  departments: Department[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateDepartmentDto {
  name: string;
  businessId: string;
  mdmDepartmentId?: string;
  zone?: string;
  description?: string;
}

export interface UpdateDepartmentDto extends Partial<CreateDepartmentDto> {}

export interface AssignDeviceToUserDto {
  request: {
    deviceIds: string[];
    userId: string;
    zoneId: string;
  };
}
