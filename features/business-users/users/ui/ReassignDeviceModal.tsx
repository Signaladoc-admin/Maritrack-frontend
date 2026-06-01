import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { useToast } from "@/shared/ui/toast";
import { assignDeviceToUserSchema, AssignDeviceToUserValues } from "../schema";
import { useAssignUserToDevice, useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import { BusinessStaff } from "@/entities/business/types";
import { InputGroup } from "@/shared/ui/input-group";
import { TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "@/shared/ui/button";
import { StaffDevice } from "@/entities/device";
import {
  useOtherStaffMembersExceptStaff,
  useOtherTeamMembers,
} from "@/entities/business/model/useTeamMembers";

function StaffOptionContent({ staff }: { staff: BusinessStaff }) {
  const firstName = staff.user?.firstName ?? "";
  const lastName = staff.user?.lastName ?? "";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "?";
  const fullName = `${firstName} ${lastName}`.trim() || staff.user?.email;
  const isAdmin = staff.businessRole === "ORGANIZATION_ADMIN";

  return (
    <div className="flex items-center gap-3 py-0.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1b3c73] text-[11px] font-bold text-white">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-medium text-slate-800">{fullName}</span>
          {isAdmin && (
            <span className="shrink-0 rounded bg-[#e8f0fd] px-1.5 py-0.5 text-[10px] font-semibold text-[#1b3c73]">
              Admin
            </span>
          )}
        </div>
        <span className="block truncate text-xs text-slate-500">{staff.user?.email}</span>
        {staff.location && <span className="text-xs text-slate-400">{staff.location}</span>}
      </div>
    </div>
  );
}

export default function ReassignDeviceModal({
  open,
  onOpenChange,
  selectedDevice,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDevice: StaffDevice | null;
}) {
  const [step, setStep] = useState<"select-staff" | "confirm">("select-staff");
  const [selectedStaff, setSelectedStaff] = useState<BusinessStaff | null>(null);

  const { toast } = useToast();
  const { data: zonesData } = useBusinessZones();
  const zoneId = zonesData?.[0]?.id;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);

  const { otherTeamMembers, isLoading } = useOtherStaffMembersExceptStaff({
    excludeUserId: selectedDevice?.currentUserId!,
    search: debouncedSearchTerm,
  });

  const staffMemberOptions = otherTeamMembers.map((s) => ({
    value: s.id,
    label: `${s.user?.firstName ?? ""} ${s.user?.lastName ?? ""}`.trim() || s.user?.email || s.id,
  }));
  const staffById = useMemo(
    () => new Map(otherTeamMembers.map((s) => [s.id, s])),
    [otherTeamMembers]
  );

  const { formState, handleSubmit, reset, control } = useForm<AssignDeviceToUserValues>({
    defaultValues: { staffId: "" },
    resolver: zodResolver(assignDeviceToUserSchema),
  });

  const { mutateAsync: assignUserToDevice, isPending: isReassigning } = useAssignUserToDevice();

  function handleClose() {
    reset();
    setStep("select-staff");
    setSelectedStaff(null);
    onOpenChange(false);
  }

  function onSelectStaff(data: AssignDeviceToUserValues) {
    const staff = staffById.get(data.staffId);
    if (!staff) {
      toast({ type: "error", title: "Selected staff member not found" });
      return;
    }
    setSelectedStaff(staff);
    setStep("confirm");
  }

  async function handleReassign() {
    if (!selectedStaff || !selectedDevice?.mdmDeviceId || !zoneId) {
      toast({ type: "error", title: "Missing required information" });
      return;
    }
    const res = await assignUserToDevice({
      request: {
        deviceIds: [selectedDevice?.mdmDeviceId],
        userId: selectedStaff.user?.id!,
        zoneId,
      },
    });

    if (!res.success) {
      toast({ type: "error", title: res.message || "Failed to reassign device" });
      return;
    }

    toast({ type: "success", title: "Device reassigned successfully" });
    handleClose();
  }

  const newOwnerName = selectedStaff
    ? `${selectedStaff.user?.firstName ?? ""} ${selectedStaff.user?.lastName ?? ""}`.trim() ||
      selectedStaff.user?.email
    : "";

  const isConfirmStep = step === "confirm";

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={isConfirmStep ? undefined : "Reassign Device"}
      confirmClassName={isConfirmStep ? "bg-[#1B3C73]" : undefined}
    >
      {/* Step 1 — select new staff */}
      {step === "select-staff" && (
        <form onSubmit={handleSubmit(onSelectStaff)} className="space-y-1">
          {/* Current device card */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="font-semibold text-slate-800">{selectedDevice?.model ?? "Device"}</p>

            <p className="text-sm text-slate-500">
              Owned by{" "}
              {`${selectedDevice?.currentUser?.firstName} ${selectedDevice?.currentUser?.lastName}`}
            </p>
          </div>

          {/* Connector */}
          <div className="flex flex-col items-center gap-0.5 py-1 text-slate-400">
            <div className="h-6 w-px bg-slate-200" />
            <span className="text-xs">Reassign to</span>
            <div className="h-6 w-px bg-slate-200" />
          </div>

          {/* New staff selector */}
          <Controller
            control={control}
            name="staffId"
            render={({ field }) => (
              <InputGroup label="Staff" error={formState.errors.staffId?.message}>
                <SearchableSelect
                  options={staffMemberOptions}
                  placeholder="Select Staff"
                  value={field.value}
                  onValueChange={field.onChange}
                  isSearchable
                  onSearch={setSearchTerm}
                  isLoading={isLoading}
                  renderOption={(option) => {
                    const staff = staffById.get(option.value);
                    return staff ? <StaffOptionContent staff={staff} /> : option.label;
                  }}
                />
              </InputGroup>
            )}
          />

          <button
            type="submit"
            className="bg-primary mt-4 w-full rounded-xl py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Reassign
          </button>
        </form>
      )}

      {/* Step 2 — confirmation */}
      {step === "confirm" && (
        <div className="flex flex-col gap-4 px-8 py-4">
          <TriangleAlert className="text-primary h-10 w-10" />
          <div className="space-y-2">
            <p className="text-primary text-xl font-medium">
              Are you sure you want to reassign this device?
            </p>
            <p className="text-sm text-slate-500">
              This device will now be in the possession of{" "}
              <strong className="text-slate-700">{newOwnerName}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-xl border-slate-300 px-6 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReassign}
              disabled={isReassigning}
              className="flex-1 rounded-xl bg-[#1B3C73] px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#16305c] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isReassigning ? "Reassigning..." : "Reassign"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
