import { Skeleton } from "@/shared/ui/skeleton";
import DisplayField from "../../shared/ui/DisplayField";
import { useGetLocation } from "../model/useLocations";
import { formatDate, formatID } from "@/shared/lib/utils";

export default function LocationDetails({ locationId }: { locationId: string }) {
  const { data: location, isLoading } = useGetLocation(locationId);

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
        label="Location ID"
        value={formatID(location?.id || "", "LOC")}
      />
      <DisplayField orientation="horizontal" label="Name" value={location?.name || "-"} />
      {/* <DisplayField
        orientation="horizontal"
        label="Description"
        value={location?.description || "-"}
      /> */}
      <DisplayField
        orientation="horizontal"
        label="Created At"
        value={formatDate(location?.createdAt || "")}
      />
    </div>
  );
}
