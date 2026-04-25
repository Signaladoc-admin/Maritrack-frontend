import { useRouter } from "next/navigation";
import { getSessionAction, logoutAction } from "@/features/auth/api/auth.actions";
import type { BusinessRole, UserProfile } from "@/entities/user/model/user.schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../stores/auth.store";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { PageLoader } from "../ui/loader";

// Shape of the decoded JWT access token payload
type UserPayload = {
  iat: number;
  exp: number;
  role: "USER" | "ADMIN" | undefined;
  businessRole: BusinessRole | null;
  email: string;
  id: string;
  parentId: string | null;
  businessId: string | null;
  imageUrl: string | null;
};

export function getTokenPayload(token: string): UserPayload | null {
  try {
    return jwtDecode<UserPayload>(token);
  } catch (error) {
    return null;
  }
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (_credentials: {
    email: string;
    password: string;
  }) => Promise<{ profile: UserProfile | null; redirectTo: string }>;
  logout: () => void;
  refresh: () => Promise<void>;
  isSubmitting: boolean;
  logoutError: string | null;
  loginError: string | null;
  sessionError: string | null;
}

type User = UserProfile & {
  appRole: "PARENT" | "BUSINESS";
  userRole: BusinessRole | "USER" | "ADMIN";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userPayload, setUserPayload] = useState<UserPayload | null>(null);
  const userRole = userPayload?.businessRole ? userPayload?.businessRole : userPayload?.role;
  const appRole = userRole === "USER" ? "PARENT" : "BUSINESS";

  const { data: userProfile } = useUserProfile();

  // Aggregated user from both payload and profile
  const user: User = {
    id: userPayload?.id!,
    role: userPayload?.role!,
    businessRole: userPayload?.businessRole!,
    email: userPayload?.email!,
    parentId: userPayload?.parentId!,
    businessId: userPayload?.businessId!,
    imageUrl: userPayload?.imageUrl!,
    userRole: userRole!,
    appRole: appRole!,
    firstName: userProfile?.firstName!,
    lastName: userProfile?.lastName!,
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login, isSubmitting, error: loginError } = useLogin();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { setAccessToken, setBusinessId, logout, accessToken } = useAuthStore((s) => s);

  // const payload = getTokenPayload(accessToken!);
  // console.log(payload);

  const [isHydrated, setIsHydrated] = useState(false);

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

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      setUserPayload(null);
      queryClient.setQueryData(["session"], null);
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  // Take out later
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserPayload(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // ── Step 1: Zustand already has a token (e.g. just logged in this session).
        // Avoid any network call — the token is already good.
        const memToken = useAuthStore.getState().accessToken;
        if (memToken) {
          const memPayload = getTokenPayload(memToken);
          if (memPayload?.exp && memPayload.exp * 1000 > Date.now() + 60_000) {
            return; // already set, nothing to do
          }
        }

        // ── Step 2: Page was reloaded — Zustand is empty but cookie may still hold
        // the original login token (which carries business context). Use it if valid.
        if (cancelled) return;
        const sessionRes = await fetch("/api/session", { credentials: "include" });
        if (cancelled) return;
        if (sessionRes.ok) {
          const { accessToken: cookieToken } = await sessionRes.json();
          const cookiePayload = getTokenPayload(cookieToken);
          if (cookiePayload?.exp && cookiePayload.exp * 1000 > Date.now() + 60_000) {
            setAccessToken(cookieToken);
            return;
          }
        }

        // ── Step 3: Token is expired or missing — refresh is the only option.
        if (cancelled) return;
        const res = await fetch("/api/refresh", { method: "POST", credentials: "include" });
        if (cancelled) return;
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken: refreshedToken } = await res.json();
        setAccessToken(refreshedToken);
      } catch {
        if (!cancelled) logout();
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Take out later
    const user = localStorage.getItem("user");

    if (user) {
      // Take out later
      setUserPayload(JSON.parse(user));
    } else if (profile) {
      setUserPayload(profile as any);
    } else {
      setUserPayload(null);
    }
  }, [profile]);

  // Proactive refresh: schedule a silent token refresh 1 minute before the access token expires.
  // This keeps the Zustand store and the httpOnly cookie in sync without relying on 401 retries.
  // When setAccessToken fires with the new token, this effect re-runs and schedules the next cycle.
  useEffect(() => {
    if (!accessToken) return;

    const payload = getTokenPayload(accessToken);
    if (!payload?.exp) return;

    const msUntilRefresh = payload.exp * 1000 - Date.now() - 60_000; // 1 min before expiry

    if (msUntilRefresh <= 0) return; // already expired or within the buffer — 401 retry handles it

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken: newToken } = await res.json();
        setAccessToken(newToken); // updates Zustand + re-triggers this effect for next cycle
      } catch {
        logout();
      }
    }, msUntilRefresh);

    return () => clearTimeout(timer);
  }, [accessToken, setAccessToken, logout]);

  // All hooks declared above — safe to return early now
  if (!isHydrated) {
    return <PageLoader />;
  }

  const refresh = async () => {
    await refetch();
  };
  async function handleLogin({ email, password }: { email: string; password: string }) {
    const { profile, accessToken, redirectTo } = await login({ email, password });

    setUserPayload(profile as any);
    if (accessToken) setAccessToken(accessToken);
    if (profile?.businessId) setBusinessId(profile.businessId);

    // Take out later
    localStorage.setItem("user", JSON.stringify(profile));

    setIsAuthenticated(true);
    return { profile, redirectTo };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
