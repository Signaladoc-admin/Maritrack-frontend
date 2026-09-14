"use client";

import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { Smartphone, BatteryCharging, ArrowRight } from "lucide-react";
import React from "react";

export interface DeviceCardProps {
  device: any;
  childName?: string;
  childId?: string;
  onClick: () => void;
}

const DeviceCard = ({ device, childName, onClick }: DeviceCardProps) => {
  const deviceId = device?.deviceId || device?.mdmId || device?.id || "";
  const { data: hardwareData } = useDeviceDetail(deviceId, "hardware", {
    enabled: !!deviceId,
  });

  const batteryLevel =
    hardwareData?.realTimeStats?.batteryLevel ??
    hardwareData?.data?.realTimeStats?.batteryLevel ??
    0;

  const deviceStatus = (device?.deviceStatus || "ACTIVE").toUpperCase();
  const isOnline = deviceStatus === "ACTIVE";
  const modelName = device?.model || hardwareData?.deviceDetails?.model || "Device";
  const manufacturer = device?.manufacturer || hardwareData?.deviceDetails?.manufacturer || "";

  return (
    <div
      onClick={onClick}
      className="surface group flex h-full cursor-pointer flex-col justify-between rounded-[var(--radius-lg)] p-6 transition-all hover:border-[var(--card-line-strong)]"
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text-1)] transition-colors group-hover:text-[var(--accent)]">
                {childName ? `${childName}'s Device` : manufacturer || "Enrolled Device"}
              </h4>
              <p className="text-xs text-[var(--text-3)]">
                {[manufacturer, modelName].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
              isOnline
                ? "border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--green)]"
                : "border-[var(--coral-border)] bg-[var(--coral-soft)] text-[var(--coral)]"
            }`}
          >
            {isOnline ? "Active" : "Locked"}
          </span>
        </div>

        <div className="my-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] p-3">
            <div className="mb-1 text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
              Battery
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-[var(--text-1)]">
              <BatteryCharging className="h-4 w-4 text-[var(--green)]" />
              <span>{batteryLevel}%</span>
            </div>
          </div>
          <div className="rounded-lg border border-[var(--card-line)] bg-[var(--card-fill)] p-3">
            <div className="mb-1 text-[11px] font-semibold tracking-wider text-[var(--text-3)] uppercase">
              Platform
            </div>
            <div className="truncate text-sm font-bold text-[var(--text-1)]">
              {device?.operatingSystem || "Android"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[var(--card-line)] pt-4">
        <span className="text-xs font-medium text-[var(--text-2)]">Click to manage controls</span>
        <span className="flex items-center gap-1 text-xs font-bold text-[var(--green)] transition-transform group-hover:translate-x-0.5">
          View details <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
};

export default DeviceCard;
