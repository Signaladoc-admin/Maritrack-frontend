"use client";

import React, { useState } from "react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { ImageUpload } from "@/shared/ui/image-upload";
import { Loader } from "@/shared/ui/loader";
import { Skeleton } from "@/shared/ui/skeleton";
import { LockKeyhole, LogOut } from "lucide-react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog";
import { useLogout } from "@/features/auth/model/useLogout";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetParent, useUpdateParent } from "../model/useParents";
import { useChangePassword } from "@/features/auth/model/useChangePassword";
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

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[a-z]/, "At least 1 lowercase letter")
      .regex(/[0-9]/, "At least 1 number")
      .regex(/[^A-Za-z0-9]/, "At least 1 symbol"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// Outer shell — handles loading states only
export default function ParentProfileForm() {
  const { user } = useAuth();
  const { data: parent, isLoading: isFetchingParent } = useGetParent(user?.parentId!);

  if (isFetchingParent) {
    return <ParentProfileFormSkeleton />;
  }

  return <ParentProfileFormInner parent={parent} user={user} />;
}

function ParentProfileFormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center divide-y divide-neutral-200 *:py-10">
        {/* Profile image + fields */}
        <div className="w-full space-y-8">
          <div className="flex items-start justify-center md:justify-start">
            <Skeleton className="h-28 w-28 rounded-full" />
          </div>
          <div className="grid w-full gap-8">
            {/* Gender select */}
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
            {/* Address */}
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
            {/* Country + State */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-[50px] w-full rounded-xl" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-[50px] w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Password section */}
        <div className="w-full">
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
        {/* Save button */}
        <div className="w-full">
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
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
  const { toast } = useToast();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [showSignOut, setShowSignOut] = useState(false);

  const [showChangePassword, setShowChangePassword] = useState(false);

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
    <div className="mx-auto max-w-2xl">
      {/* <Header title="Profile" subtitle="Manage your profile settings" /> */}
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
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <InputGroup
                  label="What gender of parent are you?"
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
                onClick={() => setShowChangePassword(true)}
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
            {isUpdating ? <Loader size="sm" className="[&_svg]:text-white" /> : "Save Changes"}
          </Button>
        </div>
      </form>

      <Button
        variant="ghost"
        className="group px-0 transition-colors duration-300 hover:bg-transparent"
        onClick={() => setShowSignOut(true)}
        disabled={isLoggingOut}
      >
        <div className="flex items-center justify-center rounded-full bg-neutral-100 p-2.5 transition-colors duration-300 group-hover:bg-[#D95D55]">
          <LogOut className="h-4 w-4 text-[#D95D55] transition-colors duration-300 group-hover:text-white" />
        </div>
        <span className="font-medium transition-colors duration-300 group-hover:text-[#D95D55]">
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

      <ChangePasswordModal open={showChangePassword} onOpenChange={setShowChangePassword} />
    </div>
  );
}

function ChangePasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { changePassword, isSubmitting, error } = useChangePassword();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const newPasswordValue = watch("newPassword", "");

  const onSubmit = async (data: ChangePasswordFormValues) => {
    const res = await changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    if (res.success) {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1B3C73]">
            Change password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <InputGroup
            label="Current password"
            type="password"
            placeholder="Enter current password"
            error={errors.oldPassword?.message}
            {...register("oldPassword")}
          />

          <InputGroup
            label="New password"
            type="password"
            placeholder="Enter new password"
            isPasswordValidationEnabled
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />

          <InputGroup
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            isPasswordValidationEnabled
            matchValue={newPasswordValue}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {error && <p className="text-destructive text-sm">{error}</p>}

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#1B3C73] text-base font-semibold text-white hover:bg-[#1B3C73]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader size="sm" className="[&_svg]:text-white" /> : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
