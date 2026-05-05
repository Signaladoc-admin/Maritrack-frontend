import Table from "@/shared/ui/Table/Table";
import { devicesColumns } from "@/app/(in-app)/devices/columns";
import { devicesData } from "@/app/(in-app)/devices/data";

export default function AssociatedDevicesTable({ userId }: { userId?: string }) {
  //   const { data: devices } = useGetDevices({ userId });

  return <Table data={devicesData.slice(0, 5)} columns={devicesColumns} />;
}
