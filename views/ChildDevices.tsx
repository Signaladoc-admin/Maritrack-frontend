"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
        <div className="surface flex flex
