"use client";

import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useLockDevice, useUnlockDevice, useWipeDevice } from "@/features/mdm-sync/model/useMdmSync";
import { Button } from "@/shared/ui/button";
import { Lock, Unlock, Eraser } from "lucide-react";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useState } from "react";
import { MDMDeviceDetailsResponse } from "@/features/device/types";

const DeviceActions = () => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const { data: hardwareData, isPending } = useDeviceDetail(
    deviceId,
    "hardware",
    { enabled: !!deviceId }
  );

  const lockDeviceMutation = useLockDevice();
  const unlockDeviceMutation = useUnlockDevice();
  const wipeDeviceMutation = useWipeDevice();

  const [showWipeConfirm, setShowWipeConfirm] = useState(false);

  const deviceResponse: MDMDeviceDetailsResponse = hardwareData;
  const isLocked = deviceResponse?.deviceDetails?.deviceStatus === "INACTIVE";

  const handleToggleLock = () => {
    if (isLocked) {
      unlockDeviceMutation.mutate({ deviceId });
    } else {
      lockDeviceMutation.mutate({ deviceId });
    }
  };

  const handleWipe = () => {
    wipeDeviceMutation.mutate({ deviceId }, {
      onSuccess: () => setShowWipeConfirm(false)
    });
  };

  if (isPending) {
    return <div className="p-8 text-center text-sm text-gray-500">Loading device actions...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Device Security Actions</h3>
        <p className="mb-6 text-sm text-gray-500">
          Perform critical security actions on this device. These actions take effect immediately if the device is online.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start gap-4 rounded-lg border p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              {isLocked ? <Unlock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{isLocked ? "Unlock Device" : "Lock Device"}</h4>
              <p className="text-sm text-gray-500">
                {isLocked
                  ? "Restore full access to the device."
                  : "Lock the device to prevent unauthorized access."}
              </p>
            </div>
            <Button
              className="mt-auto w-full"
              variant={isLocked ? "outline" : "default"}
              onClick={handleToggleLock}
              disabled={lockDeviceMutation.isPending || unlockDeviceMutation.isPending}
            >
              {isLocked ? "Unlock" : "Lock"}
            </Button>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-lg border border-red-100 p-5 bg-red-50/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Eraser className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Wipe Device</h4>
              <p className="text-sm text-gray-500">
                Erase all data and reset the device to factory settings. This action cannot be undone.
              </p>
            </div>
            <Button
              className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowWipeConfirm(true)}
              disabled={wipeDeviceMutation.isPending}
            >
              Wipe Device
            </Button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={showWipeConfirm}
        onOpenChange={setShowWipeConfirm}
        title="Wipe Device"
        description="Are you absolutely sure you want to wipe this device? This will erase all data, restore factory settings, and you will lose connection to it. This action CANNOT be reversed."
        confirmText={wipeDeviceMutation.isPending ? "Wiping..." : "Wipe Device"}
        onConfirm={handleWipe}
        variant="destructive"
      />
    </div>
  );
};

export default DeviceActions;
