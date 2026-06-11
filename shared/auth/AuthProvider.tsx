import type { BusinessRole } from "@/entities/user/model/user.schema";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "@/features/auth-login/model/useLogin";
import { jwtDecode } from "jwt-decode";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { PageLoader } from "../ui/loader";
import { AuthUserProfile } from "@/entities/user";
import type { LoginResponse } from "@/features/auth-login/types";

import { useNewUserStore } from "@/shared/stores/user.store";

// The decoded access token JWT is the single source of truth for the authenticated
// user's identity. zoneId is now embedded in every token (including refreshed ones),
// so it is read directly from the payload — no separate cookie state needed.

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
  // True while we're restoring/validating the session on mount (via /api/session, falling
  // back to /api/refresh). Gates the initial render so we don't flash unauthenticated UI.
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const { data: userProfile, isLoading: isLoadingUserProfile } = useUserProfile();

  // Gate the initial render on the profile fetch too — appRole-based view selection
  // (e.g. BusinessDashboard vs ParentDashboard) reads `user`, and rendering before the
  // profile resolves leaves a window where `user` is unsettled and the wrong view can
  // briefly slip in.
  const isUserLoading = isAuthLoading || isLoadingUserProfile;

  const userPayload = accessToken ? getTokenPayload(accessToken) : null;
  const appRole: "PARENT" | "BUSINESS" = userPayload?.businessId ? "BUSINESS" : "PARENT";

  const activeUser: AuthUserProfile | null = userPayload
    ? {
        id: userPayload.id,
        email: userPayload.email,
        role: userPayload.role ?? "USER",
        businessRole: userPayload.businessRole,
        parentId: userPayload.parentId,
        businessId: userPayload.businessId,
        zoneId: userPayload.zoneId,
        imageUrl: userPayload.imageUrl,
        appRole,
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
      }
    : null;

  const { login, isSubmitting, error: loginError, mutation } = useLogin();

  const logout = () => {
    setAccessToken(null);
    useNewUserStore.getState().clearCredentials();
  };

  // On mount: restore token from cookie, or refresh if expired
  useEffect(() => {
    const controller = new AbortController();

    async function init() {
      try {
        const sessionRes = await fetch("/api/session", {
          credentials: "include",
          signal: controller.signal,
        });
        if (sessionRes.ok) {
          const { accessToken: cookieToken } = await sessionRes.json();
          const payload = getTokenPayload(cookieToken);
          if (payload?.exp && payload.exp * 1000 > Date.now() + 60_000) {
            setAccessToken(cookieToken);
            return;
          }
        }

        const res = await fetch("/api/refresh", {
          method: "POST",
          credentials: "include",
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Refresh failed");
        const { accessToken: refreshedToken } = await res.json();
        setAccessToken(refreshedToken);
      } catch {
        if (!controller.signal.aborted) logout();
      } finally {
        if (!controller.signal.aborted) setIsAuthLoading(false);
      }
    }

    init();
    return () => controller.abort();
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
        // Background refresh failed — do NOT logout. The current token is still valid
        // for the remaining ~60 s. When it actually expires, apiClient's 401 handler
        // will call refreshAccessToken() and redirect to /login if that also fails.
      }
    }, msUntilRefresh);

    return () => clearTimeout(timer);
  }, [accessToken]);

  if (isUserLoading) {
    return <PageLoader />;
  }

  async function handleLogin({ email, password }: { email: string; password: string }) {
    const { data, accessToken: newToken, message } = await login({ email, password });
    if (newToken) {
      setAccessToken(newToken);
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
