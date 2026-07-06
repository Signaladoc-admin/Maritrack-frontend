"use client";

import BusinessProfileForm from "@/views/shared-views/profile/BusinessProfileForm";
import ParentProfileForm from "@/views/shared-views/profile/ParentProfileForm";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  // DashboardLayout (the (in-app) route group's layout) guards on `!user` before
  // rendering children, so `user` is guaranteed to be resolved here.
  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-start">
        <button 
          onClick={() => router.push("/dashboard")} 
          className="flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to dashboard
        </button>
      </div>

      <div className="mx-auto max-w-2xl pt-2">
        {user!.appRole === "BUSINESS" ? <BusinessProfileForm /> : <ParentProfileForm />}
      </div>
    </div>
  );
}
