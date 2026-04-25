import { useGetBusiness } from "@/entities/business/model/useBusiness";
import EntityListItem from "./EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { users } from "../data";

export default function UsersList() {
  const { user } = useAuth();
  const { data: businessData } = useGetBusiness(user?.businessId!);

  return (
    <div className="space-y-1">
      {users.map((user: any) => (
        <EntityListItem
          key={user.id}
          id={user.id}
          title={`${user.firstName} ${user.lastName}`}
          subtitle={user.email}
        />
      ))}
    </div>
  );
}
