import { departmentSchema, DepartmentValues } from "@/entities/user/model/user.schema";
import {
  useCreateDepartment,
  useGetDepartment,
  useUpdateDepartment,
} from "@/features/business-users/departments/model/useDepartments";
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
  selectedId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string;
}) {
  const { register, formState, handleSubmit, setValue } = useForm<DepartmentValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(departmentSchema),
  });

  // If selectedId is truthy, fetch the department data for updating
  const { data: initialData, isLoading: isGettingDepartment } = useGetDepartment(selectedId);

  const { mutateAsync: createDepartment, isPending: isCreatingDepartment } = useCreateDepartment();
  const { mutateAsync: updateDepartment, isPending: isUpdatingDepartment } = useUpdateDepartment();
  const { toast } = useToast();
  const { user } = useAuth();
  const businessId = user?.businessId;

  useEffect(() => {
    setValue("name", initialData?.name || "");
  }, [initialData, setValue, open]);

  async function onSubmit(data: DepartmentValues) {
    try {
      if (initialData) {
        await updateDepartment({ id: initialData.id, ...data });
      } else {
        if (!businessId) {
          throw new Error("Business ID is required to create a department");
        }
        await createDepartment({
          ...data,
          businessId,
          zone: user?.zoneId || "",
          mdmDepartmentId: "",
          description: ""
        });
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

  const isSubmitting = isCreatingDepartment || isUpdatingDepartment || isGettingDepartment;

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
