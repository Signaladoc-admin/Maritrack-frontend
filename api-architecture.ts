/**
 * API Architecture: Server Actions + React Query (FSD Pattern)
 *
 * Following the structure from the project image:
 * features/
 *   auth-login/
 *     api/
 *       loginAction.ts
 *     model/
 *       useLogin.ts
 * shared/
 *   api/
 *     types.ts
 *     createResourceHooks.ts
 *     server-action-hooks.ts
 */

import { createResourceHooks } from "@/shared/api/createResourceHooks";
import { ActionResult, QueryOptions } from "@/shared/api/types";

// --- 1. Define Types ---
export interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface CreateEmployeeDto {
  name: string;
  role: string;
}

// --- 2. Implement Server Actions (Example) ---
/**
 * In FSD, this would live in:
 * features/employees/api/employeeActions.ts
 */
export const employeeActions = {
  getAll: async (options?: QueryOptions): Promise<ActionResult<Employee[]>> => {
    // 'use server' logic here
    return { success: true, data: [] };
  },
  getById: async (id: string): Promise<ActionResult<Employee>> => {
    return { success: true, data: { id, name: "John Doe", role: "Dev" } };
  },
  create: async (data: CreateEmployeeDto): Promise<ActionResult<Employee>> => {
    return { success: true, data: { id: "new", ...data } };
  },
  update: async (id: string, data: Partial<CreateEmployeeDto>): Promise<ActionResult<Employee>> => {
    return { success: true, data: { id, name: data.name || "N/A", role: data.role || "N/A" } };
  },
  delete: async (id: string): Promise<ActionResult<void>> => {
    return { success: true, data: undefined };
  },
};

// --- 3. Create Resource Hooks ---
/**
 * In FSD, these hooks often live in:
 * features/employees/model/useEmployees.ts
 */
export const employeeHooks = createResourceHooks<Employee, CreateEmployeeDto>(
  "employees",
  employeeActions
);

/**
 * ARCHITECTURE OVERVIEW:
 *
 * 1. Server Actions (features/X/api/XActions.ts):
 *    - Standardized return type: ActionResult<T>
 *    - Direct DB/External API interaction.
 *
 * 2. Shared Utilities (shared/api/):
 *    - `createResourceHooks`: Factory for CRUD operations.
 *    - `server-action-hooks`: Base useQuery/useMutation wrappers.
 *
 * 3. Feature Hooks (features/X/model/useX.ts):
 *    - Composition of shared hooks for specific features.
 */
