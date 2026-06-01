import EntityListItem from "../../shared/ui/EntityListItem";
import { useAuth } from "@/shared/auth/AuthProvider";
import { useGetLocations } from "@/features/business-users/locations/model/useLocations";
import { Location } from "@/features/business-users/locations/types";
import { Skeleton } from "@/shared/ui/skeleton";

export default function LocationsList({ searchTerm }: { searchTerm: string }) {
  const { user } = useAuth();
  const { data: locationsData, isLoading } = useGetLocations({
    businessId: user?.businessId!,
    search: searchTerm,
  });
  const locations = locationsData?.locations || [];

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
