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
import {
  useGetDepartments,
  useCreateDepartment,
  useDeleteDepartment,
} from "@/features/business-users/departments/model/useDepartments";
import {
  useGetLocations,
  useCreateLocation,
  useDeleteLocation,
} from "@/features/business-users/locations/model/useLocations";

/**
 * Reconciles a list of tag names against the existing entities behind them. Names that
 * aren't backed by an entity yet get created; entities whose name was removed get deleted.
 * A rename therefore reads as a delete + create (a fresh entity, by design). Used to keep
 * departments and locations — which are real entities with ids — in sync with the simple
 * string tags the form edits.
 */
async function reconcileNamedEntities<T extends { id: string; name: string }>({
  submitted,
  existing,
  create,
  remove,
}: {
  submitted: string[];
  existing: T[];
  create: (name: string) => Promise<unknown>;
  remove: (id: string) => Promise<unknown>;
}) {
  const submittedNames = submitted.map((name) => name.trim()).filter(Boolean);
  const existingNames = existing.map((entity) => entity.name);

  const toCreate = submittedNames.filter((name) => !existingNames.includes(name));
  const toRemove = existing.filter((entity) => !submittedNames.includes(entity.name));

  await Promise.all([
    ...toCreate.map((name) => create(name)),
    ...toRemove.map((entity) => remove(entity.id)),
  ]);
}

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
      departments: [],
      locations: [],
    },
    mode: "onTouched",
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { user } = useAuth();
  const businessId = user?.businessId;

  // Departments and locations are real entities (id/createdAt/…), so they're fetched and
  // saved through their own endpoints — NOT as the string arrays the business-profiles
  // endpoint stores. The form still edits them as simple name tags; we map to/from entities.
  const { data: departmentsData, isLoading: isLoadingDepartments } = useGetDepartments(
    { businessId: businessId!, page: 1, limit: 100 },
    { enabled: !!businessId }
  );
  const { data: locationsData, isLoading: isLoadingLocations } = useGetLocations(
    { businessId: businessId!, page: 1, limit: 100 },
    { enabled: !!businessId }
  );

  const existingDepartments = departmentsData?.departments ?? [];
  const existingLocations = locationsData?.locations ?? [];

  const { mutateAsync: createBusinessProfile } = useCreateBusinessProfile();
  const { mutateAsync: updateBusinessProfile } = useUpdateBusinessProfile();
  const { mutateAsync: createDepartment } = useCreateDepartment();
  const { mutateAsync: deleteDepartment } = useDeleteDepartment();
  const { mutateAsync: createLocation } = useCreateLocation();
  const { mutateAsync: deleteLocation } = useDeleteLocation();

  const isLoading = isLoadingBusinessProfile || isLoadingDepartments || isLoadingLocations;

  // Seed the form once everything has loaded. Guarded so a background refetch (which our
  // own create/delete mutations trigger) can't clobber the user's in-progress tag edits.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current || isLoading) return;
    reset({
      profile: businessProfile?.profile ?? "",
      departments: existingDepartments.map((department) => department.name),
      locations: existingLocations.map((location) => location.name),
    });
    seededRef.current = true;
  }, [isLoading, businessProfile, existingDepartments, existingLocations, reset]);

  if (isLoading) {
    return <BusinessDetailsFormSkeleton />;
  }

  async function onSubmit(data: BusinessDetailsSchemaValues) {
    if (!businessId) {
      toast({ type: "error", title: "Error", message: "Missing business context" });
      return;
    }

    try {
      // Three independent saves: (1) profile-only to business-profiles, plus (2) departments
      // and (3) locations reconciled as standalone entities through their own endpoints.
      await Promise.all([
        businessProfile
          ? updateBusinessProfile({ id: businessProfile.id, profile: data.profile })
          : createBusinessProfile({ profile: data.profile }),
        reconcileNamedEntities({
          submitted: data.departments ?? [],
          existing: existingDepartments,
          create: (name) => createDepartment({ name, businessId }),
          remove: (id) => deleteDepartment(id),
        }),
        reconcileNamedEntities({
          submitted: data.locations ?? [],
          existing: existingLocations,
          create: (name) => createLocation({ name, businessId }),
          remove: (id) => deleteLocation(id),
        }),
      ]);

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
