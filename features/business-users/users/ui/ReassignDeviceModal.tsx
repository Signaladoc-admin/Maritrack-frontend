import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { useToast } from "@/shared/ui/toast";
import { assignDeviceToUserSchema, AssignDeviceToUserValues } from "../schema";
import { BusinessStaff } from "@/entities/business/types";
import { InputGroup } from "@/shared/ui/input-group";
import { TriangleAlert } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { StaffDevice } from "@/entities/device";
import { useOtherStaffMembersExceptStaff } from "@/entities/business/model/useTeamMembers";
import { useDeviceDetail } from "@/features/device/model/useDeviceDetail";
import { MDMDeviceDetailsResponse } from "@/features/device/types";
import { useUserById } from "@/entities/user/model/useUserProfile";
import { useReassignDevice } from "@/features/business-users/users/model/useReassignDevice";
import { useCreateDeviceAssignment } from "@/entities/device/model/useDeviceAssignments";
import { useGetFullBusinessDetails } from "@/features/onboarding/business/model/useGetBusinessDetails";
import { useCreateDeviceFinance } from "@/entities/device/model/useDeviceFinance";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { Country, State } from "country-state-city";

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

// Mirrors the "select staff" step layout: current device card, the
// "Reassign to" connector, the staff selector (label + input), and the submit button.
function ReassignDeviceModalSkeleton() {
  return (
    <div className="space-y-1">
      {/* Current device card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3.5 w-44" />
      </div>

      {/* Connector */}
      <div className="flex flex-col items-center gap-0.5 py-1">
        <div className="h-6 w-px bg-slate-200" />
        <span className="text-xs text-slate-400">Reassign to</span>
        <div className="h-6 w-px bg-slate-200" />
      </div>

      {/* New staff selector */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="h-[50px] w-full rounded-xl" />
      </div>

      {/* Submit button */}
      <Skeleton className="mt-4 h-12 w-full rounded-xl" />
    </div>
  );
}

// Mirrors the "Assign Device" layout: just the staff selector (label + input)
// and the submit button — no current-device card or "Reassign to" connector.
function AssignDeviceModalSkeleton() {
  return (
    <div className="space-y-1">
      {/* Staff selector */}
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="h-[50px] w-full rounded-xl" />
      </div>

      {/* Submit button */}
      <Skeleton className="mt-4 h-12 w-full rounded-xl" />
    </div>
  );
}

export default function ReassignDeviceModal({
  open,
  onOpenChange,
  selectedDevice,
  selectedDeviceMdmId,
  type = "REASSIGN",
  refetch,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // Two ways to populate the modal:
  // 1. Caller already has the staff member's device record (e.g. AssociatedDevicesTable
  //    on the staff profile) — pass it directly via `selectedDevice`.
  // 2. Caller only knows the device's MDM id (e.g. the device details page) — pass
  //    `selectedDeviceMdmId` and the modal fetches the hardware + current owner itself.
  selectedDevice?: StaffDevice | null;
  selectedDeviceMdmId?: string;
  type?: "ASSIGN" | "REASSIGN";
  refetch?: () => void | Promise<unknown>;
}) {
  const [step, setStep] = useState<"select-staff" | "confirm">("select-staff");
  const [selectedStaff, setSelectedStaff] = useState<BusinessStaff | null>(null);

  const { data: hardwareData, isLoading: isHardwareLoading } = useDeviceDetail(
    selectedDeviceMdmId!,
    "hardware",
    {
      enabled: !!selectedDeviceMdmId && !selectedDevice,
    }
  );
  const deviceResponse: MDMDeviceDetailsResponse = hardwareData;
  const fetchedSelectedDevice = deviceResponse?.deviceDetails;

  const actualSelectedDevice = selectedDevice ? selectedDevice : fetchedSelectedDevice;

  const currentStaffUserId = actualSelectedDevice?.currentUserId;

  const { data: currentStaffUserData, isLoading: isCurrentStaffUserLoading } = useUserById(
    currentStaffUserId!,
    {
      enabled: !!currentStaffUserId && !selectedDevice,
    }
  );
  let currentStaffUser;
  if (currentStaffUserData?.success) {
    currentStaffUser = currentStaffUserData?.data;
  }

  const firstName =
    (selectedDevice ? selectedDevice?.currentUser?.firstName : currentStaffUser?.firstName) || "";
  const lastName =
    (selectedDevice ? selectedDevice?.currentUser?.lastName : currentStaffUser?.lastName) || "";
  const fullName = `${firstName} ${lastName}`.trim() || currentStaffUser?.email || "N/A";

  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);

  const { otherTeamMembers, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOtherStaffMembersExceptStaff({
      excludeUserId: actualSelectedDevice?.currentUserId!,
      search: debouncedSearchTerm,
    });

  function handleStaffListEndReached() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const staffMemberOptions = otherTeamMembers.map((s) => ({
    value: s.id,
    label: `${s.user?.firstName ?? ""} ${s.user?.lastName ?? ""}`.trim() || s.user?.email || s.id,
  }));
  const staffById = useMemo(
    () => new Map(otherTeamMembers.map((s) => [s.id, s])),
    [otherTeamMembers]
  );

  const { formState, handleSubmit, reset, control, watch, setValue } = useForm<AssignDeviceToUserValues>({
    defaultValues: { staffId: "", underPaymentPlan: false, transFer: false },
    resolver: zodResolver(assignDeviceToUserSchema),
  });

  const underPaymentPlan = watch("underPaymentPlan");
  const transFer = watch("transFer");
  const watchCountry = watch("country");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const countriesList = useMemo(() => Country.getAllCountries().map(c => ({ label: c.name, value: c.name })), []);
  const selectedCountryIso = useMemo(() => Country.getAllCountries().find(c => c.name === watchCountry)?.isoCode, [watchCountry]);
  const statesList = useMemo(() => selectedCountryIso ? State.getStatesOfCountry(selectedCountryIso).map(s => ({ label: s.name, value: s.name })) : [], [selectedCountryIso]);

  const { business } = useGetFullBusinessDetails();
  const isDeviceFinance = (business?.profile as any)?.type === "DEVICE_FINANCING";

  const { mutateAsync: reassignDevice, isPending: isReassigning } = useReassignDevice();
  const { mutateAsync: createDeviceAssignment, isPending: isAssigning } =
    useCreateDeviceAssignment();
  const { mutateAsync: createDeviceFinance, isPending: isFinancing } = useCreateDeviceFinance();
  const isPending = isReassigning || isAssigning || isFinancing;

  function handleClose() {
    reset();
    setStep("select-staff");
    setSelectedStaff(null);
    onOpenChange(false);
  }

  function onSelectStaff(data: AssignDeviceToUserValues) {
    const staff = staffById.get(data.staffId);

    if (staff) setSelectedStaff(staff);
    setStep("confirm");
  }

  async function handleReassign() {
    const userIdToAssign = selectedStaff?.user?.id || selectedStaff?.userId;
    try {
      if (type === "ASSIGN") {
        await createDeviceAssignment({
          userId: userIdToAssign as string,
          deviceId: actualSelectedDevice?.id as string,
        });
      } else {
        await reassignDevice({
          userId: userIdToAssign as string,
          deviceId: actualSelectedDevice?.id as string,
          departmentId: selectedStaff?.staffDepartmentId as string,
        });
      }

      // 2. If under payment plan, create the finance record
      if (isDeviceFinance && underPaymentPlan) {
        const formValues = control._formValues as AssignDeviceToUserValues;
        await createDeviceFinance({
          deviceFinanceUserId: userIdToAssign as string,
          devicePriceInKobo: Number(formValues.devicePriceInKobo) * 100,
          downPaymentInKobo: formValues.downPaymentInKobo ? Number(formValues.downPaymentInKobo) * 100 : 0,
          monthlyPaymentInKobo: Number(formValues.monthlyPaymentInKobo) * 100,
          paymentPlanDuration: Number(formValues.paymentPlanDuration),
          gracePeriodInDays: formValues.gracePeriodInDays ? Number(formValues.gracePeriodInDays) : 0,
          paymentStartDate: new Date(formValues.paymentStartDate!).toISOString(),
          transFer: formValues.transFer,
          gender: formValues.gender,
          address: formValues.address,
          state: formValues.state,
          country: formValues.country,
        });
      }

      toast({
        type: "success",
        title: `Device ${type === "ASSIGN" ? "assigned" : "reassigned"} successfully${underPaymentPlan ? " with payment plan" : ""}`,
      });
      await refetch?.();
      handleClose();
    } catch (error: any) {
      toast({
        type: "error",
        title: error?.message || `Failed to ${type === "ASSIGN" ? "assign" : "reassign"} device`,
      });
    }
  }

  const newOwnerName = selectedStaff
    ? `${selectedStaff.user?.firstName ?? ""} ${selectedStaff.user?.lastName ?? ""}`.trim() ||
      selectedStaff.user?.email
    : "";

  const isConfirmStep = step === "confirm";

  const modalTitle = type === "REASSIGN" ? "Reassign Device" : "Assign Device";

  if (isHardwareLoading || isCurrentStaffUserLoading) {
    return (
      <Modal isOpen={open} onClose={handleClose} title={modalTitle}>
        {type === "ASSIGN" ? <AssignDeviceModalSkeleton /> : <ReassignDeviceModalSkeleton />}
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={isConfirmStep ? undefined : modalTitle}
      confirmClassName={isConfirmStep ? "bg-[#1B3C73]" : undefined}
    >
      {/* Step 1 — select new staff */}
      {step === "select-staff" && (
        <form onSubmit={handleSubmit(onSelectStaff)} className="space-y-1">
          {/* Current device card */}
          {type === "REASSIGN" && (
            <>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="mb-2 font-semibold text-slate-800">
                  {actualSelectedDevice?.model ?? "Device"}
                </p>

                <p className="text-sm text-slate-500">
                  Owned by <span className="font-medium text-slate-900">{fullName}</span>
                </p>
                <p className="text-muted-foreground text-xs">
                  {selectedDevice
                    ? selectedDevice?.currentUser?.email
                    : currentStaffUser?.email || "N/A"}
                </p>
              </div>
              {/* Connector */}
              <div className="flex flex-col items-center gap-0.5 py-1 text-slate-400">
                <div className="h-6 w-px bg-slate-200" />
                <span className="text-xs">Reassign to</span>
                <div className="h-6 w-px bg-slate-200" />
              </div>
            </>
          )}

          {/* New staff selector */}
          <Controller
            control={control}
            name="staffId"
            render={({ field }) => (
              <InputGroup label={isDeviceFinance ? "User" : "Staff"} error={formState.errors.staffId?.message}>
                <SearchableSelect
                  options={staffMemberOptions}
                  placeholder="Select Staff"
                  value={field.value}
                  onValueChange={field.onChange}
                  isSearchable
                  onSearch={setSearchTerm}
                  isLoading={isLoading}
                  onEndReached={handleStaffListEndReached}
                  isLoadingMore={isFetchingNextPage}
                  renderOption={(option) => {
                    const staff = staffById.get(option.value);
                    return staff ? <StaffOptionContent staff={staff} /> : option.label;
                  }}
                />
              </InputGroup>
            )}
          />

          {isDeviceFinance && (
            <div className="space-y-5 pt-2">
              <Controller
                control={control}
                name="underPaymentPlan"
                render={({ field }) => (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700">Is this device under a payment plan?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() => field.onChange(false)}
                          className="rounded-sm"
                        />
                        <span className="text-sm text-slate-700">No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() => field.onChange(true)}
                          className="rounded-sm"
                        />
                        <span className="text-sm text-slate-700">Yes</span>
                      </label>
                    </div>
                  </div>
                )}
              />

              {underPaymentPlan && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="devicePriceInKobo"
                      render={({ field }) => (
                        <InputGroup label="Device price (₦)" error={formState.errors.devicePriceInKobo?.message}>
                          <Input type="number" placeholder="₦0.00" {...field} value={field.value ?? ""} />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name="downPaymentInKobo"
                      render={({ field }) => (
                        <InputGroup label="Initial payment (₦)" error={formState.errors.downPaymentInKobo?.message}>
                          <Input type="number" placeholder="₦0.00" {...field} value={field.value ?? ""} />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name="monthlyPaymentInKobo"
                      render={({ field }) => (
                        <InputGroup label="Monthly payment (₦)" error={formState.errors.monthlyPaymentInKobo?.message}>
                          <Input type="number" placeholder="₦0.00" {...field} value={field.value ?? ""} />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name="paymentPlanDuration"
                      render={({ field }) => (
                        <InputGroup label="Repayment duration" helpText="in months" error={formState.errors.paymentPlanDuration?.message}>
                          <Input type="number" placeholder="0" {...field} value={field.value ?? ""} />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name="gracePeriodInDays"
                      render={({ field }) => (
                        <InputGroup label="Grace period (in days)" error={formState.errors.gracePeriodInDays?.message}>
                          <Input type="number" placeholder="0" {...field} value={field.value ?? ""} />
                        </InputGroup>
                      )}
                    />
                    <Controller
                      control={control}
                      name="paymentStartDate"
                      render={({ field }) => (
                        <InputGroup label="Payment start date" error={formState.errors.paymentStartDate?.message}>
                          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal bg-[#fafafa] border-[#E5E7EB] h-12 rounded-xl text-slate-800 hover:bg-[#fafafa]",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => {
                                  field.onChange(date ? date.toISOString() : undefined);
                                  setIsCalendarOpen(false);
                                }}
                                disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </InputGroup>
                      )}
                    />
                  </div>

                  <Controller
                    control={control}
                    name="transFer"
                    render={({ field }) => (
                      <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                          id="transfer-profile"
                          checked={field.value === true}
                          onCheckedChange={field.onChange}
                          className="rounded-sm"
                        />
                        <label htmlFor="transfer-profile" className="text-sm text-slate-700 cursor-pointer">
                          Transfer user profile to flentra after payment is completed
                        </label>
                      </div>
                    )}
                  />

                  {transFer && (
                    <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                      <Controller
                        control={control}
                        name="gender"
                        render={({ field }) => (
                          <InputGroup label="Gender" error={formState.errors.gender?.message}>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </InputGroup>
                        )}
                      />
                      <Controller
                        control={control}
                        name="address"
                        render={({ field }) => (
                          <InputGroup label="Address" error={formState.errors.address?.message}>
                            <Input placeholder="Enter address" {...field} value={field.value ?? ""} />
                          </InputGroup>
                        )}
                      />
                      <Controller
                        control={control}
                        name="country"
                        render={({ field }) => (
                          <InputGroup label="Country" error={formState.errors.country?.message}>
                            <SearchableSelect
                              options={countriesList}
                              placeholder="Select country"
                              value={field.value}
                              onValueChange={(val) => {
                                field.onChange(val);
                                setValue("state", "");
                              }}
                              isSearchable={true}
                            />
                          </InputGroup>
                        )}
                      />
                      <Controller
                        control={control}
                        name="state"
                        render={({ field }) => (
                          <InputGroup label="State" error={formState.errors.state?.message}>
                            <SearchableSelect
                              options={statesList}
                              placeholder="Select state"
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={!watchCountry || statesList.length === 0}
                              isSearchable={true}
                            />
                          </InputGroup>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <Button type="submit" className="mt-4 w-full">
            {modalTitle}
          </Button>
        </form>
      )}

      {/* Step 2 — confirmation */}
      {step === "confirm" && (
        <div className="flex flex-col gap-4 px-8 py-4">
          <TriangleAlert className="text-primary h-10 w-10" />
          <div className="space-y-2">
            <p className="text-primary text-xl font-medium">
              Are you sure you want to {type.toLowerCase()} this device?
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
              disabled={isPending}
              className="flex-1 rounded-xl bg-[#1B3C73] px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#16305c] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? `${modalTitle === "Assign Device" ? "Assigning Device" : "Reassigning Device"}...`
                : modalTitle}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
