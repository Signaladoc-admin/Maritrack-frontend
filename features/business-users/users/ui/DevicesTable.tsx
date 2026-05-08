import Table from "@/shared/ui/Table/Table";
import { devicesData } from "@/app/(in-app)/devices/data";
import { useRouter } from "next/navigation";
import { Device } from "@/app/(in-app)/devices/types";

export default function DevicesTable({
  columns,
  paginationClassName,
  data,
}: {
  columns: any;
  paginationClassName?: string;
  data: Device[];
}) {
  const router = useRouter();

  function handleRowSelection(device: Device) {
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
