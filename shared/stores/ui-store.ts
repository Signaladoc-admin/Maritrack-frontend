import { create } from "zustand";

interface UIState {
  mobileBackHref: string | null;
  mobileBackLabel: string | null;
  setMobileBack: (label: string | null, href?: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileBackHref: null,
  mobileBackLabel: null,
  setMobileBack: (label, href) => set({ mobileBackLabel: label, mobileBackHref: href ?? null }),
}));
