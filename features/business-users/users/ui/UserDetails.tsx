import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import DisplayField from "../../shared/ui/DisplayField";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export default function UserDetails({ selectedId }: { selectedId: string }) {
  const { data: staffMember, isLoading } = useGetStaffMember(selectedId!);

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
        value={formatID(getValue(staffMember?.userId))}
        className="col-span-2"
      />
      <DisplayField
        orientation="vertical"
        label="First name"
        value={getValue(staffMember?.user?.firstName)}
      />
      <DisplayField
        orientation="vertical"
        label="Last name"
        value={getValue(staffMember?.user?.lastName)}
      />
      <DisplayField
        orientation="vertical"
        label="Email"
        value={getValue(staffMember?.user?.email)}
      />
      <DisplayField
        orientation="vertical"
        label="Phone"
        value={getValue(staffMember?.user?.phone)}
      />
      <DisplayField
        orientation="vertical"
        label="Address"
        value={getValue(staffMember?.location)}
      />
      {/* <DisplayField orientation="vertical" label="City" value={getValue(staffMember?.user?.city)} />
      <DisplayField
        orientation="vertical"
        label="State"
        value={getValue(staffMember?.user?.state)}
      />
      <DisplayField
        orientation="vertical"
        label="Postal Code"
        value={getValue(staffMember?.user?.postalCode)}
      />
      <DisplayField
        orientation="vertical"
        label="Country"
        value={getValue(staffMember?.user?.country)}
      /> */}
    </div>
  );
}
