"use client";

import { useState, useEffect } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ImageUpload } from "@/shared/ui/image-upload";
import { Loader } from "@/shared/ui/loader";
import { Skeleton } from "@/shared/ui/skeleton";
import { LockKeyhole, LogOut } from "lucide-react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Modal/dialog";
import { useLogout } from "@/features/auth/model/useLogout";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useUpdateBusiness } from "../model/useBusiness";
import { useGetFullBusinessDetails } from "@/features/onboarding/business/model/useGetBusinessDetails";
import { useChangePassword } from "@/features/auth/model/useChangePassword";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";
import { InputGroup } from "@/shared/ui/input-group";
import { useToast } from "@/shared/ui/toast";

const BusinessProfileSchema = z.object({
  profilePicture: z.instanceof(File).nullable(),
  name: z.string().min(1, "Business name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Business address is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
});

type BusinessProfileFormValues = z.infer<typeof BusinessProfileSchema>;

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[a-z]/, "At least 1 lowercase letter")
      .regex(/[0-9]/, "At least 1 number")
      .regex(/[^A-Za-z0-9]/, "At least 1 symbol"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function BusinessProfileForm() {
  const { business, isLoadingBusiness, isLoadingBusinessProfile } = useGetFullBusinessDetails();

  if (isLoadingBusiness || isLoadingBusinessProfile) {
    return <BusinessProfileFormSkeleton />;
  }

  return <BusinessProfileFormInner business={business} />;
}

function BusinessProfileFormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center divide-y divide-neutral-200 *:py-10">
        <div className="w-full space-y-8 pt-0!">
          <div className="flex items-start justify-center md:justify-start">
            <Skeleton className="h-28 w-28 rounded-full" />
          </div>
          <div className="grid w-full gap-8">
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-[50px] w-full rounded-xl" />
            </div>
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
        <div className="w-full">
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
        <div className="w-full">
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function BusinessProfileFormInner({ business }: { business: any }) {
  const { mutateAsync: updateBusiness, isPending: isUpdating } = useUpdateBusiness();
  const { user } = useAuth();
  const { toast } = useToast();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [showSignOut, setShowSignOut] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(BusinessProfileSchema),
    defaultValues: {
      profilePicture: null,
      name: "",
      email: "",
      address: "",
      state: "",
      country: "",
    },
  });

  useEffect(() => {
    if (business) {
      setValue("name", business.name || "");
      setValue("email", business.email || "");
      setValue("address", business.address || "");
      setValue("state", business.state || "");
      setValue("country", business.country || "");
    }
  }, [business]);

  const onSubmit = async (data: BusinessProfileFormValues) => {
    try {
      await updateBusiness({
        id: business?.id!,
        name: data.name,
        address: data.address,
        state: data.state,
        country: data.country,
        // imageUrl: data.profilePicture || undefined,
      });
      toast({ title: "Business updated successfully", type: "success" });
    } catch (error: any) {
      toast({ title: error.message || "Failed to update business", type: "error" });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center divide-y divide-neutral-200 *:py-10"
      >
        <div className="w-full space-y-8 pt-0!">
          <div className="flex items-start justify-center gap-4 md:justify-start">
            <Controller
              name="profilePicture"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={(file) => field.onChange(file)}
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
          <div className="grid w-full gap-8">
            <Input label="Business name" placeholder="Business name here" {...register("name")} />
            <Input
              label="Email Address"
              type="email"
              {...register("email")}
              disabled
              className="cursor-not-allowed opacity-70"
            />
            <Input
              label="Address"
              placeholder="Enter street address, apt. number, etc."
              {...register("address")}
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

  const passwordValue = watch("password", "");

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      reset();
      onOpenChange(false);
    } catch {
      // error shown inline via the error prop
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
            error={errors.password?.message}
            {...register("password")}
          />

          <InputGroup
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            isPasswordValidationEnabled
            matchValue={passwordValue}
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
