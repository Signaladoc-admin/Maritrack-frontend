import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/AuthProvider";

export function useLogout() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, logout } = useAuth();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await logoutAction();

      if (!res.success) {
        throw new Error(res.error);
      }

      return res;
    },
    onSuccess: () => {
      logout();
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
