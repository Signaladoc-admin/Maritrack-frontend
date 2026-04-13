import { useRouter } from "next/navigation";
import { getSessionAction, logoutAction } from "@/features/auth/api/auth.actions";
import type { UserProfile } from "@/entities/user/model/user.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLogin } from "@/features/auth-login/model/useLogin";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (_credentials: {
    email: string;
    password: string;
  }) => Promise<{ profile: UserProfile | null; redirectTo: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  isSubmitting: boolean;
  logoutError: string | null;
  loginError: string | null;
  sessionError: string | null;
  userRole:
    | "ADMIN"
    | "USER"
    | "ORGANIZATION_ADMIN"
    | "DEVICE_MANAGER"
    | "DEPARTMENT_MANAGER"
    | null;
  appRole: "PARENT" | "BUSINESS" | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const userRole = user?.businessRole ? user?.businessRole : user?.role;
  const appRole = userRole === "USER" ? "PARENT" : "BUSINESS";

  // Take out later
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login, isSubmitting, error: loginError } = useLogin();
  const router = useRouter();
  const queryClient = useQueryClient();
  // const [profile, setProfile] = useState()

  const {
    data: profile,
    isLoading,
    refetch,
    error: sessionError,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getSessionAction,
    retry: false,
    staleTime: Infinity, // Keep session until manually invalidated or refreshed
  });

  // useEffect(() => {
  //     async function getSession() {
  //       'use server'

  //       const cookieStore = await cookies()
  //       const session = cookieStore.get("refreshToken")
  //       if (session) {
  //         setProfile(JSON.parse(session.value))
  //       }
  //     }
  //     getSession()

  // }, [])

  console.log(profile);

  useEffect(() => {
    // Take out later
    const user = localStorage.getItem("user");

    if (user) {
      // Take out later
      setUser(JSON.parse(user));
    } else if (profile) {
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
  async function handleLogin({ email, password }: { email: string; password: string }) {
    const { profile, redirectTo } = await login({ email, password });
    setUser(profile);

    console.log(profile);

    // Take out later
    localStorage.setItem("user", JSON.stringify(profile));

    setIsAuthenticated(true);
    return { profile, redirectTo };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole: userRole!,
        appRole: appRole!,
        isLoading,
        logout,
        refresh,
        login: handleLogin,
        isSubmitting,
        logoutError: logoutMutation.error?.message || null,
        loginError: loginError || null,
        sessionError: sessionError?.message || null,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
