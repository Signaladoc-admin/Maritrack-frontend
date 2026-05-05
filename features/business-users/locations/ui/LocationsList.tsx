import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetLocations } from "@/features/business-users/locations/model/useLocations";
import { Location } from "@/features/business-users/locations/types";

export default function LocationsList({ searchTerm }: { searchTerm: string }) {
  const { user } = useAuth();
  const { data: locationsData } = useGetLocations({
    businessId: user?.businessId!,
    search: searchTerm,
  });
  const locations = locationsData?.locations || [];

  return (
    <div className="space-y-1">
      {locations?.map((location: Location) => (
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
