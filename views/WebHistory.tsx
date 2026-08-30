"use client";

import React, { useState } from "react";
import { Search, Globe, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useParams } from "next/navigation";
import { useToast } from "@/shared/ui/toast";
import { useGetRestrictions, useSetRestrictions } from "@/features/mdm-sync/model/useRestrictions";

const WebHistory = () => {
  const { toast } = useToast();
  const params = useParams<{ device: string }>();
  const deviceId = params?.device || "";
  const [newDomain, setNewDomain] = useState("");

  const { data, isPending } = useGetRestrictions(deviceId, { enabled: !!deviceId });
  const { mutate: updateRestrictions, isPending: isUpdating } = useSetRestrictions();

  // Ensure domains is an array of strings, as backend might return objects
  const blockedDomains: string[] = Array.isArray(data?.data?.domains)
    ? data.data.domains.map((d: any) => (typeof d === "string" ? d : d.domain)).filter(Boolean)
    : [];

  const isValidDomain = (domain: string) => {
    // Basic domain validation: expects format like example.com or sub.example.com
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain.trim());
  };

  const handleAddWebsite = () => {
    const trimmedDomain = newDomain.trim().toLowerCase();
    
    if (!trimmedDomain) {
      toast({ title: "Error", message: "Please enter a website URL", type: "error" });
      return;
    }

    if (!isValidDomain(trimmedDomain)) {
      toast({ title: "Error", message: "Please enter a valid domain format (e.g., example.com)", type: "error" });
      return;
    }

    if (blockedDomains.includes(trimmedDomain)) {
      toast({ title: "Info", message: "This website is already blocked", type: "info" });
      return;
    }

    const updatedDomains = [...blockedDomains, trimmedDomain];

    updateRestrictions({
      mdmDeviceId: deviceId,
      restrictions: { domains: updatedDomains },
    }, {
      onSuccess: () => setNewDomain("")
    });
  };

  const handleUnblock = (domainToUnblock: string) => {
    const updatedDomains = blockedDomains.filter((d) => d !== domainToUnblock);
    
    updateRestrictions({
      mdmDeviceId: deviceId,
      restrictions: { domains: updatedDomains },
    });
  };

  return (
    <div className="w-full space-y-8 bg-white p-6 sm:p-8 rounded-[32px] border border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-[#1b3c73] mb-2">Blocked websites</h2>
        <p className="text-sm text-slate-500">
          Manage the list of websites that are blocked on this device.
        </p>
      </div>

      {/* Add Website Input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pr-4 pl-11 text-sm focus:ring-2 focus:ring-[#1B3C73]/20 focus:border-[#1b3c73] focus:outline-none transition-all"
            placeholder="Enter website url to block (e.g. facebook.com)"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isUpdating) handleAddWebsite();
            }}
            disabled={isUpdating}
          />
        </div>
        <Button 
          onClick={handleAddWebsite}
          disabled={isUpdating}
          className="h-12 bg-[#D95D55] px-8 hover:bg-[#c04d45] rounded-xl text-white font-medium min-w-[160px] transition-colors"
        >
          {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Add Website"}
        </Button>
      </div>

      {/* List of Websites */}
      <div className="space-y-3 pt-2">
        {isPending ? (
          <div className="flex flex-col gap-4 py-16 items-center justify-center text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-[#1B3C73]" />
            <p className="text-sm font-medium">Loading blocked websites...</p>
          </div>
        ) : blockedDomains.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <div className="h-14 w-14 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-700 mb-1">No blocked websites</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              You haven't added any websites to the blocklist yet. 
              Enter a domain above to start restricting access.
            </p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2">
            {blockedDomains.map((site, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 border border-gray-100 transition-all hover:border-gray-200 hover:bg-gray-100/50"
              >
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm border border-gray-100">
                    <Globe className="h-5 w-5 text-[#1B3C73]" />
                  </div>
                  <span className="font-medium text-slate-700 truncate" title={site}>
                    {site}
                  </span>
                </div>
                <button 
                  onClick={() => handleUnblock(site)}
                  disabled={isUpdating}
                  className="text-sm font-semibold text-[#1B3C73] hover:text-[#D95D55] transition-colors ml-4 shrink-0 disabled:opacity-50 px-4 py-2 rounded-lg hover:bg-[#D95D55]/10"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebHistory;
