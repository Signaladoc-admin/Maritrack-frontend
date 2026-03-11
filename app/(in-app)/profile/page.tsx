"use client";

import React, { useState, useEffect } from "react";
import { useUserProfile, useUpdateProfile } from "@/entities/user/model/useUserProfile";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ImageUpload } from "@/shared/ui/image-upload";
import { Loader } from "@/shared/ui/loader";
import { LockKeyhole } from "lucide-react";

export default function ProfilePage() {
  const { data: userProfile, isLoading: isFetchingProfile } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    profilePicture: null as File | string | null,
    // Placeholders for design matching
    gender: "",
    address: "",
    state: "",
    country: "",
  });

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
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      status: formData.status,
      profilePicture: formData.profilePicture,
    });
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center gap-4">
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
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onValueChange={(val) => handleInputChange("firstName", val)}
            />
            <Input
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastName}
              onValueChange={(val) => handleInputChange("lastName", val)}
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            disabled
            className="cursor-not-allowed opacity-70"
          />

          <Input
            label="What gender of parent are you?"
            type="select"
            value={formData.status}
            onValueChange={(val) => handleInputChange("status", val)}
            options={[
              { label: "Mother", value: "MOTHER" },
              { label: "Father", value: "FATHER" },
              { label: "Other", value: "OTHER" },
            ]}
          />

          <Input
            label="Address"
            placeholder="Enter street address, apt. number, etc."
            value={formData.address}
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

        {/* Password Section */}
        <div className="mt-4 flex w-full items-center gap-6 rounded-2xl bg-[#F9FAFB] p-6">
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

        {/* Submit Button */}
        <div className="mt-4 w-full">
          <Button
            type="submit"
            className="h-14 w-full rounded-2xl bg-[#1B3C73] text-lg font-semibold text-white transition-all hover:bg-[#1B3C73]/90 active:scale-[0.98]"
            disabled={isUpdating}
          >
            {isUpdating ? <Loader size="sm" className="border-white" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
