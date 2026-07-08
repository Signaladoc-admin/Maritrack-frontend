"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { UserInfo, userSchema, UserFormValues } from "@/entities/user";

interface AddEditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: UserInfo;
  onSave: (data: UserFormValues) => void;
}

export const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
}) => {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      department: "",
      role: "",
      email: "",
      phoneNumber: "",
      address: "",
      state: "",
      country: "",
    },
  });

  React.useEffect(() => {
    if (open) {
      reset(initialData || {
        firstName: "",
        lastName: "",
        department: "",
        role: "",
        email: "",
        phoneNumber: "",
        address: "",
        state: "",
        country: "",
      });
    }
  }, [open, initialData, reset]);

  const onSubmit = (data: UserFormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-none rounded-3xl shadow-lg">
        <div className="bg-white p-8">
          <DialogHeader className="flex flex-row items-center justify-between mb-8">
            <DialogTitle className="text-xl font-bold text-[#1B3C73]">
              {isEdit ? "Edit user" : "Add new user"}
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="size-5" />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="First name"
                placeholder="Name here"
                {...register("firstName")}
                error={errors.firstName?.message}
              />
              <InputGroup
                label="Last name"
                placeholder="Name here"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <InputGroup
                  label="Department"
                  type="select"
                  placeholder="Select department"
                  options={[
                    { label: "Technical Team", value: "Technical Team" },
                    { label: "Operations", value: "Operations" },
                    { label: "Security", value: "Security" },
                  ]}
                  {...field}
                  error={errors.department?.message}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <InputGroup
                  label="Role"
                  type="select"
                  placeholder="Select role"
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Supervisor", value: "Supervisor" },
                  ]}
                  {...field}
                  error={errors.role?.message}
                />
              )}
            />

            <InputGroup
              label="Email adddress"
              placeholder="Email here"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              disabled={isEdit}
            />

            <InputGroup
              label="Phone number"
              placeholder="Number here"
              {...register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />

            <InputGroup
              label="Address"
              placeholder="Enter street address, apt. number, etc."
              {...register("address")}
              error={errors.address?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <InputGroup
                    label="State"
                    type="select"
                    placeholder="Lagos"
                    options={[
                      { label: "Lagos", value: "Lagos" },
                      { label: "Abuja", value: "Abuja" },
                    ]}
                    {...field}
                    error={errors.state?.message}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <InputGroup
                    label="Country"
                    type="select"
                    placeholder="Nigeria"
                    options={[
                      { label: "Nigeria", value: "Nigeria" },
                      { label: "Ghana", value: "Ghana" },
                    ]}
                    {...field}
                    error={errors.country?.message}
                  />
                )}
              />
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl bg-[#1B3C73] text-lg font-bold mt-4 hover:bg-[#152e5a]">
              {isEdit ? "Edit user" : "Add user"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
