import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetDepartments } from "@/features/business-users/departments/model/useDepartments";
import { Department } from "@/features/business-users/departments/types";
import { Skeleton } from "@/shared/ui/skeleton";
import { useEffect } from "react";

export default function DepartmentsList({
  searchTerm,
  currentPage,
  setSelectedTabTotalPages,
}: {
  searchTerm: string;
  currentPage: number;
  setSelectedTabTotalPages: (totalPages: number) => void;
}) {
  const { user } = useAuth();
  const { data: departmentData, isLoading } = useGetDepartments({
    businessId: user?.businessId!,
    search: searchTerm,
    page: currentPage,
    limit: 5,
  });
  const departments = departmentData?.departments || [];

  useEffect(() => {
    if (departmentData?.totalPages !== undefined) {
      setSelectedTabTotalPages(departmentData.totalPages);
    }
  }, [departmentData?.totalPages, setSelectedTabTotalPages]);

  if (isLoading)
    return (
      <div className="space-y-3 p-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );

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
