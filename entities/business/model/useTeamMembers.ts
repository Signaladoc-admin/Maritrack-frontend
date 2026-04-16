import { useMutation } from "@tanstack/react-query";
import { createTeamMembers } from "../api/team-members.actions";
import { useToast } from "@/shared/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateTeamMembers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: { email: string; location: string }[]) => {
      const result = await createTeamMembers(data);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["team-members"], data);
      toast({
        type: "success",
        title: "Success",
        message: data.message || "Team members created successfully",
      });
    },
    onError: (err: any) => {
      const errorMessage = err.message || "An unexpected error occurred. Please try again.";
      toast({
        type: "error",
        title: "Error",
        message: errorMessage,
      });
    },
  });

  return {
    createTeamMembers: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    error: mutation.error?.message || null,
    mutation,
  };
};
