"use client";

import BusinessProfileForm from "@/entities/business/ui/BusinessProfileForm";
import ParentProfileForm from "@/entities/parents/ui/ParentProfileForm";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function ProfilePage() {
  const { appRole } = useAuth();

  if (appRole === "BUSINESS") return <BusinessProfileForm />;
}
