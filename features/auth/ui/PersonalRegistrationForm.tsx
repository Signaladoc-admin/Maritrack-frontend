"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalRegistrationFormSchema, PersonalRegistrationFormValues } from "../schema";
import { useRouter } from "next/navigation";
import HaveAnAccount from "./HaveAnAccount";
import { useRegister } from "@/features/auth-register/model/useRegister";

export default function PersonalRegistrationForm() {
  const router = useRouter();
  const form = useForm<PersonalRegistrationFormValues>({
    resolver: zodResolver(personalRegistrationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, isSubmitting, error } = useRegister();

  const onSubmit = (data: PersonalRegistrationFormValues) => {
    console.log(data);
    const payload = { ...data, role: "USER", status: "ACTIVE" };
    register(payload);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <InputGroup
          label="First name"
          type="text"
          placeholder="First name here"
          {...form.register("firstName")}
          error={form.formState.errors.firstName?.message}
        />
        <InputGroup
          label="Last name"
          type="text"
          placeholder="Last name here"
          {...form.register("lastName")}
          error={form.formState.errors.lastName?.message}
        />
      </div>
      <InputGroup
        label="Email"
        type="email"
        placeholder="Email here"
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
      <InputGroup
        type="password"
        label="Password"
        placeholder="Password here"
        {...form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <InputGroup
        type="password"
        label="Confirm password"
        placeholder="Confirm password here"
        {...form.register("confirmPassword")}
        error={form.formState.errors.confirmPassword?.message}
      />

      <Button type="submit" className="w-full">
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
      <HaveAnAccount />
    </form>
  );
}
