"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { ImageUpload } from "@/shared/ui/image-upload";
import { Loader } from "@/shared/ui/loader";
import { LockKeyhole, LogOut } from "lucide-react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useLogout } from "@/features/auth/model/useLogout";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetParent, useUpdateParent } from "../model/useParents";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";
import { InputGroup } from "@/shared/ui/input-group";
import { useToast } from "@/shared/ui/toast";
import type { ParentProfile } from "../schema";

const parentProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  gender: z.enum(["MALE", "FEMALE"]),
  address: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  profilePicture: z.any().optional().nullable(),
});

type ParentProfileFormValues = z.infer<typeof parentProfileSchema>;

// Outer shell — handles loading states only
export default function ParentProfileForm() {
  const { user, isLoading: isFetchingProfile } = useAuth();
  const { data: parent, isLoading: isFetchingParent } = useGetParent(user?.parentId!);

  if (isFetchingProfile || (!!user?.parentId && isFetchingParent)) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Once data is ready, mount the form with values baked into defaultValues —
  // same pattern as CreateChildProfileForm (no reset() needed, Select gets the
  // correct value on first mount so Radix never initialises to "").
  return <ParentProfileFormInner parent={parent} user={user} />;
}

// Inner form — only mounts after parent + user data are available
function ParentProfileFormInner({
  parent,
  user,
}: {
  parent: ParentProfile | null | undefined;
  user: any;
}) {
  const { mutateAsync: updateParent, isPending: isUpdating } = useUpdateParent();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { toast } = useToast();

  const [showSignOut, setShowSignOut] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ParentProfileFormValues>({
    resolver: zodResolver(parentProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      profilePicture: user?.imageUrl || null,
      gender: (parent?.gender as "MALE" | "FEMALE") || undefined,
      address: parent?.address || "",
      state: parent?.state || "",
      country: parent?.country || "",
    },
  });

  const onSubmit = async (data: ParentProfileFormValues) => {
    try {
      await updateParent({
        id: user?.parentId!,
        gender: data.gender,
        address: data.address ?? undefined,
        state: data.state ?? undefined,
        country: data.country ?? undefined,
      });

      toast({ title: "Profile updated successfully", type: "success" });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center divide-y divide-neutral-200 *:py-10"
      >
        <div className="w-full space-y-8">
          {/* Profile Image Section */}
          <div className="flex items-start justify-center gap-4 md:justify-start">
            <Controller
              control={control}
              name="profilePicture"
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  className="h-28 w-28 rounded-full border-none shadow-sm"
                  previewClassName="h-28 w-28 rounded-full"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#F3F4F6] text-[#1B3C73]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                      <span className="text-xl">👤</span>
                    </div>
                  </div>
                </ImageUpload>
              )}
            />
          </div>
          {/* Form Fields */}
          <div className="grid w-full gap-8">
            <div className="grid grid-cols-2 gap-6">
              <InputGroup
                label="First Name"
                placeholder="Enter first name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <InputGroup
                label="Last Name"
                placeholder="Enter last name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <InputGroup
              label="Email Address"
              type="email"
              {...register("email")}
              disabled
              className="cursor-not-allowed opacity-70"
              error={errors.email?.message}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <InputGroup
                  label="Gender"
                  type="select"
                  className="mb-0!"
                  options={[
                    { label: "Father", value: "MALE" },
                    { label: "Mother", value: "FEMALE" },
                  ]}
                  error={errors.gender?.message}
                  {...field}
                />
              )}
            />

            <InputGroup
              label="Address"
              placeholder="Enter street address, apt. number, etc."
              {...register("address")}
              error={errors.address?.message}
            />

            <CountryStateInput
              control={control}
              countryName="country"
              stateName="state"
              errors={errors}
              setValue={setValue}
            />
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
        onConfirm={() => logout()}
        variant="destructive"
        loading={isLoggingOut}
        loadingText="Signing out..."
      />
    </div>
  );
}
