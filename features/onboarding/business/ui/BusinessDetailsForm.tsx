import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessDetailsSchema, BusinessDetailsSchemaValues } from "../schema";
import { InputGroup } from "@/shared/ui/input-group";
import { H4 } from "@/shared/ui/typography";
import { MultiTagInput } from "@/shared/ui/inputs/multi-tag-input";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";
import {
  useCreateBusinessProfile,
  useGetBusiness,
  useUpdateBusinessProfile,
} from "@/entities/business/model/useBusiness";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/stores/auth.store";

export default function BusinessDetailsForm({ onNext }: { onNext: () => void }) {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BusinessDetailsSchemaValues>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      profile: "",
      departments: [],
      locations: [],
    },
    mode: "onTouched",
  });

  const businessId = useAuthStore((s) => s.businessId);
  console.log(businessId);
  const { data: business } = useGetBusiness(businessId!);
  const businessProfile = business?.profile;
  console.log(business);

  const { createBusinessProfile, isSubmitting } = useCreateBusinessProfile();

  const { updateBusinessProfile } = useUpdateBusinessProfile();

  useEffect(() => {
    if (businessProfile) {
      reset({
        profile: businessProfile.profile,
        departments: businessProfile.departments,
        locations: businessProfile.locations,
      });
    }
  }, [businessProfile, reset]);

  async function onSubmit(data: BusinessDetailsSchemaValues) {
    const res = businessProfile
      ? await updateBusinessProfile({ id: businessProfile.id, ...data })
      : await createBusinessProfile(data);
    if (res.status === true) onNext();
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
