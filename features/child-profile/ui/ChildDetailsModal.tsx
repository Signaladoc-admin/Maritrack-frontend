"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/Button/button";
import { AddEditChildModalProps } from "../model/types";
import { FilledUserIcon } from "@/shared/ui/icons";
import { Controller, useForm } from "react-hook-form";
import { FileUpload } from "@/shared/ui/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { childProfileSchema } from "@/features/onboarding/personal/schema";
import { z } from "zod";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { InputGroup } from "@/shared/ui/input-group";

export function AddEditChildModal({ open, onOpenChange, initialData }: AddEditChildModalProps) {
  const { handleSubmit, register, control, formState } = useForm<
    z.infer<typeof childProfileSchema>
  >({
    resolver: zodResolver(childProfileSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      age: (initialData?.age as any) || "",
      gender: initialData?.gender as any,
      profileImage: initialData?.profileImage || undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof childProfileSchema>) => {
    const formattedData: IChildProfile = {
      ...data,
      id: initialData?.id,
      image: data.profileImage ? URL.createObjectURL(data.profileImage) : initialData?.image,
    };

    console.log(formattedData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#1B3C73]">
            {initialData
              ? `Edit ${initialData?.name || "Child"}'s Details`
              : `Create Child Profile`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          {/* Avatar Placeholder */}
          <Controller
            control={control}
            name="profileImage"
            render={({ field }) => (
              <div className="space-y-2">
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  accept="image/*"
                  className="h-18 w-18 rounded-full"
                  previewClassName="h-full w-full rounded-full object-cover"
                >
                  <div className="bg-muted flex h-full w-full items-center justify-center rounded-full border-gray-300 transition-colors hover:bg-gray-200">
                    <FilledUserIcon className="h-8 w-8 text-[#1b3c73]" />
                  </div>
                </FileUpload>
                {formState.errors.profileImage && (
                  <p className="text-destructive text-sm">
                    {String(formState.errors.profileImage.message)}
                  </p>
                )}
              </div>
            )}
          />

          <div className="space-y-4">
            <div className="space-y-2">
              <InputGroup
                {...register("name")}
                placeholder="Name here"
                label="Child name"
                error={formState.errors.name?.message}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <InputGroup
                  {...register("age")}
                  placeholder="14"
                  label="Age"
                  error={formState.errors.age?.message}
                />
              </div>
              <div className="space-y-2">
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <InputGroup
                      label="Gender"
                      type="select"
                      className="mb-0!"
                      options={[
                        { label: "Male", value: "MALE" },
                        { label: "Female", value: "FEMALE" },
                      ]}
                      error={formState.errors.gender?.message}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-[#1B3C73]">
              {initialData ? "Save Changes" : "Create Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
