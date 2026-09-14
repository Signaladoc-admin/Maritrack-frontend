import { InputGroup } from "@/shared/ui/input-group";
import Modal from "@/shared/ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchableSelect } from "@/shared/ui/searchable-select";
import { useToast } from "@/shared/ui/toast";
import { assignDeviceToUserSchema, AssignDeviceToUserValues } from "../schema";
import { BusinessStaff } from "@/entities/business/types";
import { useStaffMembersInfinite } from "@/entities/business/model/useTeamMembers";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import BusinessPairingQR from "@/entities/business/ui/PairingQRBusinessModal";
import { useGetFullBusinessDetails } from "@/features/onboarding/business/model/useGetBusinessDetails";
import { useCreateDeviceFinance } from "@/entities/device/model/useDeviceFinance";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Calendar } from "@/shared/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Country, State } from "country-state-city";

function StaffOptionContent({ staff }: { staff: BusinessStaff }) {
  const firstName = staff.user?.firstName ?? "";
  const lastName = staff.user?.lastName ?? "";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "-";
  const fullName = `${firstName} ${lastName}`.trim() || staff.user?.email;
  const isAdmin = staff.businessRole === "ORGANIZATION_ADMIN";

  return (
    <div className="flex items-center gap-3 py-0.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-base">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate font-medium text-foreground">{fullName}</span>
          {isAdmin && (
            <span className="shrink-0 rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
              Admin
            </span>
          )}
        </div>
        <span className="block truncate text-xs text-muted-foreground">{staff.user?.email}</span>
        {staff.location && <span className="text-xs text-muted-foreground/70">{staff.location}</span>}
      </div>
    </div>
  );
}

export default function NewDeviceModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState<"select-staff" | "pair-device">("select-staff");
  const [selectedStaff, setSelectedStaff] = useState<BusinessStaff | null>(null);

  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);

  const { staffMembers, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStaffMembersInfinite({ search: debouncedSearchTerm });

  const staffMemberOptions = (staffMembers as BusinessStaff[]).map((s) => ({
    value: s.id,
    label: `${s.user?.firstName ?? ""} ${s.user?.lastName ?? ""}`.trim() || s.user?.email || s.id,
  }));

  const staffById = useMemo(
    () => new Map((staffMembers as BusinessStaff[]).map((s) => [s.id, s])),
    [staffMembers]
  );

  function handleStaffListEndReached() {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }

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

  const { mutateAsync: createDeviceFinance, isPending: isFinancing } = useCreateDeviceFinance();

  function handleClose() {
    reset();
    setStep("select-staff");
    setSelectedStaff(null);
    onOpenChange(false);
  }

  function onSelectStaff(staff: BusinessStaff) {
    setSelectedStaff(staff);
    setStep("pair-device");
  }

  const isPairStep = step === "pair-device";

  async function onSubmit(data: AssignDeviceToUserValues) {
    const staff = staffById.get(data.staffId);
    if (!staff) {
      toast({ type: "error", title: "Selected staff member not found" });
      return;
    }

    if (isDeviceFinance && data.underPaymentPlan) {
      try {
        await createDeviceFinance({
          deviceFinanceUserId: staff.id,
          devicePriceInKobo: Number(data.devicePriceInKobo) * 100,
          downPaymentInKobo: data.downPaymentInKobo ? Number(data.downPaymentInKobo) * 100 : 0,
          monthlyPaymentInKobo: Number(data.monthlyPaymentInKobo) * 100,
          paymentPlanDuration: Number(data.paymentPlanDuration),
          gracePeriodInDays: data.gracePeriodInDays ? Number(data.gracePeriodInDays) : 0,
          paymentStartDate: new Date(data.paymentStartDate!).toISOString(),
          transFer: data.transFer,
          gender: data.gender,
          address: data.address,
          state: data.state,
          country: data.country,
        });

        
        toast({ type: "success", title: "Payment plan initiated successfully" });
      } catch (error: any) {
        toast({ type: "error", title: error?.message || "Failed to initiate payment plan" });
        return; // Don't proceed to QR code if finance creation fails
      }
    }

    onSelectStaff(staff);
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      title={isPairStep ? "" : "New Device"}
      className={isPairStep ? "h-auto rounded-4xl p-10 md:max-w-[1100px] lg:p-20" : undefined}
      {...(!isPairStep && {
        confirmText: "Next",
        onConfirm: handleSubmit(onSubmit),
      })}
    >
      {step === "select-staff" && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            control={control}
            name="staffId"
            render={({ field }) => (
              <InputGroup label={isDeviceFinance ? "User" : "Staff member"} error={formState.errors.staffId?.message}>
                <SearchableSelect
                  options={staffMemberOptions}
                  placeholder="Search by name, email or location"
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
                    <label className="text-sm font-medium text-foreground">Is this device under a payment plan?</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() => field.onChange(false)}
                          className="rounded-sm"
                        />
                        <span className="text-sm text-foreground">No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() => field.onChange(true)}
                          className="rounded-sm"
                        />
                        <span className="text-sm text-foreground">Yes</span>
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
                                  "w-full justify-start text-left font-normal bg-white/5 border-card-line h-12 rounded-xl text-foreground hover:bg-white/10 overflow-hidden",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                                <span className="truncate">
                                  {field.value ? format(new Date(field.value), "PP") : "Pick a date"}
                                </span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-card-line bg-card" align="start">
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
                          id="transfer-profile-new"
                          checked={field.value === true}
                          onCheckedChange={field.onChange}
                          className="rounded-sm"
                        />
                        <label htmlFor="transfer-profile-new" className="text-sm text-foreground cursor-pointer">
                          Transfer user profile to flentra after payment is completed
                        </label>
                      </div>
                    )}
                  />

                  {transFer && (
                    <div className="grid grid-cols-2 gap-4 border-t border-card-line pt-4">
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
        </form>
      )}

      {isPairStep && !!selectedStaff && (
        <BusinessPairingQR
          staffMember={selectedStaff}
          onBack={() => setStep("select-staff")}
          onComplete={handleClose}
        />
      )}
    </Modal>
  );
}
