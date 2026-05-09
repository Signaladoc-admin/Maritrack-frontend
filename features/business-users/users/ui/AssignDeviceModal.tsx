import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { useToast } from "@/shared/ui/toast";
import { assignDeviceToUserSchema, AssignDeviceToUserValues } from "../schema";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { useGetStaffMembers } from "@/entities/business/model/useStaffMembers";
import { BusinessStaff } from "@/entities/business/types";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import BusinessPairingQR from "@/entities/business/ui/PairingQRBusinessModal";

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

export default function AssignDeviceModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<"select-staff" | "pair-device">("select-staff");
  const [selectedStaff, setSelectedStaff] = useState<BusinessStaff | null>(null);

  const { toast } = useToast();
  const { data: zonesData } = useBusinessZones();
  const zoneId = zonesData?.[0]?.id;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);

  const { data: staffMembersData, isLoading } = useGetStaffMembers({
    search: debouncedSearchTerm,
  });

  const staffMembers: BusinessStaff[] = staffMembersData?.staff ?? [];

  const staffMemberOptions = staffMembers.map((s) => ({
    value: s.id,
    label: `${s.user?.firstName ?? ""} ${s.user?.lastName ?? ""}`.trim() || s.user?.email || s.id,
  }));

  const staffById = useMemo(() => new Map(staffMembers.map((s) => [s.id, s])), [staffMembers]);

  const { formState, handleSubmit, reset, control } = useForm<AssignDeviceToUserValues>({
    defaultValues: { staffId: "" },
    resolver: zodResolver(assignDeviceToUserSchema),
  });

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
    setStep("pair-device");
  }

  const isPairStep = step === "pair-device";

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={isPairStep ? "" : "Assign device to user"}
      className={isPairStep ? "sm:max-w-3xl" : undefined}
      {...(!isPairStep && {
        confirmText: "Next",
        onConfirm: handleSubmit(onSelectStaff),
      })}
    >
      {step === "select-staff" && (
        <form onSubmit={handleSubmit(onSelectStaff)} className="space-y-6">
          <Controller
            control={control}
            name="staffId"
            render={({ field }) => (
              <InputGroup label="Staff member" error={formState.errors.staffId?.message}>
                <SearchableSelect
                  options={staffMemberOptions}
                  placeholder="Search by name, email or location"
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
        </form>
      )}

      {isPairStep && selectedStaff && (
        <BusinessPairingQR
          staffId={selectedStaff.userId}
          zoneId={zoneId}
          onboardingCode={(selectedStaff as any).onboardingCode ?? ""}
          onBack={() => setStep("select-staff")}
          onComplete={handleClose}
        />
      )}
    </Modal>
  );
}
