export interface Location {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export interface PaginatedLocations {
  locations: Location[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateLocationDto {
  name: string;
  businessId: string;
  mdmLocationId?: string;
  zone?: string;
  description?: string;
}

export interface UpdateLocationDto extends Partial<CreateLocationDto> {}
