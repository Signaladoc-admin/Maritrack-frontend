import { create } from "zustand";
import {
  MessageCircle,
  Clapperboard,
  Youtube,
  Instagram,
  Twitter,
  Gamepad2,
  Twitch,
} from "lucide-react";

export interface Child {
  id: string;
  name: string;
  avatar?: string;
}

export interface AppData {
  name: string;
  time: string;
  icon: any;
  bg: string;
  iconClass: string;
}

export interface AlertData {
  type: "success" | "warning" | "danger";
  title: string;
  message: string;
}

export interface DashboardData {
  stats: {
    screenTime: string;
    screenTimeTrend: { value: number; positive: boolean; label: string };
    battery: string;
    batteryTrend: { value: number; positive: boolean; label: string };
    screenTimeChart: number[];
    batteryChart: number[];
  };
  apps: AppData[];
  alert: AlertData;
}

interface UserState {
  selectedChildId: string;
  children: Child[];
  setSelectedChildId: (id: string) => void;
  setChildren: (children: Child[]) => void;
  getDashboardData: () => DashboardData;
}

interface NewUserState {
  email: string;
  password: string;
  token: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setToken: (token: string) => void;
  clearCredentials: () => void;
}

// Mock icon for Spotify if needed, or just use generic
const MusicIcon = Gamepad2;

const MOCK_DATA: Record<string, DashboardData> = {
  all: {
    stats: {
      screenTime: "4h 20",
      screenTimeTrend: { value: 10, positive: true, label: "better than yesterday" },
      battery: "60%",
      batteryTrend: { value: 10, positive: false, label: "than yesterday" },
      screenTimeChart: [30, 45, 60, 40, 70, 50, 80],
      batteryChart: [80, 75, 70, 65, 62, 61, 60],
    },
    apps: [
      {
        name: "WhatsApp",
        time: "2h 33mins",
        icon: MessageCircle,
        bg: "bg-[#25D366]",
        iconClass: "text-white fill-white",
      },
      {
        name: "Netflix",
        time: "1h 45mins",
        icon: Clapperboard,
        bg: "bg-black",
        iconClass: "text-[#E50914]",
      },
      {
        name: "Youtube",
        time: "1h 20mins",
        icon: Youtube,
        bg: "bg-[#FF0000]",
        iconClass: "text-white fill-white",
      },
      {
        name: "Instagram",
        time: "50mins",
        icon: Instagram,
        bg: "bg-gradient-to-tr from-[#FFD600] via-[#FF0169] to-[#D300C5]",
        iconClass: "text-white",
      },
      {
        name: "X",
        time: "45mins",
        icon: Twitter,
        bg: "bg-black",
        iconClass: "text-white fill-white",
      },
    ],
    alert: {
      type: "success",
      title: "All children are within limits",
      message: "No alerts triggered today",
    },
  },
  solomon: {
    stats: {
      screenTime: "2h 15",
      screenTimeTrend: { value: 5, positive: true, label: "less than yesterday" },
      battery: "72%",
      batteryTrend: { value: 2, positive: true, label: "better usage" },
      screenTimeChart: [10, 20, 30, 15, 25, 40, 35],
      batteryChart: [90, 85, 80, 78, 75, 74, 72],
    },
    apps: [
      {
        name: "Roblox",
        time: "1h 10mins",
        icon: Gamepad2,
        bg: "bg-red-500",
        iconClass: "text-white",
      },
      {
        name: "Youtube Kids",
        time: "45mins",
        icon: Youtube,
        bg: "bg-[#FF0000]",
        iconClass: "text-white fill-white",
      },
      {
        name: "Minecraft",
        time: "20mins",
        icon: Gamepad2,
        bg: "bg-green-600",
        iconClass: "text-white",
      },
    ],
    alert: {
      type: "warning",
      title: "Solomon approaching limit",
      message: "15 mins remaining for Games",
    },
  },
  kuroebi: {
    stats: {
      screenTime: "1h 45",
      screenTimeTrend: { value: 12, positive: true, label: "significant drop" },
      battery: "55%",
      batteryTrend: { value: 15, positive: false, label: "heavy usage" },
      screenTimeChart: [50, 40, 30, 20, 10, 5, 60], // Spike today
      batteryChart: [100, 90, 80, 70, 60, 58, 55],
    },
    apps: [
      {
        name: "Twitch",
        time: "1h 00mins",
        icon: Twitch,
        bg: "bg-purple-600",
        iconClass: "text-white",
      },
      {
        name: "Discord",
        time: "30mins",
        icon: MessageCircle,
        bg: "bg-[#5865F2]",
        iconClass: "text-white",
      },
      {
        name: "Spotify",
        time: "15mins",
        icon: MusicIcon, // Need to import or mock
        bg: "bg-[#1DB954]",
        iconClass: "text-black",
      },
    ],
    alert: {
      type: "danger",
      title: "Kuroebi exceeded screen time",
      message: "Over limit by 30 mins",
    },
  },
};

export const useUserStore = create<UserState>((set, get) => ({
  selectedChildId: "all",
  children: [
    { id: "solomon", name: "Solomon" },
    { id: "kuroebi", name: "Kuroebi" },
  ],
  setSelectedChildId: (id) => set({ selectedChildId: id }),
  setChildren: (children) => set({ children }),
  getDashboardData: () => {
    const { selectedChildId } = get();
    return MOCK_DATA[selectedChildId] || MOCK_DATA.all;
  },
}));

export const useNewUserStore = create<NewUserState>((set) => ({
  email: "",
  password: "",
  token: null,
  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setToken: (token: string) => set({ token }),
  clearCredentials: () => set({ email: "", password: "", token: null }),
}));
