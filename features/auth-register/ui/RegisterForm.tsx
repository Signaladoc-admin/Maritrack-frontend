"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Link from "next/link";
import HaveAnAccount from "../../auth/ui/HaveAnAccount";
import { useRegister } from "../model/useRegister";
import { registerSchema, type RegisterValues } from "@/entities/user/model/user.schema";
import { useNewUserStore } from "@/shared/stores/user-store";

export default function RegisterForm() {
  const { register: registerUser, isSubmitting, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const { email, password, setEmail, setPassword } = useNewUserStore();

  const onSubmit = async (data: RegisterValues) => {
    try {
      await registerUser(data);
      setEmail(data.email);
      setPassword(data.password);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">{error}</div>
      )}
      <InputGroup
        label="Email address"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <div className="space-y-2">
        <InputGroup
          label="Enter password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Link href="/forgot-password" hidden className="text-right text-sm font-medium opacity-50">
          Forgot password?
        </Link>
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
      <HaveAnAccount />
    </form>
  );
}
