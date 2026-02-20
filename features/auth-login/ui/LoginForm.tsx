"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import Link from "next/link";
import { useState } from "react";
import UserAccountTypeSelectionCard from "../../auth/ui/UserAccountTypeSelectionCard";
import { accountTypes } from "../../auth/constants";
import { useLogin } from "../model/useLogin";
import { loginSchema, type LoginValues } from "@/entities/user/model/user.schema";
import { useRouter } from "next/navigation";
import { useNewUserStore } from "@/shared/stores/user-store";
import { useIsOnboarded } from "@/entities/user/model/useIsOnboarded";

export default function LoginForm() {
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const { login, isSubmitting, error } = useLogin();
  const router = useRouter();
  const { setEmail, setPassword } = useNewUserStore();
  const { checkAndRedirect } = useIsOnboarded();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const profile = await login(data);
      setEmail(data.email);
      setPassword(data.password);

      console.log(profile);
      checkAndRedirect(profile);
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
          className="text-primary font-semibold"
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
            href="/register/personal"
          />
          <UserAccountTypeSelectionCard
            icon={accountTypes.BUSINESS.icon}
            label={accountTypes.BUSINESS.label}
            description={accountTypes.BUSINESS.description}
            href="/register/business"
          />
        </div>
      </Modal>
    </form>
  );
}
