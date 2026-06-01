import {
  createLocationAction,
  deleteLocationAction,
  getLocationAction,
  updateLocationAction,
  getAllLocationsAction,
} from "../api/locations.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";

import { CreateLocationDto, Location, PaginatedLocations, UpdateLocationDto } from "../types";

const locationActions: ResourceActions<
  Location,
  CreateLocationDto,
  UpdateLocationDto,
  PaginatedLocations
> = {
  getAll: async (options?: any) => {
    return await getAllLocationsAction(options);
  },
  getById: async (id: string) => {
    return await getLocationAction(id);
  },
  create: async (data: CreateLocationDto) => {
    return await createLocationAction(data);
  },
  update: async (id: string, data: UpdateLocationDto) => {
    return await updateLocationAction({ id, ...data });
  },
  delete: async (id: string) => {
    return await deleteLocationAction(id);
  },
};

export const {
  useGetAll: useGetLocations,
  useGetById: useGetLocation,
  useCreate: useCreateLocation,
  useUpdate: useUpdateLocation,
  useDelete: useDeleteLocation,
} = createResourceHooks<Location, CreateLocationDto, UpdateLocationDto, PaginatedLocations>(
  "locations",
  locationActions
);
