import Table from "@/shared/ui/Table/Table";
import { useRouter } from "next/navigation";

export default function DevicesTable<T extends { id: string | number }>({
  columns,
  paginationClassName,
  data,
}: {
  columns: any;
  paginationClassName?: string;
  data: T[];
}) {
  const router = useRouter();

  function handleRowSelection(device: T) {
    router.push(`/devices/${device?.id}`);
  }

  return (
    <>
      <Table
        data={data}
        columns={columns}
        onItemClick={handleRowSelection}
        paginationClassName={paginationClassName}
      />
    </>
  );
}
