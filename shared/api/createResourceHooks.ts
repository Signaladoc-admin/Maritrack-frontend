import { useQueryClient } from "@tanstack/react-query";
import { useServerActionQuery, useServerActionMutation } from "./server-action-hooks";
import type { UseQueryOptions } from "@tanstack/react-query";
import { ActionResult, QueryOptions } from "./types";

export interface ResourceActions<T, CreateDto = any, UpdateDto = any, ListT = T[]> {
  getAll: (options?: QueryOptions) => Promise<ActionResult<ListT>>;
  getById: (id: string) => Promise<ActionResult<T>>;
  create: (data: CreateDto) => Promise<ActionResult<any>>;
  createMultiple?: (data: CreateDto[]) => Promise<ActionResult<any[]>>;
  update: (id: string, data: UpdateDto) => Promise<ActionResult<any>>;
  delete: (id: string) => Promise<ActionResult<void>>;
}

export function createResourceHooks<T, CreateDto = any, UpdateDto = any, ListT = T[]>(
  resourceName: string,
  actions: ResourceActions<T, CreateDto, UpdateDto, ListT>
) {
  const keys = {
    all: [resourceName, "list"] as const,
    details: [resourceName, "detail"] as const,
    detail: (id: string) => [resourceName, "detail", id] as const,
  };

  return {
    keys,

    useGetAll: (
      options?: QueryOptions, 
      queryOptions?: Omit<UseQueryOptions<ListT, Error, ListT, readonly any[]>, "queryKey" | "queryFn">
    ) => {
      return useServerActionQuery([...keys.all, options], actions.getAll, [options], queryOptions);
    },

    useGetById: (
      id: string,
      queryOptions?: Omit<UseQueryOptions<T, Error, T, readonly any[]>, "queryKey" | "queryFn">
    ) => {
      return useServerActionQuery([...keys.detail(id)], actions.getById, [id], {
        enabled: !!id,
        ...queryOptions,
      });
    },

    useCreate: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(actions.create, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
      });
    },

    useCreateMultiple: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(
        actions.createMultiple ||
          (async () => ({ success: false, error: "createMultiple not implemented" })),
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keys.all });
          },
        }
      );
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(
        (_payload: { id: string } & UpdateDto) => {
          const { id, ...data } = _payload;
          return actions.update(id, data as unknown as UpdateDto);
        },
        {
          onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: keys.all });
            queryClient.invalidateQueries({ queryKey: keys.detail(variables.id) });
          },
        }
      );
    },

    useDelete: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(actions.delete, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
      });
    },
  };
}
