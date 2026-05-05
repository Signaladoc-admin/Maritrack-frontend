import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetDepartments } from "@/features/business-users/departments/model/useDepartments";
import { Department } from "@/features/business-users/departments/types";

export default function DepartmentsList({ searchTerm }: { searchTerm: string }) {
  const { user } = useAuth();
  const { data: departmentData } = useGetDepartments({
    businessId: user?.businessId!,
    search: searchTerm,
  });
  const departments = departmentData?.departments || [];

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
