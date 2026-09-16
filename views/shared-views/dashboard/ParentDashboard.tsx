"use client";

import { useEffect, useState } from "react";
import { ChildrenDropdown } from "@/features/dashboard/business/ui/ChildrenDropdown";
import { format } from "date-fns";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { useParentStore } from "@/shared/stores/user.store";
import { useGetChild, useDeleteChild } from "@/features/child-profile/model/useGetChildrenProfile";
import { Child as ChildType } from "@/features/child-profile/model/types";
import { AddEditChildModal } from "@/features/child-profile/ui/ChildDetailsModal";
import { DeleteChildModal } from "@/features/child-profile/ui/ChildDeleteModal";
import { IChildProfile } from "@/features/onboarding/personal/types";
import { ParentMetricsSection } from "@/features/parents/ui/Dashboard/ParentMetricsSection";
import { ParentDevicesSection } from "@/features/parents/ui/Dashboard/ParentDevicesSection";
import { ParentAppsSection } from "@/features/parents/ui/Dashboard/ParentAppsSection";
import { ParentQuickControls } from "@/features/parents/ui/Dashboard/ParentQuickControls";
import { ParentDashboardSkeleton } from "@/features/parents/ui/Dashboard/ParentDashboardSkeleton";
import { getInitials } from "@/shared/lib/utils";
import { Edit2Icon, Trash2Icon, Plus, Smartphone, User } from "lucide-react";
import { PairDeviceModal } from "@/shared/ui/Modal/Modals/PairDeviceModal";
import { useParentChildren } from "@/entities/children/model/useChildren";
import { useAuth } from "@/shared/auth/AuthProvider";
import Link from "next/link";

export default function ParentDashboard() {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [isPairNewDeviceModalOpen, setIsPairNewDeviceModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { selectedChildId, setSelectedChildId } = useParentStore();

  const { mutateAsync: deleteChild, isPending: isDeleting } = useDeleteChild();

  const { data: parentChildrenRes, isLoading: isFetchingChildren } = useParentChildren();
  const childrenList: ChildType[] = parentChildrenRes?.data ?? [];

  // If no child is explicitly selected, pick the first child
  useEffect(() => {
    if ((!selectedChildId || selectedChildId === "all") && childrenList.length > 0) {
      setSelectedChildId(childrenList[0].id);
    }
  }, [childrenList, selectedChildId, setSelectedChildId]);

  const { data: childData, isLoading: isLoadingChild } = useGetChild(
    selectedChildId && selectedChildId !== "all" ? selectedChildId : ""
  );
  const typedChild =
    (childData as ChildType | undefined) || childrenList.find((c) => c.id === selectedChildId);
  const device = typedChild?.device ?? null;
  const deviceId = device?.mdmId || device?.mdmDeviceId || device?.id || "";

  // Fetch device metrics
  const { data: hardwareData, isPending: isHardwarePending } = useDeviceDetail(
    deviceId,
    "hardware",
    {
      enabled: !!deviceId,
    }
  );

  const { data: appsData, isPending: isAppsPending } = useDeviceDetail(deviceId, "apps", {
    enabled: !!deviceId,
  });

  const { user } = useAuth();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleDelete = async () => {
    if (!typedChild) return;
    await deleteChild(typedChild.id);
    setShowDelete(false);
    if (childrenList.length > 1) {
      const remaining = childrenList.filter((c) => c.id !== typedChild.id);
      setSelectedChildId(remaining[0]?.id || "");
    } else {
      setSelectedChildId("");
    }
  };

  if ((isFetchingChildren || isLoadingChild) && !typedChild && childrenList.length === 0) {
    return <ParentDashboardSkeleton />;
  }

  const relationshipLabel = typedChild
    ? typedChild.gender === "FEMALE"
      ? "Daughter"
      : typedChild.gender === "MALE"
        ? "Son"
        : "Child"
    : "";

  return (
    <div className="content">
      {/* Page Header */}
      <div className="page-head">
        <div className="page-head-row">
          <div>
            <h1>Hello, {user?.firstName || "Parent"}</h1>
            <p>{currentDate && format(currentDate, "EEEE, MMMM dd, yyyy")}</p>
          </div>
          {childrenList.length > 0 && (
            <div className="flex items-center gap-3">
              <ChildrenDropdown />
            </div>
          )}
        </div>
      </div>

      {/* When no children exist */}
      {childrenList.length === 0 && !isFetchingChildren && (
        <div className="surface flex flex-col items-center justify-center gap-4 rounded-[var(--radius-lg)] p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-tint)] text-[var(--accent)]">
            <User className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[var(--text-1)]">No children registered</h3>
            <p className="mx-auto max-w-sm text-sm text-[var(--text-2)]">
              Add your first child profile to begin managing their devices, setting healthy
              boundaries, and monitoring activity.
            </p>
          </div>
          <Link href="/children/add" className="btn-primary mt-2">
            <Plus className="h-4 w-4" /> Add child profile
          </Link>
        </div>
      )}

      {/* Selected Child Hero Bar */}
      {typedChild && (
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
                <div className="mb-0.5 text-xl font-bold text-[var(--text-1)]">
                  {typedChild.name}
                </div>
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
      )}

      {/* Child with no device paired */}
      {typedChild && !device && (
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
          <PairDeviceModal
            open={isPairNewDeviceModalOpen}
            onOpenChange={setIsPairNewDeviceModalOpen}
            childId={typedChild.id}
          />
        </div>
      )}

      {/* Child with paired device: Metrics + Main Grid */}
      {typedChild && device && (
        <div className="space-y-6">
          {/* Metrics Section: Storage & Battery */}
          <ParentMetricsSection
            hardwareData={hardwareData}
            isPending={isHardwarePending && !!deviceId}
          />

          {/* Main Grid: Device Overview & Top Apps */}
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <ParentDevicesSection
              device={device}
              deviceId={deviceId}
              childName={typedChild.name}
              childId={typedChild.id}
              isLoadingChild={isLoadingChild && !!selectedChildId && selectedChildId !== "all"}
              onPairDevice={() => setIsPairNewDeviceModalOpen(true)}
            />

            <ParentAppsSection
              appsData={appsData}
              isPending={isAppsPending && !!deviceId}
              deviceId={deviceId}
              childId={typedChild.id}
            />
          </div>

          {/* Quick Controls Section (Spacious layout, increased height) */}
          <ParentQuickControls deviceId={deviceId} childId={typedChild.id} />
        </div>
      )}

      {/* Edit Child Modal */}
      {typedChild && (
        <>
          <AddEditChildModal
            open={showEdit}
            onOpenChange={setShowEdit}
            initialData={childData as IChildProfile}
          />
          <DeleteChildModal
            open={showDelete}
            onOpenChange={setShowDelete}
            data={childData as IChildProfile}
            title="Are you sure you want to delete this child profile?"
            description={`Deleting ${typedChild?.name || "this child"}'s profile cannot be reverted. Are you sure?`}
            confirmText={isDeleting ? "Deleting..." : "Delete"}
            cancelText="Cancel"
            onConfirm={handleDelete}
            variant="destructive"
          />
        </>
      )}
    </div>
  );
}
