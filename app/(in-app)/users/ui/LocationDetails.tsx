import DisplayField from "./DisplayField";
import { Location } from "../types";
import { formatDate } from "@/shared/lib/utils";

export default function LocationDetails({ location }: { location: Location }) {
  return (
    <div className="grid gap-2">
      <DisplayField orientation="horizontal" label="Location ID" value={location.id} />
      <DisplayField orientation="horizontal" label="Name" value={location.name} />
      <DisplayField orientation="horizontal" label="Description" value={location.description} />
      <DisplayField
        orientation="horizontal"
        label="Created At"
        value={formatDate(location.createdAt)}
      />
    </div>
  );
}
