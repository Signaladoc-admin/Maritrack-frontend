import {
  createDepartmentAction,
  deleteDepartmentAction,
  getDepartmentAction,
  updateDepartmentAction,
  getAllDepartmentsAction,
} from "../api/departments.actions";

import { createResourceHooks, type ResourceActions } from "@/shared/api/createResourceHooks";

import {
  CreateDepartmentDto,
  Department,
  PaginatedDepartments,
  UpdateDepartmentDto,
} from "../types";

const departmentActions: ResourceActions<
  Department,
  CreateDepartmentDto,
  UpdateDepartmentDto,
  PaginatedDepartments
> = {
  getAll: async (options: any) => {
    return await getAllDepartmentsAction(options);
  },
  getById: async (id: string) => {
    return await getDepartmentAction(id);
  },
  create: async (data: CreateDepartmentDto) => {
    return await createDepartmentAction(data);
  },
  update: async (id: string, data: UpdateDepartmentDto) => {
    return await updateDepartmentAction({ id, ...data });
  },
  delete: async (id: string) => {
    return await deleteDepartmentAction(id);
  },
};

export const {
  useGetAll: useGetDepartments,
  useGetById: useGetDepartment,
  useCreate: useCreateDepartment,
  useUpdate: useUpdateDepartment,
  useDelete: useDeleteDepartment,
} = createResourceHooks<Department, CreateDepartmentDto, UpdateDepartmentDto, PaginatedDepartments>(
  "departments",
  departmentActions
);
