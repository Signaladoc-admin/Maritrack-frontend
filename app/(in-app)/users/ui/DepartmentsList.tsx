import EntityListItem from "./EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetDepartments } from "@/features/departments/model/useDepartments";
import { Department } from "@/features/departments/types";

export default function DepartmentsList() {
  const { user } = useAuth();
  const { data: departmentData } = useGetDepartments({
    businessId: user?.businessId!,
  });
  const departments = departmentData?.departments || [];

  console.log(departmentData);

  return (
    <div className="space-y-1">
      {departments?.map((department: Department) => (
        <EntityListItem
          key={department.id}
          id={department.id}
          title={department.name}
          subtitle={(department as any).description}
        />
      ))}
    </div>
  );
}
