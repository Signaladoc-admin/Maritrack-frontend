"use client";

import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { childProfileSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header } from "@/shared/ui/layout/header";
import { IChildProfile } from "../types";
import { FileUpload } from "@/shared/ui/image-upload";
import { FilledUserIcon } from "@/shared/ui/icons";
import { ChevronLeft } from "lucide-react";

interface ICreateChildProfileFormProps {
  onCancel: () => void;
  onAddChild: (data: IChildProfile) => void;
  initialData?: IChildProfile;
  goToNextStep: () => void;
}

export default function CreateChildProfileForm({
  onCancel,
  onAddChild,
  initialData,
  goToNextStep,
}: ICreateChildProfileFormProps) {
  const form = useForm<z.infer<typeof childProfileSchema>>({
    resolver: zodResolver(childProfileSchema) as any,
    defaultValues: {
      name: initialData?.name || "",
      age: initialData?.age as any,
      gender: initialData?.gender as any,
    },
  });

  const onSubmit = (data: z.infer<typeof childProfileSchema>) => {
    const formattedData: IChildProfile = {
      ...data,
      id: initialData?.id,
      image: data.profileImage ? URL.createObjectURL(data.profileImage) : initialData?.image,
    };
    onAddChild(formattedData);
  };

  return (
    <div className="space-y-7">
      <Button variant="link" onClick={onCancel} className="flex items-center gap-1! px-0">
        <ChevronLeft className="h-6! w-6! text-orange-500" /> Go back
      </Button>
      <Header title="Create your child's profile" subtitle="Set up a child account" />
      <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
        <FileUpload
          value={form.watch("profileImage")}
          onChange={(file) => form.setValue("profileImage", file as File)}
          accept="image/*"
          className="h-24 w-24 rounded-full"
          previewClassName="h-full w-full rounded-full object-cover"
        >
          <div className="bg-muted flex h-full w-full items-center justify-center rounded-full border-gray-300 transition-colors hover:bg-gray-200">
            <FilledUserIcon className="h-12 w-12 text-[#1b3c73]" />
          </div>
        </FileUpload>
        <InputGroup
          label="Child name"
          placeholder="Enter name"
          {...form.register("name")}
          error={form.formState.errors.name?.message}
        />
        <div className="grid gap-x-4 gap-y-7 md:grid-cols-2">
          <InputGroup
            label="Age"
            type="number"
            placeholder="Enter age"
            {...form.register("age")}
            error={form.formState.errors.age?.message}
          />
          <Controller
            control={form.control}
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
                error={form.formState.errors.gender?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1">
            {initialData ? "Update Profile" : "Pair"}
          </Button>
        </div>
      </form>
      <div className="flex justify-center">
        <Button onClick={goToNextStep} variant="link">
          Skip for now
        </Button>
      </div>
    </div>
  );
}
