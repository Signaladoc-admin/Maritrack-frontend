import { Device, DeviceHardwareInfo, StaffDevice } from "@/entities/device";
import { DeviceHardwareDetails } from "@/features/device/types";
import Table from "@/shared/ui/Table/Table";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/auth/AuthProvider";
import { isRetailerRole } from "@/entities/user/model/user.schema";

interface DevicesTableProps<T extends { id: string | number }> {
  columns: any;
  data: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  paginationClassName?: string;
  isLoading?: boolean;
  selectable?: boolean;
  onRowSelect?: (items: T[]) => void;
  clearSelectionTrigger?: number;
  disableRowClick?: boolean;
}

export default function DevicesTable<T extends { id: string | number }>({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  paginationClassName,
  isLoading,
  selectable,
  onRowSelect,
  clearSelectionTrigger,
  disableRowClick,
}: DevicesTableProps<T>) {
  const router = useRouter();
  const { user } = useAuth();
  const isRetailer = disableRowClick ?? isRetailerRole(user?.businessRole);

  function handleRowSelection(device: any) {
    if (isRetailer) return;
    router.push(`/devices/${device?.mdmDeviceId || device?.device?.mdmDeviceId}?tab=general`);
  }

  return (
    <Table
      data={data as any}
      columns={columns}
      onItemClick={isRetailer ? undefined : handleRowSelection}
      isPaginated={!!onPageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      paginationClassName={paginationClassName}
      loading={isLoading}
      selectable={selectable}
      onRowSelect={onRowSelect as any}
      clearSelectionTrigger={clearSelectionTrigger}
    />
  );
}
