"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Modal/dialog";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { DepartmentInfo } from "@/entities/department";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface EditDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: DepartmentInfo | null;
  onSave: (name: string) => void;
}

export const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  open,
  onOpenChange,
  department,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department?.name || "",
    },
  });

  React.useEffect(() => {
    if (open) {
      reset({ name: department?.name || "" });
    }
  }, [open, department, reset]);

  const onSubmit = (data: DepartmentFormValues) => {
    onSave(data.name);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none rounded-3xl shadow-lg">
        <div className="bg-white p-8">
          <DialogHeader className="flex flex-row items-center justify-between mb-8">
            <DialogTitle className="text-xl font-bold text-[#1B3C73]">
              Edit Department
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <X className="size-5" />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <InputGroup
              label="Department name"
              placeholder="Engineering"
              {...register("name")}
              error={errors.name?.message}
            />

            <Button type="submit" className="w-full h-14 rounded-xl bg-[#1B3C73] text-lg font-bold hover:bg-[#152e5a]">
              Save changes
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
