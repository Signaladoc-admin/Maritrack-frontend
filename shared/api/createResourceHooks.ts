import { useQueryClient } from "@tanstack/react-query";
import { useServerActionQuery, useServerActionMutation } from "./server-action-hooks";
import { ActionResult, QueryOptions } from "./types";

export interface ResourceActions<T, CreateDto = any, UpdateDto = any> {
  getAll: (options?: QueryOptions) => Promise<ActionResult<T[]>>;
  getById: (id: string) => Promise<ActionResult<T>>;
  create: (data: CreateDto) => Promise<ActionResult<T>>;
  update: (id: string, data: UpdateDto) => Promise<ActionResult<T>>;
  delete: (id: string) => Promise<ActionResult<void>>;
}

export function createResourceHooks<T, CreateDto = any, UpdateDto = any>(
  resourceName: string,
  actions: ResourceActions<T, CreateDto, UpdateDto>
) {
  const keys = {
    all: [resourceName, "list"] as const,
    details: [resourceName, "detail"] as const,
    detail: (id: string) => [resourceName, "detail", id] as const,
  };

  return {
    keys,

    useGetAll: (options?: QueryOptions) => {
      return useServerActionQuery([...keys.all, options], actions.getAll, [options]);
    },

    useGetById: (id: string) => {
      return useServerActionQuery([...keys.detail(id)], actions.getById, [id], { enabled: !!id });
    },

    useCreate: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(actions.create, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keys.all });
        },
      });
    },

    useUpdate: () => {
      const queryClient = useQueryClient();
      return useServerActionMutation(
        ({ id, data }: { id: string; data: UpdateDto }) => actions.update(id, data),
        {
          onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: keys.all });
            queryClient.invalidateQueries({ queryKey: keys.detail(id) });
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
