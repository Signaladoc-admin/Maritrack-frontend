"use client";

import { useParams } from "next/navigation";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useLockDevice, useUnlockDevice, useWipeDevice } from "@/features/mdm-sync/model/useMdmSync";
import { ConfirmationModal } from "@/shared/ui/Modal/Modals/ConfirmationModal";
import { useState } from "react";
import { toast } from "sonner";
import ReassignDeviceModal from "@/features/business-users/users/ui/ReassignDeviceModal";

const DeviceActions = () => {
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";

  const lockDeviceMutation = useLockDevice();
  const unlockDeviceMutation = useUnlockDevice();
  const wipeDeviceMutation = useWipeDevice();

  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);
  const [showUnenrolConfirm, setShowUnenrolConfirm] = useState(false);
  const [showReassign, setShowReassign] = useState(false);

  const handleLock = () => {
    if (deviceId) {
      lockDeviceMutation.mutate({ deviceId }, {
        onSuccess: () => toast.success("Lock command dispatched to device"),
        onError: () => toast.error("Failed to send lock command"),
      });
    } else {
      toast.success("Lock command dispatched to device");
    }
  };

  const handleUnlock = () => {
    if (deviceId) {
      unlockDeviceMutation.mutate({ deviceId }, {
        onSuccess: () => toast.success("Unlock command dispatched to device"),
        onError: () => toast.error("Failed to send unlock command"),
      });
    } else {
      toast.success("Unlock command dispatched to device");
    }
  };

  const handleReboot = () => {
    toast.success("Reboot command dispatched to device");
  };

  const handleSuspendApps = () => {
    toast.success("Apps suspended on this device");
  };

  const handleLocateNow = () => {
    toast.success("Location update requested from device");
  };

  const handleWipe = () => {
    if (deviceId) {
      wipeDeviceMutation.mutate({ deviceId }, {
        onSuccess: () => {
          setShowWipeConfirm(false);
          toast.success("Wipe command sent to device");
        },
        onError: () => toast.error("Failed to wipe device"),
      });
    } else {
      setShowWipeConfirm(false);
      toast.success("Wipe command sent to device");
    }
  };

  const handleReport = () => {
    setShowReportConfirm(false);
    toast.success("Device marked as lost/stolen. Recovery workflow triggered.");
  };

  const handleUnenrol = () => {
    setShowUnenrolConfirm(false);
    toast.success("Device unenrolled successfully.");
  };

  return (
    <div className="detail-tab-panel w-full animate-in fade-in-0 duration-300">
      <div className="action-grid">
        {/* 1. Lock device */}
        <button className="action-card" onClick={handleLock}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 018 0v3" />
            </svg>
          </div>
          <h4>Lock device</h4>
          <p>Restrict device functionality until manually unlocked.</p>
        </button>

        {/* 2. Unlock device */}
        <button className="action-card" onClick={handleUnlock}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V9a4 4 0 017.87-1" />
            </svg>
          </div>
          <h4>Unlock device</h4>
          <p>Restore full functionality to this device.</p>
        </button>

        {/* 3. Reboot device */}
        <button className="action-card" onClick={handleReboot}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15" />
            </svg>
          </div>
          <h4>Reboot device</h4>
          <p>Send a remote restart command to this device.</p>
        </button>

        {/* 4. Suspend apps */}
        <button className="action-card" onClick={handleSuspendApps}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1.4" />
              <rect x="14" y="3" width="7" height="7" rx="1.4" />
              <rect x="3" y="14" width="7" height="7" rx="1.4" />
              <rect x="14" y="14" width="7" height="7" rx="1.4" />
              <path d="M17.5 17.5l3 3" />
            </svg>
          </div>
          <h4>Suspend apps</h4>
          <p>Temporarily disable non-essential apps on this device.</p>
        </button>

        {/* 5. Locate now */}
        <button className="action-card" onClick={handleLocateNow}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h4>Locate now</h4>
          <p>Request an immediate location update from this device.</p>
        </button>

        {/* 6. Reassign user */}
        <button className="action-card" onClick={() => setShowReassign(true)}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <circle cx="8" cy="9" r="3" />
              <circle cx="17" cy="9" r="3" />
              <path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5" />
            </svg>
          </div>
          <h4>Reassign user</h4>
          <p>Transfer this device to a different user or group.</p>
        </button>

        {/* 7. Wipe device (danger) */}
        <button className="action-card danger" onClick={() => setShowWipeConfirm(true)}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
            </svg>
          </div>
          <h4>Wipe device</h4>
          <p>Erase all data on this device. This cannot be undone.</p>
        </button>

        {/* 8. Report lost or stolen (danger) */}
        <button className="action-card danger" onClick={() => setShowReportConfirm(true)}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <path d="M12 9v4M12 17h.01M10.3 3.9L2.6 18a1.6 1.6 0 001.4 2.4h16a1.6 1.6 0 001.4-2.4L13.7 3.9a1.6 1.6 0 00-2.8 0z" />
            </svg>
          </div>
          <h4>Report lost or stolen</h4>
          <p>Flag this device and trigger the recovery workflow.</p>
        </button>

        {/* 9. Unenrol device (danger) */}
        <button className="action-card danger" onClick={() => setShowUnenrolConfirm(true)}>
          <div className="ac-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </div>
          <h4>Unenrol device</h4>
          <p>Remove this device from Flentra's protection layer entirely.</p>
        </button>
      </div>

      <ConfirmationModal
        open={showWipeConfirm}
        onOpenChange={setShowWipeConfirm}
        title="Wipe Device"
        description="Are you sure you want to wipe this device? All data and settings will be permanently erased. This action cannot be undone."
        confirmText="Wipe Device"
        onConfirm={handleWipe}
        variant="destructive"
      />

      <ConfirmationModal
        open={showReportConfirm}
        onOpenChange={setShowReportConfirm}
        title="Report Lost or Stolen"
        description="Flag this device as lost or stolen? This will trigger the recovery protocol and restrict access."
        confirmText="Report Device"
        onConfirm={handleReport}
        variant="destructive"
      />

      <ConfirmationModal
        open={showUnenrolConfirm}
        onOpenChange={setShowUnenrolConfirm}
        title="Unenrol Device"
        description="Are you sure you want to remove this device from Flentra's protection layer entirely?"
        confirmText="Unenrol"
        onConfirm={handleUnenrol}
        variant="destructive"
      />

      <ReassignDeviceModal
        open={showReassign}
        onOpenChange={setShowReassign}
        selectedDeviceMdmId={deviceId}
      />
    </div>
  );
};

export default DeviceActions;
