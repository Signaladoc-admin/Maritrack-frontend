import * as React from "react";
import { useRouter } from "next/navigation";
import { refreshSessionAction, logoutAction } from "@/entities/user/api/user.actions";
import type { UserProfile } from "@/entities/user/model/user.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoading: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: refreshSessionAction,
    retry: false,
    staleTime: Infinity, // Keep session until manually invalidated or refreshed
  });

  React.useEffect(() => {
    if (profile) {
      setUser(profile);
    } else {
      setUser(null);
    }
  }, [profile]);

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      setUser(null);
      queryClient.setQueryData(["session"], null);
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refresh = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
