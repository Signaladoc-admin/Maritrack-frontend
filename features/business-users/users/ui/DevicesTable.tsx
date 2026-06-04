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
}

export default function DevicesTable<T extends { id: string | number }>({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  paginationClassName,
  isLoading,
}: DevicesTableProps<T>) {
  const router = useRouter();

  function handleRowSelection(device: any) {
    router.push(`/devices/${device?.mdmDeviceId}`);
  }

  return (
    <Table
      data={data}
      columns={columns}
      onItemClick={handleRowSelection}
      isPaginated={!!onPageChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      paginationClassName={paginationClassName}
      loading={isLoading}
    />
  );
}
