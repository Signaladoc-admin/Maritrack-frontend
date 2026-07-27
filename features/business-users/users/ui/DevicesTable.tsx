import { Device, DeviceHardwareInfo, StaffDevice } from "@/entities/device";
import { DeviceHardwareDetails } from "@/features/device/types";
import Table from "@/shared/ui/Table/Table";
import { useRouter } from "next/navigation";

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
}: DevicesTableProps<T>) {
  const router = useRouter();

  function handleRowSelection(device: any) {
    router.push(`/devices/${device?.mdmDeviceId || device?.device?.mdmDeviceId}?tab=general`);
  }

  return (
    <Table
      data={data as any}
      columns={columns}
      onItemClick={handleRowSelection}
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
