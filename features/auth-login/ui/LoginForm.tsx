"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UserAccountTypeSelectionCard from "@/features/auth-register/ui/UserAccountTypeSelectionCard";
import { accountTypes } from "@/features/auth-register/constants";
import { loginSchema, type LoginValues } from "@/entities/user/model/user.schema";
import { useParentStore, useNewUserStore } from "@/shared/stores/user.store";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function LoginForm() {
  const router = useRouter();
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const { setParentId } = useParentStore();
  const { setEmail, setPassword } = useNewUserStore();
  const { login, loginError: error, isSubmitting } = useAuth();

  console.log(error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const { profile, redirectTo } = await login(data);

      console.log(redirectTo);
      setEmail(data.email);
      setPassword(data.password);
      if (profile?.parentId) setParentId(profile.parentId);
      router.push(redirectTo);
    } catch (err) {
      console.log(err);
      // Error handled by hook
    }
  };

  console.log(error);
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
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-muted-foreground text-right text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
      <p className="text-center text-sm">
        Are you new here?{" "}
        <Button
          type="button"
          onClick={() => setIsCreateAccountModalOpen(true)}
          variant="link"
          className="text-primary px-0 font-semibold"
        >
          Create an account
        </Button>
      </p>

      <Modal
        title="What type of account do you want to create?"
        subtitle="Create one now"
        isOpen={isCreateAccountModalOpen}
        onClose={() => setIsCreateAccountModalOpen(false)}
      >
        <div className="space-y-5">
          <UserAccountTypeSelectionCard
            icon={accountTypes.PERSONAL.icon}
            label={accountTypes.PERSONAL.label}
            description={accountTypes.PERSONAL.description}
            href="/register"
          />
          <UserAccountTypeSelectionCard
            icon={accountTypes.BUSINESS.icon}
            label={accountTypes.BUSINESS.label}
            description={accountTypes.BUSINESS.description}
            href="/business/register"
          />
        </div>
      </Modal>
    </form>
  );
}
