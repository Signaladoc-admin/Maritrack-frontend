import { useRouter } from "next/navigation";
import type { BusinessRole, UserProfile } from "@/entities/user/model/user.schema";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { jwtDecode } from "jwt-decode";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { PageLoader } from "../ui/loader";

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
  } catch {
    return null;
  }
}

type User = UserProfile & {
  appRole: "PARENT" | "BUSINESS";
  userRole: BusinessRole | "USER" | "ADMIN";
};

interface AuthContextType {
  user: User | null;
  login: (_credentials: {
    email: string;
    password: string;
  }) => Promise<{ profile: UserProfile | null; redirectTo: string }>;
  logout: () => void;
  isSubmitting: boolean;
  loginError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const userPayload = accessToken ? getTokenPayload(accessToken) : null;
  const userRole = userPayload?.businessRole ?? userPayload?.role;
  const appRole = userRole === "USER" ? "PARENT" : "BUSINESS";

  const { data: userProfile } = useUserProfile();

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

  const { login, isSubmitting, error: loginError } = useLogin();

  const logout = () => setAccessToken(null);

  // On mount: restore token from cookie, or refresh if expired
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const sessionRes = await fetch("/api/session", { credentials: "include" });
        if (cancelled) return;
        if (sessionRes.ok) {
          const { accessToken: cookieToken } = await sessionRes.json();
          const payload = getTokenPayload(cookieToken);
          if (payload?.exp && payload.exp * 1000 > Date.now() + 60_000) {
            setAccessToken(cookieToken);
            return;
          }
        }

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

  // Schedule a silent refresh 1 minute before the token expires
  useEffect(() => {
    if (!accessToken) return;

    const payload = getTokenPayload(accessToken);
    if (!payload?.exp) return;

    const msUntilRefresh = payload.exp * 1000 - Date.now() - 60_000;
    if (msUntilRefresh <= 0) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/refresh", { method: "POST", credentials: "include" });
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken: newToken } = await res.json();
        setAccessToken(newToken);
      } catch {
        logout();
      }
    }, msUntilRefresh);

    return () => clearTimeout(timer);
  }, [accessToken]);

  if (!isHydrated) {
    return <PageLoader />;
  }

  async function handleLogin({ email, password }: { email: string; password: string }) {
    const { profile, accessToken: newToken, redirectTo } = await login({ email, password });
    if (newToken) setAccessToken(newToken);
    return { profile, redirectTo };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        login: handleLogin,
        isSubmitting,
        loginError: loginError || null,
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
