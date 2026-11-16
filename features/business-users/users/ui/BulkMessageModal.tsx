"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/Modal/dialog";
import { useBulkMessageDevices } from "@/entities/device";
import { useToast } from "@/shared/ui/toast";
import {
  MessageSquare,
  Send,
  Loader2,
  Users,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface BulkMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
}

const MESSAGE_TYPE_LABELS: Record<string, string> = {
  WELCOME: "Welcome",
  PAYMENT_REMINDER: "Payment Reminder",
  PAYMENT_DUE: "Payment Due",
  OVERDUE_NOTICE: "Overdue Notice",
  FINAL_WARNING: "Final Warning",
  DEVICE_LOCKED: "Device Locked",
  DEVICE_UNLOCKED: "Device Unlocked",
  DEVICE_RESTRICTED: "Device Restricted",
};

export default function BulkMessageModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
}: BulkMessageModalProps) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("WELCOME");
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const { mutate: sendBulkMessage, isPending } = useBulkMessageDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: "Bulk message broadcast dispatched successfully",
        type: "success",
      });
      setMessage("");
      setIsConfirming(false);
      if (onSuccess) onSuccess();
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast({
        title: "Broadcast Failed",
        message: err?.message || "Failed to send broadcast message",
        type: "error",
      });
    },
  });

  const getValidIds = () => {
    const ids = selectedDevices.map((d) => d.mdmDeviceId || d.device?.mdmDeviceId || d.id);
    return ids.filter(Boolean);
  };

  const handleConfirmClick = () => {
    if (!message.trim()) {
      toast({
        title: "Validation Error",
        message: "Message content cannot be empty",
        type: "error",
      });
      return;
    }
    const validIds = getValidIds();
    if (validIds.length === 0) {
      toast({
        title: "Validation Error",
        message: "No valid devices selected",
        type: "error",
      });
      return;
    }

    setIsConfirming(true);
  };

  const handleSend = () => {
    const validIds = getValidIds();
    sendBulkMessage({
      ids: validIds,
      messageType,
      message: message.trim(),
    });
  };

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
          ? `${device.currentUser.firstName || ""} ${device.currentUser.lastName || ""}`.trim()
          : null) ||
        device.name ||
        device.model ||
        device.imei;
      if (name && name.trim() !== "undefined undefined") {
        names.add(name.trim());
      }
    });

    const uniqueNames = Array.from(names);
    if (uniqueNames.length === 0) {
      uniqueNames.push("Selected Devices");
    }

    const visibleNames = uniqueNames.slice(0, 2);
    const remainingCount = uniqueNames.length - visibleNames.length;

    return { visibleNames, remainingCount, totalUnique: uniqueNames.length };
  };

  const { visibleNames, remainingCount } = getPillNames();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl border border-[var(--card-line-strong)] bg-[var(--surface)] p-6 sm:p-7 shadow-2xl sm:max-w-[480px]">
        {!isConfirming ? (
          <>
            {/* Top Icon Badge */}
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--info-border)] bg-[var(--info-tint)] text-[var(--info)] shadow-2xs">
              <MessageSquare className="h-6 w-6" />
            </div>

            <DialogHeader className="space-y-1 text-center sm:text-center">
              <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
                Send Bulk Message
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--text-2)]">
                Broadcast an MDM alert or push notification to your fleet.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 my-2">
              {/* Recipients Pill Box */}
              <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-2)] flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-[var(--text-3)]" />
                    Target Recipients
                  </span>
                  <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                    {selectedDevices.length} device{selectedDevices.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {visibleNames.map((name, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] px-2.5 py-1 text-xs font-medium text-[var(--text-1)] truncate max-w-[170px]"
                    >
                      {name}
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="inline-flex items-center rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] px-2 py-1 text-xs font-medium text-[var(--text-3)]">
                      +{remainingCount} more
                    </span>
                  )}
                </div>
              </div>

              {/* Message Type Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[var(--text-2)]">
                  Message Type
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 pl-3.5 pr-9 text-xs font-medium text-[var(--text-1)] focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none transition-colors"
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                  >
                    <option value="WELCOME" className="bg-[var(--surface)] text-[var(--text-1)]">
                      Welcome
                    </option>
                    <option
                      value="PAYMENT_REMINDER"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Payment Reminder
                    </option>
                    <option
                      value="PAYMENT_DUE"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Payment Due
                    </option>
                    <option
                      value="OVERDUE_NOTICE"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Overdue Notice
                    </option>
                    <option
                      value="FINAL_WARNING"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Final Warning
                    </option>
                    <option
                      value="DEVICE_LOCKED"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Device Locked
                    </option>
                    <option
                      value="DEVICE_UNLOCKED"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Device Unlocked
                    </option>
                    <option
                      value="DEVICE_RESTRICTED"
                      className="bg-[var(--surface)] text-[var(--text-1)]"
                    >
                      Device Restricted
                    </option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-3)]" />
                </div>
              </div>

              {/* Message Input */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text-2)]">
                    Message Content
                  </label>
                  <span className="text-[11px] font-medium text-[var(--text-3)]">
                    {message.length} / 300
                  </span>
                </div>
                <textarea
                  className="w-full h-[120px] rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-3 text-xs leading-relaxed text-[var(--text-1)] placeholder:text-[var(--text-3)] resize-none focus:border-[var(--accent-border)] focus:ring-1 focus:ring-[var(--accent)] focus:outline-none transition-colors"
                  placeholder="Type your broadcast message here..."
                  maxLength={300}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
                className="flex-1 sm:flex-initial cursor-pointer rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 px-4 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClick}
                disabled={isPending || !message.trim()}
                className="inline-flex flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] py-2.5 px-5 text-xs font-bold text-[var(--primary-fg)] transition-all shadow-xs hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Review Broadcast</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </DialogFooter>
          </>
        ) : (
          <>
            {/* Step 2: Confirmation Review */}
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)] shadow-2xs">
              <Send className="h-6 w-6" />
            </div>

            <DialogHeader className="space-y-1 text-center sm:text-center">
              <DialogTitle className="text-lg font-bold text-[var(--text-1)]">
                Confirm Broadcast Message
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--text-2)]">
                Review message details before sending to {selectedDevices.length} device
                {selectedDevices.length !== 1 ? "s" : ""}.
              </DialogDescription>
            </DialogHeader>

            {/* Message Preview Box */}
            <div className="my-3 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 text-left space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)]">
                  Category
                </span>
                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-tint)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                  {MESSAGE_TYPE_LABELS[messageType] || messageType}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-3)] block mb-1">
                  Message Preview
                </span>
                <p className="rounded-lg border border-[var(--card-line)] bg-[var(--card-raised)] p-3 text-xs leading-relaxed text-[var(--text-1)] break-words">
                  {message}
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-3)]">
                <span>Total recipients:</span>
                <span className="font-semibold text-[var(--text-1)]">
                  {selectedDevices.length} device{selectedDevices.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <DialogFooter className="mt-4 flex flex-row gap-3 sm:justify-center">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={isPending}
                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] py-2.5 px-4 text-xs font-semibold text-[var(--text-1)] transition-colors hover:bg-[var(--card-hover)] disabled:opacity-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Edit</span>
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={isPending}
                className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] py-2.5 px-5 text-xs font-bold text-[var(--primary-fg)] transition-all shadow-xs hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Broadcast</span>
                  </>
                )}
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
