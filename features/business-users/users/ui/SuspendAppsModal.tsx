"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useBulkActionDevices } from "@/entities/device";
import { getDeviceDetailAction } from "@/features/device/api/device.actions";
import { useToast } from "@/shared/ui/toast";
import { Loader } from "@/shared/ui/loader";
import { TriangleAlert, SearchIcon } from "lucide-react";

interface SuspendAppsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevices: any[];
  onSuccess?: () => void;
  actionType: "suspend" | "unsuspend";
}

const AndroidIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.022 3.503c-1.4362-.6544-3.0536-1.015-4.764-1.015-1.7104 0-3.3278.3606-4.764 1.015l-2.022-3.503a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396z" />
  </svg>
);

export default function SuspendAppsModal({
  open,
  onOpenChange,
  selectedDevices,
  onSuccess,
  actionType,
}: SuspendAppsModalProps) {
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFetchingApps, setIsFetchingApps] = useState(false);
  const [apps, setApps] = useState<{ packageName: string }[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const isSuspend = actionType === "suspend";
  const actionId = isSuspend ? 27 : 28;
  const iconColor = isSuspend ? "text-[#d9534f] fill-[#d9534f]/10" : "text-[#1b3c73] fill-[#1b3c73]/10";
  const buttonColor = isSuspend ? "bg-[#d9534f] hover:bg-[#c9302c]" : "bg-[#1b3c73] hover:bg-[#142d57]";
  
  useEffect(() => {
    if (!open) {
      setIsConfirming(false);
      setSearchQuery("");
      setSelectedApps([]);
      return;
    }

    let mounted = true;
    async function loadApps() {
      setIsFetchingApps(true);
      try {
        const allApps = new Set<string>();
        await Promise.all(
          selectedDevices.map(async (d) => {
            const id = d.mdmDeviceId || d.device?.mdmDeviceId || d.id;
            if (!id) return;
            const res = await getDeviceDetailAction(id, "apps");
            const deviceApps = (res as any)?.data?.apps || (res as any)?.apps || (res as any) || [];
            if (Array.isArray(deviceApps)) {
              deviceApps.forEach(app => {
                 if (app.packageName) allApps.add(app.packageName);
                 else if (typeof app === 'string') allApps.add(app);
              });
            }
          })
        );
        if (mounted) {
           setApps(Array.from(allApps).map(pkg => ({ packageName: pkg })).sort((a,b) => a.packageName.localeCompare(b.packageName)));
        }
      } catch (err) {
         console.error(err);
      } finally {
         if (mounted) setIsFetchingApps(false);
      }
    }
    
    // In a real app we load from devices, but since it might be empty if device has no apps synced,
    // let's fetch them
    loadApps();
    
    return () => { mounted = false; };
  }, [open, selectedDevices]);

  const { mutate: sendBulkAction, isPending } = useBulkActionDevices({
    onSuccess: () => {
      toast({
        title: "Success",
        message: `App(s) ${isSuspend ? "suspended" : "unsuspended"} successfully`,
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
      actionId,
      messageText: selectedApps.join(", "),
    });
  };

  const filteredApps = apps.filter(app => app.packageName.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6 sm:p-8 gap-6 border-none shadow-xl rounded-[24px]">
        {!isConfirming ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1b3c73]">
                {isSuspend ? "Suspend apps" : "Unsuspend apps"}
              </h2>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search for an app" 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-50 border-gray-100 rounded-xl focus-visible:ring-1 focus-visible:ring-gray-300"
                />
              </div>
              <Button 
                className={`text-white rounded-xl px-6 ${buttonColor}`}
                onClick={() => setIsConfirming(true)}
                disabled={selectedApps.length === 0 || isFetchingApps}
              >
                {isSuspend ? "Suspend All" : "Unsuspend All"}
              </Button>
            </div>

            <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto mt-2 pr-1 custom-scrollbar">
              {isFetchingApps ? (
                <div className="flex justify-center p-8"><Loader className="text-[#1b3c73]" /></div>
              ) : apps.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No apps found on selected devices.</div>
              ) : filteredApps.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No apps match your search.</div>
              ) : (
                filteredApps.map(app => (
                  <label key={app.packageName} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#1b3c73] focus:ring-[#1b3c73]"
                      checked={selectedApps.includes(app.packageName)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedApps([...selectedApps, app.packageName]);
                        else setSelectedApps(selectedApps.filter(p => p !== app.packageName));
                      }}
                    />
                    <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                      <AndroidIcon className="w-5 h-5 text-[#1b3c73]" />
                    </div>
                    <span className="text-[15px] font-medium text-gray-800">{app.packageName}</span>
                  </label>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-6 py-4">
            <TriangleAlert className={`size-16 ${iconColor}`} strokeWidth={1.5} />
            <h2 className="text-2xl font-semibold text-[#1b3c73] max-w-[350px]">
              {isSuspend ? "Are you sure you want to suspend this app?" : "Are you sure you want to un-suspend this app?"}
            </h2>
            <div className="flex w-full gap-4 mt-4">
              <Button
                variant="secondary"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 h-12 text-base font-medium rounded-xl"
                onClick={() => setIsConfirming(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                className={`flex-1 text-white h-12 text-base font-medium rounded-xl ${buttonColor}`}
                onClick={handleAction}
                disabled={isPending}
              >
                {isPending ? <Loader className="text-white" /> : (isSuspend ? "Suspend App" : "Un-suspend App")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
