import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/AuthProvider";

export function useLogout() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Success",
        message: "Logout successful",
        type: "success",
      });
      router.push(user?.appRole === "BUSINESS" ? "/business/login" : "/login");
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
