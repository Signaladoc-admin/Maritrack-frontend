import { createLocationSchema, CreateLocationValues } from "../schema";

import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateLocation, useGetLocation, useUpdateLocation } from "../model/useLocations";
import { useToast } from "@/shared/ui/toast";
import { useAuth } from "@/shared/auth/AuthProvider";
import { Button } from "@/shared/ui/button";

export default function AddEditLocationModal({
  open,
  onOpenChange,
  selectedId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string;
}) {
  const { register, formState, handleSubmit, setValue } = useForm<CreateLocationValues>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createLocationSchema),
  });

  // If selectedId is truthy, fetch the department data for updating
  const { data: initialData, isLoading: isGettingLocation } = useGetLocation(selectedId);

  const { mutateAsync: createLocation, isPending: isCreatingLocation } = useCreateLocation();
  const { mutateAsync: updateLocation, isPending: isUpdatingLocation } = useUpdateLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const businessId = user?.businessId;

  useEffect(() => {
    setValue("name", initialData?.name || "");
  }, [initialData, setValue, open]);

  async function onSubmit(data: CreateLocationValues) {
    try {
      if (initialData) {
        await updateLocation({ id: initialData.id, ...data });
      } else {
        await createLocation({ ...data, businessId: businessId! });
      }

      toast({
        type: "success",
        title: "Success",
        message: `Location ${initialData ? "updated" : "created"} successfully`,
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

  const isSubmitting = isCreatingLocation || isUpdatingLocation || isGettingLocation;

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title={`${initialData ? "Edit" : "New"} Location`}
      onConfirm={handleSubmit(onSubmit)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
        <div className="space-y-7">
          <InputGroup
            className=""
            {...register("name")}
            placeholder="Lekki"
            label="Location title"
            error={formState.errors.name?.message}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? "Save Changes" : "Add location"}
        </Button>
      </form>
    </Modal>
  );
}
