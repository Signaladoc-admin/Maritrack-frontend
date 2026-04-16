import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  businessId: string | null;
  setAccessToken: (token: string) => void;
  setBusinessId: (id: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      businessId: null,

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: true,
        }),

      setBusinessId: (id) => set({ businessId: id }),

      logout: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          businessId: null,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist businessId — accessToken lives in httpOnly cookies,
      // isAuthenticated is derived at runtime from the cookie/refresh check.
      partialize: (state) => ({ businessId: state.businessId }),
    }
  )
);
