import { Department } from "@/app/(in-app)/users/types";
import { departmentSchema, DepartmentValues } from "@/entities/user/model/user.schema";
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "@/features/departments/model/useDepartments";
import { useAuth } from "@/shared/auth/AuthProvider";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { useToast } from "@/shared/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddEditDepartmentModal({
  open,
  onOpenChange,
  initialData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Department;
}) {
  const { register, formState, handleSubmit, setValue } = useForm<DepartmentValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(departmentSchema),
  });

  const { mutateAsync: createDepartment, isPending: isCreatingDepartment } = useCreateDepartment();
  const { mutateAsync: updateDepartment, isPending: isUpdatingDepartment } = useUpdateDepartment();
  const { toast } = useToast();
  const { user } = useAuth();
  const businessId = user?.businessId;

  useEffect(() => {
    setValue("name", initialData?.name);
  }, [initialData]);

  async function onSubmit(data: DepartmentValues) {
    try {
      if (initialData) {
        await updateDepartment({ id: initialData.id, ...data });
      } else {
        await createDepartment({ ...data, businessId: businessId! });
      }

      toast({
        type: "success",
        title: "Success",
        message: `Department ${initialData ? "updated" : "created"} successfully`,
      });

      onOpenChange(false);
    } catch (error: any) {
      toast({
        type: "error",
        title: "Error",
        message: error.message || "Failed to save department",
      });
    }
  }

  const isSubmitting = isCreatingDepartment || isUpdatingDepartment;
  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={`${initialData ? "Edit" : "New"} Department`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-6">
        <div className="space-y-7">
          <InputGroup
            className=""
            {...register("name")}
            label="Department name"
            placeholder="Enter department name"
            error={formState.errors.name?.message}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Save Changes" : "Add department"}
        </Button>
      </form>
    </Modal>
  );
}
