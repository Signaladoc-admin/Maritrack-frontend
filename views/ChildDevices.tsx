"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetChild, useDeleteChild } from "@/features/child-profile/model/useGetChildrenProfile";
import { Child } from "@/features/child-profile/model/types";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useRecentChildren } from "@/shared/hooks/useRecentChildren";
import { AddEditChildModal } from "@/features/child-profile/ui/ChildDetailsModal";
import { DeleteChildModal } from "@/features/child-profile/ui/ChildDeleteModal";
import { PairDeviceModal } from "@/shared/ui/Modal/Modals/PairDeviceModal";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { ParentMetricsSection } from "@/features/parents/ui/Dashboard/ParentMetricsSection";
import { ParentDevicesSection } from "@/features/parents/ui/Dashboard/ParentDevicesSection";
import { ParentAppsSection } from "@/features/parents/ui/Dashboard/ParentAppsSection";
import { ParentQuickControls } from "@/features/parents/ui/Dashboard/ParentQuickControls";
import { ChildDevicesSkeleton } from "./ChildDevicesSkeleton";
import { getInitials } from "@/shared/lib/utils";
import {
  Edit2Icon,
  Trash2Icon,
  Smartphone,
  Plus,
  ArrowLeft,
  ShieldAlert,
  Globe,
  MapPin,
  Sliders,
  ChevronRight,
} from "lucide-react";

const ChildDevices = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [isPairNewDeviceModalOpen, setIsPairNewDeviceModalOpen] = useState(false);

  const params = useParams<{ child: string }>();
  const childId = params?.child;
  const router = useRouter();
  const { push: pushRecentChild } = useRecentChildren();

  useEffect(() => {
    if (childId) pushRecentChild(childId);
  }, [childId, pushRecentChild]);

  const { data: childData, isLoading } = useGetChild(childId as string);
  const { mutateAsync: deleteChild, isPending: isDeleting } = useDeleteChild();

  const typedChild = childData as Child | undefined;
  const device = typedChild?.device ?? null;
  const deviceId = device?.mdmId || device?.mdmDeviceId || device?.id || "";

  // Device telemetry
  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    {
      enabled: !!deviceId,
    }
  );

  // Device installed apps
  const { data: appsData, isPending: isAppsPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const handleDelete = async () => {
    if (!childId) return;
    await deleteChild(childId);
    setShowDelete(false);
    router.push("/children");
  };

  if (isLoading) {
    return <ChildDevicesSkeleton />;
  }

  if (!typedChild) {
    return (
      <div className="content">
        <button className="dd-back-link" onClick={() => router.push("/children")}>
          <ArrowLeft className="h-4 w-4" /> Back to children
        </button>
        <div className="surface flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] p-12 text-center">
          <h3 className="text-lg font-bold text-[var(--text-1)]">Child Profile Not Found</h3>
          <p className="max-w-sm text-sm text-[var(--text-2)]">
            The child profile you are looking for does not exist or has been removed.
          </p>
          <button
            type="button"
            onClick={() => router.push("/children")}
            className="btn-primary mt-2 cursor-pointer"
          >
            Go to children
          </button>
        </div>
      </div>
    );
  }

  const relationshipLabel =
    typedChild.gender === "FEMALE" ? "Daughter" : typedChild.gender === "MALE" ? "Son" : "Child";

  return (
    <div className="content">
      {/* Back button */}
      <button className="dd-back-link" onClick={() => router.push("/children")}>
        <ArrowLeft className="h-4 w-4" /> Back to children
      </button>

      {/* Child Hero Banner */}
      <div className="surface dd-hero mb-6">
        <div className="dd-hero-top">
          <div className="dd-hero-id">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-lg font-bold text-[var(--accent)]">
              {typedChild.imageUrl ? (
                <img
                  src={typedChild.imageUrl}
                  alt={typedChild.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(typedChild.name)
              )}
            </div>
            <div>
              <div className="mb-0.5 text-xl font-bold text-[var(--text-1)]">{typedChild.name}</div>
              <div className="text-xs font-medium text-[var(--text-3)]">
                {relationshipLabel}
                {typedChild.age ? ` · ${typedChild.age} years old` : ""}
                {device
                  ? ` · Enrolled Device: ${device.manufacturer || ""} ${device.model || ""}`
                  : " · No device paired"}
              </div>
            </div>
          </div>
          <div className="dd-hero-actions">
            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="dd-action-btn"
              title="Edit child profile"
            >
              <Edit2Icon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className="dd-action-btn hover:text-[var(--coral)]"
              title="Delete child profile"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* When Child has NO device paired */}
      {!device && (
        <div className="surface flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] border-dashed border-[var(--card-line-strong)] p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] text-[var(--text-3)]">
            <Smartphone className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[var(--text-1)]">
              No device paired to {typedChild.name}
            </h3>
            <p className="mx-auto max-w-sm text-xs text-[var(--text-2)]">
              Pair an Android or iOS device to monitor usage, enforce bedtime rules, and track
              location.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPairNewDeviceModalOpen(true)}
            className="btn-primary mt-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Pair new device
          </button>
        </div>
      )}

      {/* When Child has an enrolled device */}
      {device && (
        <div className="space-y-6">
          {/* Telemetry Metrics: Memory & Battery */}
          <ParentMetricsSection
            hardwareData={hardwareData}
            isPending={isHardwarePending && !!deviceId}
          />

          {/* Main Grid: Device Card + Top Apps */}
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <ParentDevicesSection
              device={device}
              deviceId={deviceId}
              childName={typedChild.name}
              childId={typedChild.id}
              isLoadingChild={false}
              onPairDevice={() => setIsPairNewDeviceModalOpen(true)}
            />

            {/* Top Apps Section */}
            <ParentAppsSection
              appsData={appsData}
              isPending={isAppsPending && !!deviceId}
              deviceId={deviceId}
              childId={typedChild.id}
            />
          </div>

          {/* Quick Controls Section (Full width, increased height and spacious actions) */}
          <ParentQuickControls deviceId={deviceId} childId={typedChild.id} />
        </div>
      )}

      {/* Edit Child Profile Modal */}
      <AddEditChildModal
        open={showEdit}
        onOpenChange={setShowEdit}
        initialData={childData as IChildProfile}
      />

      {/* Delete Child Profile Modal */}
      <DeleteChildModal
        open={showDelete}
        onOpenChange={setShowDelete}
        data={childData as IChildProfile}
        title="Are you sure you want to delete this child profile?"
        description={`Deleting ${typedChild.name}'s profile cannot be reverted. Are you sure?`}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />

      {/* Pair Device Modal */}
      <PairDeviceModal
        open={isPairNewDeviceModalOpen}
        onOpenChange={setIsPairNewDeviceModalOpen}
        childId={typedChild.id}
      />
    </div>
  );
};

export default ChildDevices;
