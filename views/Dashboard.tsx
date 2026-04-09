"use client";

import BusinessDashboard from "@/views/sub-views/dashboard/BusinessDashboard";
import ParentDashboard from "@/views/sub-views/dashboard/ParentDashboard";
import { useAuth } from "@/shared/auth/AuthProvider";
import { Loader } from "@/shared/ui/loader";

export default function Dashboard() {
  const { appRole, isLoading } = useAuth();

  if (isLoading) return <Loader size="lg" />;

  if (appRole === "BUSINESS") return <BusinessDashboard />;
  else return <ParentDashboard />;
}
