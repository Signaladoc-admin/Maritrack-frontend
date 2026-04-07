import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAction } from "../api/auth.actions";
import { useToast } from "@/shared/ui/toast";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
import { useAuth } from "@/shared/auth/AuthProvider";
>>>>>>> dev/dev

export function useLogout() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
<<<<<<< HEAD
=======

  const { appRole } = useAuth();
>>>>>>> dev/dev

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Success",
        message: "Logout successful",
        type: "success",
      });
<<<<<<< HEAD
      router.push("/login");
=======
      router.push(appRole === "BUSINESS" ? "/business/login" : "/login");
>>>>>>> dev/dev
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
