import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getChildAction, getChildrenAction } from "../api/child.action";

export const childProfileKeys = {
  all: ["child-profile"] as const,
  children: ["child-profile", "children"] as const,
};

export function useGetChildren() {
  const queryClient = useQueryClient();

  return useServerActionMutation(getChildrenAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childProfileKeys.children });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

export function useGetChild(childId: string) {
  return useServerActionQuery(childProfileKeys.children, getChildAction, [childId], {
    enabled: !!childId,
  });
}
