import DisplayField from "../../shared/ui/DisplayField";
import { formatDate, formatID } from "@/shared/lib/utils";
import { useGetDepartment } from "@/features/business-users/departments/model/useDepartments";
import { Skeleton } from "@/shared/ui/skeleton";

export default function DepartmentDetails({ departmentId }: { departmentId?: string }) {
  const { data: department, isLoading } = useGetDepartment(departmentId || "");

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12" /> <Skeleton className="h-12" /> <Skeleton className="h-12" />{" "}
        <Skeleton className="h-12" />
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      <DisplayField
        orientation="horizontal"
        label="Department ID"
        value={department?.id ? formatID(department?.id!, "DEPT") : ""}
        hoverTitle={department?.id!}
      />
      <DisplayField orientation="horizontal" label="Name" value={department?.name!} />
      {/* <DisplayField orientation="horizontal" label="Description" value={department?.description} /> */}
      <DisplayField
        orientation="horizontal"
        label="Created At"
        value={formatDate(department?.createdAt!)}
      />
    </div>
  );
}
