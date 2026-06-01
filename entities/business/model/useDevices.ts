import {
  useBusinessZones,
  useParentZones,
  useZoneDevices,
} from "@/features/mdm-sync/model/useMdmSync";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetStaffMember } from "./useStaffMembers";

export default function useGetDevices() {
  const { user } = useAuth();
  const isBusinessRole = user?.appRole === "BUSINESS";

  const { data: businessZones } = useBusinessZones({ enabled: isBusinessRole });
  const { data: parentZones } = useParentZones({ enabled: !isBusinessRole });

  const zoneId = isBusinessRole ? (businessZones as any)?.[0]?.id : (parentZones as any)?.[0]?.id;

  const { data: devices } = useZoneDevices(zoneId, { enabled: !!zoneId });

  return devices || [];
}

export function useGetStaffMemberDevices(staffId: string) {
  const { data: staffMember } = useGetStaffMember(staffId);

  return staffMember?.device ? [staffMember.device] : [];
}
