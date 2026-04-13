import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessDetailsSchema, BusinessDetailsSchemaValues } from "../schema";
import { InputGroup } from "@/shared/ui/input-group";
import { H4 } from "@/shared/ui/typography";
import { MultiTagInput } from "@/shared/ui/inputs/multi-tag-input";
import { Button } from "@/shared/ui/button";
import { Header } from "@/shared/ui/layout/header";

export default function BusinessDetailsForm({
  onNext,
  onAddBusinessDetails,
  businessDetails,
}: {
  businessDetails?: BusinessDetailsSchemaValues;
  onNext: () => void;
  onAddBusinessDetails: (businessData: any) => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BusinessDetailsSchemaValues>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      businessProfile: businessDetails?.businessProfile ?? "",
      departments: businessDetails?.departments ?? [],
      locations: businessDetails?.locations ?? [],
    },
    mode: "onTouched",
  });

  async function onSubmit(data: BusinessDetailsSchemaValues) {
    onAddBusinessDetails(data);
    onNext();
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
          {...register("businessProfile")}
          error={errors.businessProfile?.message}
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
        <Button className="w-full">Next</Button>
      </form>
    </div>
  );
}
