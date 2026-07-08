"use client";

import { useEffect, useState } from "react";
import { ChildrenDropdown } from "@/features/dashboard/business/ui/ChildrenDropdown";
import { formatDate } from "date-fns";
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
import { ParentDashboardSkeleton } from "@/features/parents/ui/Dashboard/ParentDashboardSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/Avatar/Avatar";
import { getInitials } from "@/shared/lib/utils";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { EmptyDeviceCard } from "@/shared/ui/DeviceStatusCard/EmptyDevice";
import { PairDeviceModal } from "@/shared/ui/Modal/Modals/PairDeviceModal";

import { useParentChildren } from "@/entities/children/model/useChildren";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function ParentDashboard() {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [isPairNewDeviceModalOpen, setIsPairNewDeviceModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { selectedChildId, setSelectedChildId, children: storeChildren } = useParentStore();

  const { mutateAsync: deleteChild, isPending: isDeleting } = useDeleteChild();

  const handleDelete = async () => {
    if (!typedChild) return;
    await deleteChild(typedChild.id);
    setShowDelete(false);
    setSelectedChildId("all");
  };

  // Fetch children list to handle loading state
  const { data: childrenData, isLoading: isFetchingChildren } = useParentChildren();

  const { data: childData, isLoading: isLoadingChild } = useGetChild(selectedChildId);
  const typedChild = childData as ChildType | undefined;
  const device = typedChild?.device ?? null;
  const deviceId = device?.mdmId || "";

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

  // Show full dashboard skeleton only during initial children fetch or if child data is loading
  if ((isFetchingChildren || isLoadingChild) && !childData) {
    return <ParentDashboardSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[#1B3C73]">
            Hello {user?.firstName}
          </h1>
          <p className="text-sm font-medium text-slate-400">
            {currentDate && formatDate(currentDate, "MMMM dd, yyyy")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ChildrenDropdown />
        </div>
      </header>

      {typedChild && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-[80px] w-[80px]">
              <AvatarImage src={typedChild.imageUrl ?? undefined} alt={typedChild.name} />
              <AvatarFallback>{getInitials(typedChild.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-[#1B3C73]">{typedChild.name}</h3>
              <p className="text-sm font-medium text-slate-400">
                {typedChild.age ? `Daughter, ${typedChild.age}` : "Daughter"}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setShowEdit(true)} className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#F8F9FA] transition-colors hover:bg-slate-200">
              <Edit2Icon className="h-[22px] w-[22px] text-[#1B3C73]" />
            </button>
            <button onClick={() => setShowDelete(true)} className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#FEF2F2] transition-colors hover:bg-red-100">
              <Trash2Icon className="h-[22px] w-[22px] text-[#EF4444]" />
            </button>
          </div>
        </div>
      )}

      {typedChild && !device ? (
        <div className="pt-4">
          <EmptyDeviceCard 
            onClick={() => setIsPairNewDeviceModalOpen(true)} 
            className="h-[350px] rounded-[32px]" 
          />
          <PairDeviceModal 
            open={isPairNewDeviceModalOpen} 
            onOpenChange={setIsPairNewDeviceModalOpen} 
            childId={typedChild.id}
          />
        </div>
      ) : (
        <>
          {/* Metrics Section */}
          <ParentMetricsSection
            hardwareData={hardwareData}
            isPending={isHardwarePending && !!deviceId}
          />

          {/* Main Grid Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ParentDevicesSection
              device={device}
              deviceId={deviceId}
              childName={typedChild?.name}
              isLoadingChild={isLoadingChild && !!selectedChildId && selectedChildId !== "all"}
            />

            <ParentAppsSection appsData={appsData} isPending={isAppsPending && !!deviceId} />
          </div>
        </>
      )}

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
