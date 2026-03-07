import { useMutation } from "@tanstack/react-query";
import { logoutAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";

export function useLogout() {
  const { toast } = useToast();

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Logout successful",
        type: "success",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        message: err.message || "Logout failed",
        type: "error",
      });
    },
  });

  return logoutMutation;
}
