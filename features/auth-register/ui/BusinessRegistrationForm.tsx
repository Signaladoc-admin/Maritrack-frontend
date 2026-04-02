"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRegisterBusiness } from "../model/useRegisterBusiness";
import { useRouter } from "next/navigation";
import { businessRegistrationFormSchema, BusinessRegistrationFormValues } from "../schema";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";

export default function BusinessRegistrationForm() {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessRegistrationFormValues>({
    resolver: zodResolver(businessRegistrationFormSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      estimatedDevices: "",
      organizationSize: undefined,
      country: "",
      state: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });
  const { registerBusiness, isSubmitting } = useRegisterBusiness();
  const router = useRouter();

  const onSubmit = async (data: BusinessRegistrationFormValues) => {
    // it uses normal req body
    const payload = {
      name: data.businessName,
      firstName: data.businessName,
      lastName: data.businessName,
      email: data.businessEmail,
      organizationSize: data.organizationSize,
      adminBusinessRole: "ORGANIZATION_ADMIN",
      estimatedDevices: Number(data.estimatedDevices),
      country: data.country,
      state: data.state,
      password: data.password,
    };
    console.log("submitting...");
    await registerBusiness(payload);
    // router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      <InputGroup
        label="Business name"
        type="text"
        placeholder="Business name here"
        {...register("businessName")}
        error={errors.businessName?.message}
      />
      <InputGroup
        label="Business email"
        type="email"
        placeholder="Email here"
        {...register("businessEmail")}
        error={errors.businessEmail?.message}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="organizationSize"
          render={({ field }) => (
            <InputGroup
              label="Organization size"
              type="select"
              placeholder="Select your organization size"
              options={[
                { value: "SIZE_1_9", label: "1-9" },
                { value: "SIZE_10_49", label: "10-49" },
                { value: "SIZE_50_PLUS", label: "50+" },
              ]}
              error={errors.organizationSize?.message}
              {...field}
            />
          )}
        />
        <InputGroup
          label="Estimated number of devices"
          type="number"
          min={1}
          placeholder="10"
          {...register("estimatedDevices")}
          error={errors.estimatedDevices?.message}
        />
      </div>
      <CountryStateInput
        control={control}
        countryName="country"
        stateName="state"
        errors={errors}
        setValue={setValue}
      />

      <InputGroup
        label="Create password"
        type="password"
        placeholder="Password"
        isPasswordValidationEnabled
        {...register("password")}
        error={errors.password?.message}
      />
      <InputGroup
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <Button className="w-full" disabled={isSubmitting}>
        Next
      </Button>
    </form>
  );
}
