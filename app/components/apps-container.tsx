"use client";

import { useState } from "react";
import { AllAppsCard } from "@/shared/ui/dashboard/all-apps-card";
import { AppDetailsView } from "@/shared/ui/dashboard/app-details-view";
import { FaWhatsapp, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiNetflix } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

// Define interface here and start using consistent types if possible,
// but for now I'll just match the props expected by children.
// Children expect { id, name, icon, ... }
// I will update children next.

export interface AppData {
  id: string;
  name: string;
  icon: React.ReactNode;
  usage: string;
  limit: string;
  status: "active" | "blocked";
}

const MOCK_APPS: AppData[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp className="h-full w-full text-green-500" />,
    usage: "2h 33mins",
    limit: "Limits: 1",
    status: "active",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: <SiNetflix className="h-full w-full text-red-600" />,
    usage: "2h 33mins",
    limit: "Limits: 1",
    status: "active",
  },
  {
    id: "youtube",
    name: "Youtube",
    icon: <FaYoutube className="h-full w-full text-red-600" />,
    usage: "2h 33mins",
    limit: "Limits: 1",
    status: "active",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <FaInstagram className="h-full w-full text-pink-600" />,
    usage: "2h 33mins",
    limit: "Limits: 1",
    status: "active",
  },
  {
    id: "x",
    name: "X",
    icon: <FaXTwitter className="h-full w-full text-slate-900 dark:text-white" />,
    usage: "2h 33mins",
    limit: "Limits: 1",
    status: "active",
  },
];

export function AppsContainer() {
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

  return (
    <div className="bg-white p-4 dark:bg-slate-900">
      {selectedApp ? (
        <AppDetailsView app={selectedApp} onBack={() => setSelectedApp(null)} />
      ) : (
        <AllAppsCard apps={MOCK_APPS} onViewApp={setSelectedApp} />
      )}
    </div>
  );
}
