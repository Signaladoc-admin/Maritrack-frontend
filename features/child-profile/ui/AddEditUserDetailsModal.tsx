import { User } from "@/app/(in-app)/users/types";
import {
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

export default function AddEditUserDetailsModal({
  open,
  onOpenChange,
  initialData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: UserProfile & {
    role: string;
    department: string;
    address: string;
    country: string;
    state: string;
  };
}) {
  const { register, formState, handleSubmit, control, setValue } =
    useForm<BusinessUserDetailsValues>({
      defaultValues: {
        firstName: "",
        lastName: "",
        department: "",
        businessRole: undefined,
        email: "",
        phone: "",
        address: "",
        country: "",
        state: "",
      },
      resolver: zodResolver(businessUserDetailsSchema),
    });

  useEffect(() => {
    setValue("firstName", initialData?.firstName!);
    setValue("lastName", initialData?.lastName!);
    setValue("department", initialData?.department!);
    setValue("businessRole", initialData?.businessRole!);
    setValue("email", initialData?.email!);
    setValue("phone", initialData?.phone!);
    setValue("address", initialData?.address!);
    setValue("country", initialData?.country!);
    setValue("state", initialData?.state!);
  }, [initialData]);
  async function onSubmit(data: BusinessUserDetailsValues) {
    console.log(data);
  }
  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Edit User Details"
      confirmText="Save Changes"
      onConfirm={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
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
          <InputGroup
            className=""
            {...register("department")}
            placeholder="14"
            label="Department"
            error={formState.errors.department?.message}
          />
          <Controller
            control={control}
            name="businessRole"
            render={({ field }) => (
              <InputGroup
                label="Role"
                type="select"
                placeholder="Select a role"
                options={[
                  { value: "ORGANIZATION_ADMIN", label: "Organization admin" },
                  { value: "DEVICE_MANAGER", label: "Device manager" },
                  { value: "DEPARTMENT_MANAGER", label: "Department manager" },
                ]}
                error={formState.errors.businessRole?.message}
                {...field}
              />
            )}
          />
          <InputGroup
            className=""
            {...register("email")}
            placeholder="abcde@example.com"
            label="Email"
            error={formState.errors.email?.message}
            disabled
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

          <CountryStateInput
            className="w-full"
            control={control}
            countryName="country"
            stateName="state"
            errors={formState.errors}
            setValue={setValue}
          />
        </div>

        {/* <Button className="bg-primary w-full">
          {initialData ? "Save Changes" : "Create Profile"}
        </Button> */}
      </form>
    </Modal>
  );
}
