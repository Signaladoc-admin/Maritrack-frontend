"use client";

import BusinessDashboard from "@/views/shared-views/dashboard/BusinessDashboard";
import ParentDashboard from "@/views/shared-views/dashboard/ParentDashboard";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  // DashboardLayout (the (in-app) route group's layout) guards on `!user` before
  // rendering children, so `user` is guaranteed to be resolved here.
  return user!.appRole === "BUSINESS" ? <BusinessDashboard /> : <ParentDashboard />;
}
