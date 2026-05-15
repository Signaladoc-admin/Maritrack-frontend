"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { InputGroup } from "@/shared/ui/input-group";
import { useMarkDeviceAsReturned } from "@/entities/device/model/useDevices";
import { useToast } from "@/shared/ui/toast";

const schema = z.object({
  flagReason: z.string().min(1, "Please provide a reason for returning this asset"),
});

type FormValues = z.infer<typeof schema>;

interface MarkAsReturnedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceId: string;
}

export function MarkAsReturnedModal({ open, onOpenChange, deviceId }: MarkAsReturnedModalProps) {
  const { toast } = useToast();

  const { mutateAsync: markAsReturned, isPending } = useMarkDeviceAsReturned(deviceId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { flagReason: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await markAsReturned(data.flagReason);
      toast({ title: "Success", message: "Device marked as returned", type: "success" });
      reset();
      onOpenChange(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          message: error.message || "Failed to mark device as returned",
          type: "error",
        });
      }
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="z-99999 max-w-md rounded-2xl p-8">
        <div className="space-y-6">
          {/* Warning icon */}

          <svg
            className="size-10"
            width="50"
            height="44"
            viewBox="0 0 50 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M47.4998 29.7175L32.7198 5.0825C30.7798 1.85 27.8123 0 24.5723 0C21.3323 0 18.3648 1.85 16.4248 5.0775L1.64477 29.7175C-0.320227 32.99 -0.535226 36.48 1.05727 39.2925C2.64727 42.1075 5.75227 43.7225 9.57227 43.7225H39.5723C43.3923 43.7225 46.4973 42.1075 48.0873 39.295C49.6773 36.4825 49.4648 32.9925 47.4998 29.7175ZM24.5723 35.095C22.4373 35.095 20.6973 33.3575 20.6973 31.2225C20.6973 29.085 22.4348 27.345 24.5723 27.345C26.7098 27.345 28.4473 29.085 28.4473 31.2225C28.4473 33.3575 26.7073 35.095 24.5723 35.095ZM28.6548 16.535C28.6273 16.6125 25.1523 25.205 25.1523 25.205C25.0573 25.44 24.8273 25.595 24.5748 25.595C24.3223 25.595 24.0923 25.44 23.9973 25.205L20.5198 16.61C20.3111 16.0891 20.2017 15.5337 20.1973 14.9725C20.1973 12.56 22.1598 10.5975 24.5723 10.5975C25.2808 10.5993 25.9783 10.773 26.605 11.1037C27.2317 11.4343 27.7688 11.912 28.1702 12.4959C28.5717 13.0798 28.8255 13.7523 28.9099 14.4558C28.9943 15.1593 28.9067 15.8728 28.6548 16.535Z"
              fill="#D95D55"
            />
          </svg>

          {/* Header */}
          <div className="mb-6 space-y-1.5">
            <h2 className="text-primary text-xl font-semibold">Mark as returned asset?</h2>
            <p className="text-sm text-[#667085]">
              Are you sure you want to mark this asset as returned?
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputGroup
              label="Why is this asset returned?"
              type="textarea"
              placeholder="Reason here"
              error={errors.flagReason?.message}
              {...register("flagReason")}
            />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                className="h-12 w-full rounded-xl text-sm font-medium"
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                className="h-12 w-full rounded-xl text-sm font-medium"
                disabled={isPending}
              >
                {isPending ? "Marking..." : "Mark as returned"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
