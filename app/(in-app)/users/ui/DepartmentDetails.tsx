import DisplayField from "./DisplayField";
import { Department } from "../types";
import { formatDate } from "@/shared/lib/utils";

export default function DepartmentDetails({ department }: { department: Department }) {
  return (
    <div className="grid gap-2">
      <DisplayField orientation="horizontal" label="Department ID" value={department.id} />
      <DisplayField orientation="horizontal" label="Name" value={department.name} />
      <DisplayField orientation="horizontal" label="Description" value={department.description} />
      <DisplayField
        orientation="horizontal"
        label="Created At"
        value={formatDate(department.createdAt)}
      />
    </div>
  );
}
