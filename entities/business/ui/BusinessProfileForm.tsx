"use client";

import React, { useState, useEffect } from "react";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ImageUpload } from "@/shared/ui/image-upload";
import { Loader } from "@/shared/ui/loader";
import { LockKeyhole, LogOut } from "lucide-react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useLogout } from "@/features/auth/model/useLogout";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useUpdateBusiness } from "../model/useBusiness";

export default function BusinessProfileForm() {
  const { data: userProfile, isLoading: isFetchingProfile } = useUserProfile();
  const { mutate: updateBusiness, isPending: isUpdating } = useUpdateBusiness();
  const { user } = useAuth();

  console.log(user);

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    profilePicture: null as File | string | null,
    // Placeholders for design matching
    businessAddress: "",
    state: "",
    country: "",
  });

  const [showSignOut, setShowSignOut] = useState(false);

  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: userProfile.email || "",
        status: userProfile.status || "",
        profilePicture: userProfile.imageUrl || null,
      }));
    }
  }, [userProfile]);

  if (isFetchingProfile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusiness({
      name: formData.businessName,
      email: formData.businessEmail,
      businessAddress: formData.businessAddress,
      profilePicture: formData.profilePicture,
    } as any);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center divide-y divide-neutral-200 *:py-10"
      >
        <div className="w-full space-y-8">
          {/* Profile Image Section */}
          <div className="flex items-start justify-center gap-4 md:justify-start">
            <ImageUpload
              value={formData.profilePicture}
              onChange={(file) => handleInputChange("profilePicture", file)}
              className="h-28 w-28 rounded-full border-none shadow-sm"
              previewClassName="h-28 w-28 rounded-full"
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F3F4F6] text-[#1B3C73]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-xl">👤</span>
                </div>
              </div>
            </ImageUpload>
          </div>
          {/* Form Fields */}
          <div className="grid w-full gap-8">
            <Input
              label="Business name"
              placeholder="Business name here"
              value={formData.businessName}
              onValueChange={(val) => handleInputChange("firstName", val)}
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.businessEmail}
              disabled
              className="cursor-not-allowed opacity-70"
            />

            <Input
              label="Address"
              placeholder="Enter street address, apt. number, etc."
              value={formData.businessAddress}
              onValueChange={(val) => handleInputChange("address", val)}
            />
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="State"
                type="select"
                value={formData.state}
                onValueChange={(val) => handleInputChange("state", val)}
                placeholder="Lagos"
                options={[
                  { label: "Lagos", value: "Lagos" },
                  { label: "Abuja", value: "Abuja" },
                ]}
              />
              <Input
                label="Country"
                type="select"
                value={formData.country}
                onValueChange={(val) => handleInputChange("country", val)}
                placeholder="Nigeria"
                options={[{ label: "Nigeria", value: "Nigeria" }]}
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="w-full">
          <div className="flex w-full items-center gap-6 rounded-2xl bg-[#F9FAFB] p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <LockKeyhole className="h-6 w-6 text-[#1B3C73]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#1B3C73]">Your password is secured</h3>
              <Button
                type="button"
                className="mt-2 h-9 bg-[#1B3C73] px-4 text-xs font-medium text-white hover:bg-[#1B3C73]/90"
              >
                Change password
              </Button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-[#1B3C73] text-lg font-semibold text-white transition-all hover:bg-[#1B3C73]/90 active:scale-[0.98]"
            disabled={isUpdating}
          >
            {isUpdating ? <Loader size="sm" className="border-white" /> : "Save Changes"}
          </Button>
        </div>
      </form>

      <Button
        variant="ghost"
        className="group px-0 transition-colors duration-300 hover:bg-transparent"
        onClick={() => setShowSignOut(true)}
        disabled={isLoggingOut}
      >
        <div className="flex items-center justify-center rounded-full bg-neutral-100 p-2.5 transition-colors duration-300 group-hover:bg-red-500">
          <LogOut className="h-4 w-4 text-red-500 transition-colors duration-300 group-hover:text-white" />
        </div>
        <span className="font-medium transition-colors duration-300 group-hover:text-red-500">
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </span>
      </Button>

      <ConfirmationModal
        open={showSignOut}
        onOpenChange={setShowSignOut}
        title="Are you sure you want to sign out?"
        confirmText="Sign out"
        onConfirm={logout}
        variant="destructive"
        loading={isLoggingOut}
        loadingText="Signing out..."
      />
    </div>
  );
}
