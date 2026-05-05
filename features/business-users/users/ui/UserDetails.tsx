import { useGetTeamMember } from "@/entities/business/model/useTeamMembers";
import DisplayField from "../../shared/ui/DisplayField";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export default function UserDetails({ selectedId }: { selectedId: string }) {
  const { data: teamMember, isLoading } = useGetTeamMember(selectedId!);

  function getValue(value: string | undefined | null) {
    return value || "N/A";
  }

  if (isLoading) {
    return (
      <div className="grid gap-2 md:grid-cols-2">
        <Skeleton className="col-span-2 h-16" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-2">
      <DisplayField
        orientation="horizontal"
        label="User ID"
        value={formatID(getValue(teamMember?.userId))}
        className="col-span-2"
      />
      <DisplayField
        orientation="vertical"
        label="First name"
        value={getValue(teamMember?.user?.firstName)}
      />
      <DisplayField
        orientation="vertical"
        label="Last name"
        value={getValue(teamMember?.user?.lastName)}
      />
      <DisplayField
        orientation="vertical"
        label="Email"
        value={getValue(teamMember?.user?.email)}
      />
      <DisplayField
        orientation="vertical"
        label="Phone"
        value={getValue(teamMember?.user?.phone)}
      />
      <DisplayField
        orientation="vertical"
        label="Address"
        value={getValue(teamMember?.user?.address)}
      />
      <DisplayField orientation="vertical" label="City" value={getValue(teamMember?.user?.city)} />
      <DisplayField
        orientation="vertical"
        label="State"
        value={getValue(teamMember?.user?.state)}
      />
      <DisplayField
        orientation="vertical"
        label="Postal Code"
        value={getValue(teamMember?.user?.postalCode)}
      />
      <DisplayField
        orientation="vertical"
        label="Country"
        value={getValue(teamMember?.user?.country)}
      />
    </div>
  );
}
