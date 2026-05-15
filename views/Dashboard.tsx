"use client";

import BusinessDashboard from "@/views/shared-views/dashboard/BusinessDashboard";
import ParentDashboard from "@/views/shared-views/dashboard/ParentDashboard";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.appRole === "BUSINESS") return <BusinessDashboard />;
  else return <ParentDashboard />;
}
