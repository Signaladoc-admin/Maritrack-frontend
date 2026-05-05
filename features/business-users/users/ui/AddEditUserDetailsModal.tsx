import { User } from "@/app/(in-app)/users/types";
import {
  useCreateTeamMember,
  useGetTeamMember,
  useUpdateTeamMember,
} from "@/entities/business/model/useTeamMembers";
import {
  BUSINESS_ROLES,
  BusinessRole,
  businessUserDetailsSchema,
  BusinessUserDetailsValues,
  UserProfile,
} from "@/entities/user/model/user.schema";
import { InputGroup } from "@/shared/ui/input-group";
import { CountryStateInput } from "@/shared/ui/inputs/country-state-input";
import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetDepartments } from "../../departments/model/useDepartments";
import { useAuth } from "@/shared/auth/AuthProvider";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast";

export default function AddEditUserDetailsModal({
  open,
  onOpenChange,
  selectedId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string | null;
}) {
  const initialValues = {
    firstName: "Obafemiii",
    lastName: "Olorede",
    department: "925149bf-810e-4594-93b8-49191485ae7d",
    businessRole: BUSINESS_ROLES[0],
    email: "obafemilared@gmail.com",
    phone: "080909121",
    address: "123 Road",
  };

  const { register, formState, handleSubmit, control, setValue } =
    useForm<BusinessUserDetailsValues>({
      defaultValues: initialValues || {
        firstName: "",
        lastName: "",
        department: "",
        businessRole: undefined,
        email: "",
        phone: "",
        address: "",
      },
      resolver: zodResolver(businessUserDetailsSchema),
    });

  const { mutateAsync: createTeamMember, isPending: isCreatingTeamMember } = useCreateTeamMember();
  const { mutateAsync: updateTeamMember, isPending: isUpdatingTeamMember } = useUpdateTeamMember();
  const { data: initialData, isLoading: isLoadingTeamMember } = useGetTeamMember(selectedId!);

  const { user } = useAuth();
  const { data: departmentsData } = useGetDepartments({
    businessId: user?.businessId!,
    search: "",
  });
  const departmentOptions = departmentsData?.departments?.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const { toast } = useToast();

  useEffect(() => {
    setValue("firstName", initialData?.user?.firstName!);
    setValue("lastName", initialData?.user?.lastName!);
    setValue("department", initialData?.staffDepartmentId!);
    setValue("businessRole", initialData?.user?.businessRole!);
    setValue("email", initialData?.user?.email!);
    setValue("phone", initialData?.user?.phone!);
    setValue("address", initialData?.location!);
  }, [initialData, setValue]);

  async function onSubmit(data: BusinessUserDetailsValues) {
    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      departmentId: data.department,
      role: data.businessRole as BusinessRole,
      location: data.address,
    };

    try {
      initialData
        ? await updateTeamMember({ id: selectedId!, ...payload })
        : await createTeamMember(payload);

      toast({
        type: "success",
        title: `User ${initialData ? "updated" : "created"} successfully`,
      });
      onOpenChange(false);
    } catch (error: any) {
      console.log("ERROR", error);
      toast({
        type: "error",
        title: error?.message || "Failed to create user",
      });
    }
  }

  const isSubmitting = isCreatingTeamMember || isLoadingTeamMember || isUpdatingTeamMember;

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={`${initialData ? "Edit" : "Add"} User Details`}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-6">
        <div className="space-y-7">
          <div className="grid gap-2 gap-y-7 sm:grid-cols-2">
            <InputGroup
              className=""
              {...register("firstName")}
              placeholder="14"
              label="First name"
              error={formState.errors.firstName?.message}
            />
            <InputGroup
              className=""
              {...register("lastName")}
              placeholder="14"
              label="Last name"
              error={formState.errors.lastName?.message}
            />
          </div>
          <Controller
            control={control}
            name="department"
            render={({ field }) => (
              <InputGroup label="Department" error={formState.errors.department?.message}>
                <SearchableSelect
                  options={departmentOptions || []}
                  placeholder="Select a department"
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </InputGroup>
            )}
          />
          <Controller
            control={control}
            name="businessRole"
            render={({ field }) => (
              <InputGroup label="Role" error={formState.errors.businessRole?.message}>
                <SearchableSelect
                  placeholder="Select a role"
                  options={[
                    { value: "ORGANIZATION_ADMIN", label: "Organization admin" },
                    { value: "DEVICE_MANAGER", label: "Device manager" },
                    { value: "DEPARTMENT_MANAGER", label: "Department manager" },
                  ]}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </InputGroup>
            )}
          />
          <InputGroup
            className=""
            {...register("email")}
            placeholder="abcde@example.com"
            label="Email"
            error={formState.errors.email?.message}
            disabled={!!initialData?.user?.email}
          />
          <InputGroup
            className=""
            {...register("phone")}
            placeholder="14"
            label="Phone"
            error={formState.errors.phone?.message}
          />
          <InputGroup
            className=""
            {...register("address")}
            placeholder="14"
            label="Address"
            error={formState.errors.address?.message}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="bg-primary w-full">
          {isSubmitting ? "Creating..." : initialData ? "Update Profile" : "Add Profile"}
        </Button>
      </form>
    </Modal>
  );
}
