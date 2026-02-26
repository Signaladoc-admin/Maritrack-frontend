import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { ActionResult } from "./types";

/**
 * Wraps a Server Action for use with React Query useQuery
 */
export function useServerActionQuery<T, TArgs extends any[]>(
  queryKey: readonly any[],
  serverAction: (...args: TArgs) => Promise<ActionResult<T>>,
  args: TArgs,
  options?: Omit<UseQueryOptions<T, Error, T, readonly any[]>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const result = await serverAction(...args);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    ...options,
  });
}

/**
 * Wraps a Server Action for use with React Query useMutation
 */
export function useServerActionMutation<T, TVariables>(
  serverAction: (variables: TVariables) => Promise<ActionResult<T>>,
  options?: UseMutationOptions<T, Error, TVariables>
) {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const result = await serverAction(variables);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    ...options,
  });
}
