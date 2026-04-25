"use client";

import { useServerActionQuery } from "@/shared/api/server-action-hooks";
import { getQrCodeAction } from "../api/mdm-sync.actions";
import { useUserProfile } from "@/entities/user/model/useUserProfile";
import { useParentZones } from "./useMdmSync";

interface ParentZoneRes {
  id: string;
  name: string;
  mdmZoneId: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  deletedAt: null;
  parentChildren: [
    {
      parentId: string;
      childId: string;
      createdAt: string;
      updatedAt: string;
      deleted: boolean;
      deletedAt: null;
      zoneId: string;
      child: {
        name: string;
        age: number;
        gender: string;
        createdAt: string;
        updatedAt: string;
        deleted: boolean;
        deletedAt: null;
        id: string;
        onboardingCode: string;
        imageUrl: string | null;
      };
    },
  ];
}

export const mdmSyncKeys = {
  qrcode: (zoneId: string, onboardingCode: string) =>
    ["mdm-sync", "qrcode", zoneId, onboardingCode] as const,
};

function toQrCodeSrc(data: string | null | undefined): string | null {
  if (!data) return null;
  return data.startsWith("data:image") ? data : `data:image/png;base64,${data}`;
}

export function useQrCode(
  childId: string,
  overrides?: { zoneId?: string; onboardingCode?: string }
) {
  const { data: user } = useUserProfile();

  // Not gated on parentId — useUserProfile cache can be stale during onboarding
  // (parent profile was just created), causing parentId to appear null and permanently
  // blocking the zone fetch. Always fetch zones; the enabled guard on the QR query handles timing.
  const { data: parentZonesRes } = useParentZones();

  const zoneWithChild = parentZonesRes?.find((zone: ParentZoneRes) =>
    zone.parentChildren?.some((pc) => pc.childId === childId)
  );

  const derivedOnboardingCode = zoneWithChild?.parentChildren?.find(
    (pc: any) => pc.childId === childId
  )?.child?.onboardingCode;

  const onboardingCode = overrides?.onboardingCode ?? derivedOnboardingCode;
  const zoneId = overrides?.zoneId ?? user?.zoneId?.[0]?.id ?? parentZonesRes?.[0]?.id;

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(zoneId || "", onboardingCode || ""),
    getQrCodeAction,
    [zoneId as string, onboardingCode as string],
    {
      enabled: !!zoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return {
    ...query,
    qrCodeSrc: toQrCodeSrc(query.data),
    isPending: !zoneId || !onboardingCode,
  };
}

export function useChildQrCode({ childId }: { childId: string }) {
  const { data: user } = useUserProfile();
  const { data: parentZonesRes } = useParentZones();

  const onboardingCode =
    parentZonesRes?.[0]?.parentChildren?.find((child: any) => child.childId === childId)?.child
      ?.onboardingCode ?? null;

  const activeZoneId = user?.zoneId?.[0]?.id || parentZonesRes?.[0]?.id;

  const query = useServerActionQuery(
    mdmSyncKeys.qrcode(activeZoneId || "", onboardingCode ?? ""),
    getQrCodeAction,
    [activeZoneId as string, onboardingCode as string],
    {
      // Both values must be ready — previously only checked activeZoneId,
      // which caused the query to fire with onboardingCode=null before parentZonesRes loaded.
      enabled: !!activeZoneId && !!onboardingCode,
      staleTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return { ...query, qrCodeSrc: toQrCodeSrc(query.data) };
}
