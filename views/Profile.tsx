"use client";

import BusinessProfileForm from "@/views/shared-views/profile/BusinessProfileForm";
import ParentProfileForm from "@/views/shared-views/profile/ParentProfileForm";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function Profile() {
  const { user } = useAuth();

  // DashboardLayout (the (in-app) route group's layout) guards on `!user` before
  // rendering children, so `user` is guaranteed to be resolved here.
  return user!.appRole === "BUSINESS" ? <BusinessProfileForm /> : <ParentProfileForm />;
}
