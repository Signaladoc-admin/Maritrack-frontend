import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessDetailsSchema, BusinessDetailsSchemaValues } from "../schema";
import { InputGroup } from "@/shared/ui/input-group";
import { H4 } from "@/shared/ui/typography";
import { MultiTagInput } from "@/shared/ui/inputs/multi-tag-input";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect, useRef } from "react";
import {
  useCreateBusinessProfile,
  useUpdateBusinessProfile,
} from "@/entities/business/model/useBusinessProfile";
import { useToast } from "@/shared/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { BusinessProfile } from "@/entities/business/types";
import { useAuth } from "@/shared/auth/AuthProvider";

function BusinessDetailsFormSkeleton() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Business profile textarea */}
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>

      {/* Departments */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-40" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-[50px] w-full rounded-xl" />
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-32" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-[50px] w-full rounded-xl" />
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

export default function BusinessDetailsForm({
  onNext,
  businessProfile,
  isLoadingBusinessProfile,
}: {
  onNext: () => void;
  businessProfile?: BusinessProfile;
  isLoadingBusinessProfile: boolean;
}) {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BusinessDetailsSchemaValues>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      profile: "",
      type: undefined,
      departments: [],
      locations: [],
    },
    mode: "onTouched",
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useAuth();
  const businessId = user?.businessId;

  const { mutateAsync: createBusinessProfile } = useCreateBusinessProfile();
  const { mutateAsync: updateBusinessProfile } = useUpdateBusinessProfile();

  const isLoading = isLoadingBusinessProfile;

  // Seed the form once everything has loaded.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current || isLoading) return;
    reset({
      profile: businessProfile?.profile ?? "",
      type: (businessProfile as any)?.type ?? undefined,
      departments: businessProfile?.departments ?? [],
      locations: businessProfile?.locations ?? [],
    });
    seededRef.current = true;
  }, [isLoading, businessProfile, reset]);

  if (isLoading) {
    return <BusinessDetailsFormSkeleton />;
  }

  async function onSubmit(data: BusinessDetailsSchemaValues) {
    
    if (!businessId) {
      toast({ type: "error", title: "Error", message: "Missing business context" });
      return;
    }

    try {
      await (businessProfile
        ? updateBusinessProfile({ id: businessProfile.id, profile: data.profile, type: data.type, departments: data.departments, locations: data.locations })
        : createBusinessProfile({ profile: data.profile, type: data.type, departments: data.departments, locations: data.locations }));

      // Invalidate current business to refresh profile info
      queryClient.invalidateQueries({ queryKey: ["businesses"] });

      toast({
        type: "success",
        title: "Success",
        message: businessProfile
          ? "Business profile updated successfully"
          : "Business profile created successfully",
      });

      onNext();
    } catch (error: any) {
      toast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to save business profile",
      });
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <Header
          className="text-center"
          title="Set up your business"
          subtitle="Give us more info about your business"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <InputGroup
          label="Business profile"
          type="textarea"
          placeholder="Enter your business profile"
          {...register("profile")}
          error={errors.profile?.message}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <InputGroup
              label="Business type"
              type="select"
              placeholder="Select your business type"
              options={[
                { value: "DEVICE_FINANCING", label: "Device Financing" },
                { value: "ENTERPRISE_DEVICE_MANAGEMENT", label: "Enterprise Device Management" },
              ]}
              error={errors.type?.message}
              {...field}
            />
          )}
        />

        <div>
          <H4 className="text-primary mb-6">Departments (optional)</H4>
          <Controller
            control={control}
            name="departments"
            render={({ field }) => (
              <MultiTagInput
                label="Department name"
                placeholder="Department name here"
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.departments?.message}
              />
            )}
          />
        </div>
        <div>
          <H4 className="text-primary mb-6">Locations (optional)</H4>
          <Controller
            control={control}
            name="locations"
            render={({ field }) => (
              <MultiTagInput
                label="Location name"
                placeholder="Location name here"
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.locations?.message}
              />
            )}
          />
        </div>
        <Button disabled={isSubmitting} className="w-full">
          Next
        </Button>
      </form>
    </div>
  );
}
