import { useGetBusiness } from "@/entities/business/model/useBusiness";
import EntityListItem from "./EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { departments } from "../data";

export default function DepartmentsList() {
  const { user } = useAuth();
  const { data: businessData } = useGetBusiness(user?.businessId!);

  console.log(businessData?.staff);

  return (
    <div className="space-y-1">
      {departments.map((department) => (
        <EntityListItem
          key={department.id}
          id={department.id}
          title={department.name}
          subtitle={department.description}
        />
      ))}
    </div>
  );
}
