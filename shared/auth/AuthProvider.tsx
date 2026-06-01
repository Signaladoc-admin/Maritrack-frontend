import type { BusinessRole } from "@/entities/user/model/user.schema";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { jwtDecode } from "jwt-decode";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { PageLoader } from "../ui/loader";
import { AuthUserProfile } from "@/entities/user";
import type { LoginResponse } from "@/features/auth-login/types";

import { useNewUserStore } from "@/shared/stores/user.store";

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
  zoneId: string | null;
};

export function getTokenPayload(token: string): UserPayload | null {
  try {
    return jwtDecode<UserPayload>(token);
  } catch {
    return null;
  }
}

interface AuthContextType {
  user: AuthUserProfile | null;
  login: (_credentials: {
    email: string;
    password: string;
  }) => Promise<{ data: LoginResponse | null; message: string }>;
  logout: () => void;
  resetLoginError: () => void;
  isSubmitting: boolean;
  loginError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  // NUDGE: Remove userMeta temporary state when session restore gets unified on backend
  const [userMeta, setUserMeta] = useState<{
    businessId: string | null;
    parentId: string | null;
    zoneId: string | null;
    role: "USER" | "ADMIN" | undefined;
    businessRole: BusinessRole | null;
  } | null>(null);

  const { data: userProfile } = useUserProfile()

  const userPayload = accessToken ? getTokenPayload(accessToken) : null;
  // NUDGE: Remove userMeta temporary fallback when session restore gets unified on backend
  const userRole = userMeta?.businessRole ?? userMeta?.role ?? userPayload?.businessRole ?? userPayload?.role;
  const appRole = userRole === "USER" ? "PARENT" : "BUSINESS";

  // NUDGE: Remove userMeta temporary reconstruction when session restore gets unified on backend
  const activeUser = accessToken && userPayload ? {
    id: userPayload.id,
    role: userMeta?.role ?? userPayload.role ?? "USER",
    businessRole: userMeta?.businessRole ?? userPayload.businessRole ?? null,
    email: userPayload.email,
    parentId: userMeta ? userMeta.parentId : userPayload.parentId,
    businessId: userMeta ? userMeta.businessId : userPayload.businessId,
    imageUrl: userPayload.imageUrl || null,
    zoneId: userMeta ? userMeta.zoneId : userPayload.zoneId,
    appRole: appRole,
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    date: user?.date ?? new Date().toISOString(),
    isFirstLogin: user?.isFirstLogin ?? false,
    access_token_expires_on: user?.access_token_expires_on ?? "",
    refresh_token: user?.refresh_token ?? "",
  } as AuthUserProfile : null;

  const { login, isSubmitting, error: loginError, mutation } = useLogin();

  const logout = () => {
    setAccessToken(null);
    setUserMeta(null);
    setUser(null);
    useNewUserStore.getState().clearCredentials();
  };

  // On mount: restore token from cookie, or refresh if expired
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const sessionRes = await fetch("/api/session", { credentials: "include" });
        if (cancelled) return;
        if (sessionRes.ok) {
          const { accessToken: cookieToken, userMeta: restoredMeta } = await sessionRes.json();
          const payload = getTokenPayload(cookieToken);
          if (payload?.exp && payload.exp * 1000 > Date.now() + 60_000) {
            setAccessToken(cookieToken);
            if (restoredMeta) {
              setUserMeta(restoredMeta);
            }
            return;
          }
        }

        if (cancelled) return;
        const res = await fetch("/api/refresh", { method: "POST", credentials: "include" });
        if (cancelled) return;
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken: refreshedToken, userMeta: restoredMeta } = await res.json();
        setAccessToken(refreshedToken);
        if (restoredMeta) {
          setUserMeta(restoredMeta);
        }
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
        const { accessToken: newToken, userMeta: restoredMeta } = await res.json();
        setAccessToken(newToken);
        if (restoredMeta) {
          setUserMeta(restoredMeta);
        }
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
    const { data, accessToken: newToken, message } = await login({ email, password });
    if (newToken) setAccessToken(newToken);
    if (data) {
      setUserMeta({
        businessId: data.businessId,
        parentId: data.parentId,
        zoneId: data.zoneId,
        role: data.role,
        businessRole: data.businessRole,
      });
      setUser(data);
    }
    return { data, message };
  }

  return (
    <AuthContext.Provider
      value={{
        user: activeUser,
        logout,
        login: handleLogin,
        resetLoginError: mutation.reset,
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