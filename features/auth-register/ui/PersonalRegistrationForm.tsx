"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parentRegistrationFormSchema, ParentRegistrationFormValues } from "../schema";
import { useRouter } from "next/navigation";
import HaveAnAccount from "@/features/auth/ui/HaveAnAccount";
import { useRegisterParent } from "../model/useRegisterParent";
import { genderOptions } from "@/lib/constants/shared";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { ChevronLeft } from "lucide-react";
import { useNewUserStore } from "@/shared/stores/user-store";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";

export default function PersonalRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ParentRegistrationFormValues>({
    resolver: zodResolver(parentRegistrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
      address: "",
      country: "",
      state: "",
    },
    mode: "onTouched",
  });

  const { registerParent, isSubmitting, error } = useRegisterParent();
  const { setEmail, setPassword, setToken } = useNewUserStore();

  const passwordValue = watch("password");
  const confirmValue = watch("confirmPassword");

  useEffect(() => {
    if (confirmValue.length === 0) return;
    if (confirmValue === passwordValue) {
      clearErrors("confirmPassword");
    } else {
      setError("confirmPassword", { message: "Passwords do not match" });
    }
  }, [passwordValue, confirmValue, setError, clearErrors]);

  const handleNextStep = async () => {
    const isValid = await trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ]);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: ParentRegistrationFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("role", "USER");
    formData.append("status", "ACTIVE");
    formData.append("gender", data.gender);
    formData.append("address", data.address);
    formData.append("country", data.country);
    formData.append("state", data.state);

    const res: any = await registerParent(formData);

    setEmail(data.email);
    setPassword(data.password);
    if (res?.token) {
      setToken(res.token);
    }

    router.push("/login");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (
      e.key === "Enter" &&
      step === 1 &&
      (target.tagName === "INPUT" || target.tagName === "SELECT")
    ) {
      e.preventDefault();
      handleNextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-7">
      {error && (
        <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">{error}</div>
      )}
      {step === 1 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <InputGroup
              label="First name"
              type="text"
              placeholder="First name here"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <InputGroup
              label="Last name"
              type="text"
              placeholder="Last name here"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <InputGroup
            label="Email"
            type="email"
            placeholder="Email here"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputGroup
            type="password"
            label="Password"
            placeholder="Password here"
            isEnabled
            {...register("password")}
            error={errors.password?.message}
          />
          <InputGroup
            type="password"
            label="Confirm password"
            placeholder="Confirm password here"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button type="button" onClick={handleNextStep} className="w-full">
            Next
          </Button>
          <HaveAnAccount />
        </>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-7 duration-300">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex shrink-0 items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            <h3 className="text-xl font-semibold">Basic Information</h3>
          </div>

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <InputGroup label="Gender" error={errors.gender?.message}>
                <SearchableSelect
                  options={genderOptions}
                  placeholder="Select Gender"
                  value={field.value}
                  onValueChange={field.onChange}
                  isSearchable={false}
                />
              </InputGroup>
            )}
          />

          <InputGroup
            label="Address"
            type="text"
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

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Complete Registration"}
          </Button>
        </div>
      )}
    </form>
  );
}
