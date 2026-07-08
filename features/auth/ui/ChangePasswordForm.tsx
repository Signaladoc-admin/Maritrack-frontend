"use client";

import { DialogHeader } from "@/shared/ui/dialog";
import { InputGroup } from "@/shared/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../model/useChangePassword";
import z from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/Modal/dialog";
import { Loader } from "@/shared/ui/loader";
import { Button } from "@/shared/ui/button";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "At least 1 uppercase letter")
      .regex(/[a-z]/, "At least 1 lowercase letter")
      .regex(/[0-9]/, "At least 1 number")
      .regex(/[^A-Za-z0-9]/, "At least 1 symbol"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#1B3C73]">
            Change password
          </DialogTitle>
        </DialogHeader>
        <ChangePasswordForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}

export function ChangePasswordForm({
  onOpenChange,
  onSuccess,
}: {
  // Optional so the form works both inside the modal (closes it) and on a standalone
  // page (no dialog to close — uses `onSuccess` to navigate instead).
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const { changePassword, isSubmitting, error } = useChangePassword();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: ChangePasswordFormValues) => {
    await changePassword({
      oldPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    reset();
    onOpenChange?.(false);
    onSuccess?.();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <InputGroup
        label="Current password"
        type="password"
        placeholder="Enter current password"
        error={errors.oldPassword?.message}
        {...register("oldPassword")}
      />

      <InputGroup
        label="New password"
        type="password"
        placeholder="Enter new password"
        isPasswordValidationEnabled
        error={errors.password?.message}
        {...register("password")}
      />

      <InputGroup
        label="Confirm new password"
        type="password"
        placeholder="Confirm new password"
        isPasswordValidationEnabled
        matchValue={passwordValue}
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {error && <p className="text-destructive text-sm">{error}</p>}

      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-[#1B3C73] text-base font-semibold text-white hover:bg-[#1B3C73]/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader size="sm" className="[&_svg]:text-white" /> : "Save"}
      </Button>
    </form>
  );
}
