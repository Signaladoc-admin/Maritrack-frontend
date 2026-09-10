import React from "react";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useBulkActionDevices } from "@/entities/device";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";
import { TriangleAlert } from "lucide-react";

interface BulkActionConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
  actionType: "wipe" | "lock" | "unlock";
}

const ACTION_CONFIG = {
  wipe: {
    actionId: 8,
    title: "Are you sure you want to wipe these devices?",
    buttonText: "Wipe Devices",
    successMessage: "Devices wiped successfully",
    isDestructive: true,
  },
  lock: {
    actionId: 401,
    title: "Are you sure you want to lock these devices?",
    buttonText: "Lock devices",
    successMessage: "Devices locked successfully",
    isDestructive: true,
  },
  unlock: {
    actionId: 201,
    title: "Are you sure you want to unlock these devices?",
    buttonText: "Unlock Devices",
    successMessage: "Devices unlocked successfully",
    isDestructive: false,
  },
};

export default function BulkActionConfirmModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
  actionType,
}: BulkActionConfirmModalProps) {
  const { toast } = useToast();
  const config = ACTION_CONFIG[actionType];

  const { mutate: sendBulkAction, isPending } = useBulkActionDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: config.successMessage,
        type: "success",
      });
      if (onSuccess) onSuccess();
      onOpenChange(false);
    },
  });

  const handleAction = () => {
    const ids = selectedDevices.map((d) => d.mdmDeviceId || d.device?.mdmDeviceId || d.id);
    const validIds = ids.filter(Boolean);

    if (validIds.length === 0) {
      toast({
        title: "Error",
        message: "No valid devices selected",
        type: "error",
      });
      return;
    }

    sendBulkAction({
      ids: validIds,
      actionId: config.actionId,
    });
  };

  const iconColor = config.isDestructive ? "text-[#d9534f] fill-[#d9534f]/10" : "text-[#1b3c73] fill-[#1b3c73]/10";
  const buttonColor = config.isDestructive ? "bg-[#d9534f] hover:bg-[#c9302c]" : "bg-[#1b3c73] hover:bg-[#142d57]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 sm:p-8 gap-6 border-none shadow-xl">
        <div className="flex flex-col items-center text-center gap-6 py-4">
          <TriangleAlert className={`size-16 ${iconColor}`} strokeWidth={1.5} />
          <h2 className="text-2xl font-semibold text-[#1b3c73] max-w-[350px]">
            {config.title}
          </h2>
          <div className="flex w-full gap-4 mt-4">
            <Button
              variant="secondary"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 h-12 text-base font-medium"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              className={`flex-1 text-white h-12 text-base font-medium ${buttonColor}`}
              onClick={handleAction}
              disabled={isPending}
            >
              {isPending ? <Loader className="text-white" /> : config.buttonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
