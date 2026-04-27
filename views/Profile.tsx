"use client";

import BusinessProfileForm from "@/views/shared-views/profile/BusinessProfileForm";
import ParentProfileForm from "@/views/shared-views/profile/ParentProfileForm";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function Profile() {
  const { user } = useAuth();

  if (user?.appRole === "BUSINESS") return <BusinessProfileForm />;
  return <ParentProfileForm />;
}
