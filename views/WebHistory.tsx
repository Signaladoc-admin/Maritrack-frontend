"use client";

import React, { useState } from "react";
import { Search, Globe, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useToast } from "@/shared/ui/toast";
import { useGetRestrictions, useSetRestrictions } from "@/features/mdm-sync/model/useRestrictions";
import { Skeleton } from "@/shared/ui/skeleton";

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
      toast({
        title: "Error",
        message: "Please enter a valid domain format (e.g. facebook.com)",
        type: "error",
      });
      return;
    }

    if (blockedDomains.includes(trimmedDomain)) {
      toast({ title: "Info", message: "This website is already blocked", type: "info" });
      return;
    }

    const updatedDomains = [...blockedDomains, trimmedDomain];

    updateRestrictions(
      {
        mdmDeviceId: deviceId,
        restrictions: { domains: updatedDomains },
      },
      {
        onSuccess: () => setNewDomain(""),
      }
    );
  };

  const handleUnblock = (domainToUnblock: string) => {
    const updatedDomains = blockedDomains.filter((d) => d !== domainToUnblock);

    updateRestrictions({
      mdmDeviceId: deviceId,
      restrictions: { domains: updatedDomains },
    });
  };

  return (
    <div className="detail-tab-panel animate-in fade-in-0 w-full duration-300">
      {/* Block new website section */}
      <div className="dd-section">
        <div className="dd-section-title">Add website restriction</div>
        <div className="surface p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="search-wrap flex-1">
              <Search className="h-4 w-4 shrink-0 text-[var(--text-3)]" />
              <input
                placeholder="Enter website domain to block (e.g. facebook.com, tiktok.com)"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isUpdating) handleAddWebsite();
                }}
                disabled={isUpdating}
              />
            </div>
            <button
              type="button"
              onClick={handleAddWebsite}
              disabled={isUpdating || !newDomain.trim()}
              className="dd-action-btn primary flex h-[42px] shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-5 text-xs font-bold disabled:opacity-50"
              style={{ width: "auto" }}
            >
              <Plus className="h-4 w-4" />
              <span>{isUpdating ? "Blocking..." : "Block domain"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Blocked websites list */}
      <div className="dd-section">
        <div className="dd-section-title">
          <span>Blocked domains</span>
          {!isPending && (
            <span className="text-[11px] font-bold tracking-wider text-[var(--text-3)] uppercase">
              {blockedDomains.length} blocked
            </span>
          )}
        </div>

        <div className="surface p-5">
          {isPending ? (
            <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.07)]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-lg bg-[rgba(255,255,255,0.08)]" />
                    <Skeleton className="h-4 w-44 bg-[rgba(255,255,255,0.08)]" />
                  </div>
                  <Skeleton className="h-7 w-20 rounded-md bg-[rgba(255,255,255,0.08)]" />
                </div>
              ))}
            </div>
          ) : blockedDomains.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)]">
                <Globe className="h-5 w-5 text-[var(--text-3)]" />
              </div>
              <h4 className="mb-1 text-[14px] font-bold text-[var(--text-1)]">
                No blocked websites
              </h4>
              <p className="max-w-sm text-[12px] text-[var(--text-3)]">
                No domain restrictions have been configured on this device yet. Enter a website
                domain above to restrict access.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.07)]">
              {blockedDomains.map((site) => (
                <div
                  key={site}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)]">
                      <Globe className="h-4 w-4 text-[var(--cyan)]" />
                    </div>
                    <span className="truncate font-mono text-[13.5px] font-semibold text-[var(--text-1)]">
                      {site}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleUnblock(site)}
                    disabled={isUpdating}
                    className="shrink-0 cursor-pointer rounded-md border border-[var(--coral-border)] px-3 py-1.5 text-[12px] font-bold text-[var(--coral)] transition-colors hover:bg-[var(--coral-soft)]"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebHistory;
