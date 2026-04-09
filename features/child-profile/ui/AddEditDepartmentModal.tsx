import { Department } from "@/app/(in-app)/users/types";
import { departmentSchema, DepartmentValues } from "@/entities/user/model/user.schema";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
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

  useEffect(() => {
    setValue("name", initialData?.name);
  }, [initialData]);

  async function onSubmit(data: DepartmentValues) {
    console.log(data);
  }

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={`${initialData ? "Edit" : "New"} Department`}
      confirmText={initialData ? "Save Changes" : "Add department"}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <div className="space-y-7">
          <InputGroup
            className=""
            {...register("name")}
            placeholder="14"
            label="Department name"
            error={formState.errors.name?.message}
          />
        </div>
      </form>
    </Modal>
  );
}
