import { useQueryClient } from "@tanstack/react-query";
import { useServerActionMutation, useServerActionQuery } from "@/shared/api/server-action-hooks";
import {
  getChildAction,
  getChildrenAction,
  updateChildAction,
  deleteChildAction,
} from "../api/child.action";
import { useToast } from "@/shared/ui/toast";

export const childProfileKeys = {
  all: ["child-profile"] as const,
  children: ["child-profile", "children"] as const,
  child: (id: string) => ["child-profile", "child", id] as const,
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
  return useServerActionQuery(childProfileKeys.child(childId), getChildAction, [childId], {
    enabled: !!childId,
  });
}

export function useUpdateChild(childId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(
    (data: Parameters<typeof updateChildAction>[1]) => updateChildAction(childId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: childProfileKeys.child(childId) });
        queryClient.invalidateQueries({ queryKey: childProfileKeys.children });
        toast({ type: "success", title: "Updated", message: "Child profile updated successfully." });
      },
      onError: (error: any) => {
        toast({
          type: "error",
          title: "Update Failed",
          message: error.message || "Failed to update child profile.",
        });
      },
    }
  );
}

export function useDeleteChild() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useServerActionMutation(deleteChildAction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childProfileKeys.children });
      queryClient.invalidateQueries({ queryKey: ["children", "parent"] });
      toast({ type: "success", title: "Deleted", message: "Child profile deleted successfully." });
    },
    onError: (error: any) => {
      toast({
        type: "error",
        title: "Delete Failed",
        message: error.message || "Failed to delete child profile.",
      });
    },
  });
}
