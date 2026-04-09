import { Location } from "@/app/(in-app)/users/types";
import { roleSchema, RoleValues } from "@/entities/user/model/user.schema";
import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddEditRoleModal({
  open,
  onOpenChange,
  initialData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Location;
}) {
  const { register, formState, handleSubmit, setValue } = useForm<RoleValues>({
    defaultValues: {
      role: "",
    },
    resolver: zodResolver(roleSchema),
  });

  useEffect(() => {
    setValue("role", initialData?.name);
  }, [initialData]);

  async function onSubmit(data: RoleValues) {
    console.log(data);
  }

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={`${initialData ? "Edit" : "New"} Role`}
      confirmText={initialData ? "Save Changes" : "Add role"}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <div className="space-y-7">
          <InputGroup
            className=""
            {...register("role")}
            placeholder="Lekki"
            label="Role title"
            error={formState.errors.role?.message}
          />
        </div>
      </form>
    </Modal>
  );
}
