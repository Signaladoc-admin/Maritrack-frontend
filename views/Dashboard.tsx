"use client";

import BusinessDashboard from "@/views/shared-views/dashboard/BusinessDashboard";
import ParentDashboard from "@/views/shared-views/dashboard/ParentDashboard";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useParentZones } from "@/features/mdm-sync/model/useMdmSync";

export default function Dashboard() {
  const { user } = useAuth();

  const parent = useParentZones();

  console.log(parent);

  if (user?.appRole === "BUSINESS") return <BusinessDashboard />;
  else return <ParentDashboard />;
}
