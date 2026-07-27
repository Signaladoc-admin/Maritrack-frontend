import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useBulkActionDevices } from "@/entities/device";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";
import { TriangleAlert } from "lucide-react";

interface BulkMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
}

export default function BulkMessageModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
}: BulkMessageModalProps) {
  const [message, setMessage] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const { mutate: sendBulkMessage, isPending } = useBulkActionDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Bulk message sent successfully",
        type: "success",
      });
      setMessage("");
      setIsConfirming(false);
      if (onSuccess) onSuccess();
      onOpenChange(false);
    },
  });

  const handleConfirmClick = () => {
    if (!message.trim()) {
      toast({
        title: "Validation Error",
        message: "Message cannot be empty",
        type: "error",
      });
      return;
    }
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

    setIsConfirming(true);
  };

  const handleSend = () => {
    const ids = selectedDevices.map((d) => d.mdmDeviceId || d.device?.mdmDeviceId || d.id);
    const validIds = ids.filter(Boolean);

    sendBulkMessage({
      ids: validIds,
      actionId: 3,
      messageText: message,
    });
  };

  // Reset state when closing
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setIsConfirming(false);
    }
    onOpenChange(isOpen);
  };

  const getPillNames = () => {
    const names = new Set<string>();
    selectedDevices.forEach((device) => {
      const name =
        device.possessorName ||
        (device.currentUser
          ? `${device.currentUser.firstName} ${device.currentUser.lastName}`
          : null);
      if (name && name.trim() !== "undefined undefined") {
        names.add(name.trim());
      }
    });

    const uniqueNames = Array.from(names);
    if (uniqueNames.length === 0) {
       uniqueNames.push("Selected Devices");
    }

    const visibleNames = uniqueNames.slice(0, 1);
    const remainingCount = uniqueNames.length - 1;

    return { visibleNames, remainingCount };
  };

  const { visibleNames, remainingCount } = getPillNames();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 sm:p-8 gap-6 border-none shadow-xl">
        {!isConfirming ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#1b3c73]">
                New Bulk Messages
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Send to:</span>
                {visibleNames.map((name, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 font-medium whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 font-medium whitespace-nowrap">
                    +{remainingCount}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">Message</span>
                <div className="relative">
                  <textarea
                    className="w-full h-[150px] p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-gray-400 text-sm"
                    placeholder="Write message..."
                    maxLength={300}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <span className="absolute bottom-4 right-4 text-xs font-medium text-gray-500">
                    {message.length} / 300
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex items-center justify-end gap-3 sm:justify-end mt-2">
              <Button
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="text-[#1b3c73] hover:bg-gray-50 bg-[#F3F4F6]"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmClick}
                className="bg-[#1b3c73] hover:bg-[#142d57] text-white px-8"
                disabled={isPending}
              >
                Send message
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-6 py-4">
            <TriangleAlert className="size-16 text-[#1b3c73] fill-[#1b3c73]/10" strokeWidth={1.5} />
            <h2 className="text-2xl font-semibold text-[#1b3c73] max-w-[300px]">
              Are you sure you want to send this message?
            </h2>
            <div className="flex w-full gap-4 mt-4">
              <Button
                variant="secondary"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 h-12 text-base font-medium"
                onClick={() => setIsConfirming(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#1b3c73] hover:bg-[#142d57] text-white h-12 text-base font-medium"
                onClick={handleSend}
                disabled={isPending}
              >
                {isPending ? <Loader className="text-white" /> : "Send message"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
