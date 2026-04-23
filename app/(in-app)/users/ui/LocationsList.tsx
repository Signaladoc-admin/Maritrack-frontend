import { useGetBusiness } from "@/entities/business/model/useBusiness";
import EntityListItem from "./EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { locations } from "../data";

export default function LocationsList() {
  const { user } = useAuth();
  const { data: businessData } = useGetBusiness(user?.businessId!);

  console.log(businessData?.staff);

  return (
    <div className="space-y-1">
      {locations.map((location) => (
        <EntityListItem
          key={location.id}
          id={location.id}
          title={location.name}
          subtitle={location.description}
        />
      ))}
    </div>
  );
}
