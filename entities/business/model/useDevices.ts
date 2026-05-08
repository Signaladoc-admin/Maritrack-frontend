import {
  useBusinessZones,
  useGetZoneDevices,
  useParentZones,
} from "@/features/mdm-sync/model/useMdmSync";
import { useAuth } from "@/shared/auth/AuthProvider";

export default function useGetDevices() {
  const { user } = useAuth();
  const isBusinessRole = user?.appRole === "BUSINESS";

  const { data: businessZones } = useBusinessZones({ enabled: isBusinessRole });
  const { data: parentZones } = useParentZones({ enabled: !isBusinessRole });

  const zoneId = isBusinessRole ? (businessZones as any)?.[0]?.id : (parentZones as any)?.[0]?.id;

  const { data: devicesResponse } = useGetZoneDevices(zoneId);

  const devices = devicesResponse?.devicesData?.data || [];
  const numPages = devicesResponse?.devicesData?.totalPages;
  const totalElements = devicesResponse?.devicesData?.totalElements;

  return {
    devices,
    numPages,
    totalElements,
  };
}
