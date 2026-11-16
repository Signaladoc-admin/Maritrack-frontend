import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import DisplayField from "../../shared/ui/DisplayField";
import { formatID } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";
import { useState } from "react";
import { format } from "date-fns";
import {
  Smartphone,
  Store,
  CreditCard,
  KeyRound,
  Check,
  Copy,
  Building2,
  Calendar,
  ShieldCheck,
  QrCode,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { QRCodeCard } from "@/shared/ui/cards/qr-code-card";
import { useQrCode } from "@/features/mdm-sync/model/useQrCode";

export default function UserDetails({ selectedId }: { selectedId: string }) {
  const { data: staffMember, isLoading } = useGetStaffMember(selectedId!);
  const {
    qrCodeSrc,
    isLoading: isQrLoading,
    isPending: isQrPending,
    isError: isQrError,
    refetch: refetchQr,
  } = useQrCode(selectedId!);
  const isGeneratingQr = isQrLoading || isQrPending;
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  function getValue(value: string | undefined | null) {
    return value || "N/A";
  }

  function handleCopy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  if (isLoading) {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Skeleton className="col-span-2 h-16 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="col-span-2 h-40 rounded-xl" />
      </div>
    );
  }

  const financing = (staffMember as any)?.onDeviceFinancing || (staffMember as any)?.deviceFinancing;
  const retailer = (staffMember as any)?.retailer;
  const activationCode = (staffMember as any)?.activationCode;
  const businessPartner = (staffMember as any)?.business;
  const isDeviceFinanceUser =
    (staffMember as any)?.isDeviceFinanced !== undefined ||
    !!financing ||
    !!retailer ||
    !!activationCode;

  const hasDeviceAssigned = Boolean(
    (staffMember?.device &&
      staffMember.device.assignmentStatus !== "UNASSIGNED" &&
      staffMember.device.assignmentStatus !== "RETURNED" &&
      (staffMember.device.id ||
        staffMember.device.mdmDeviceId ||
        staffMember.device.serialNumber ||
        Object.keys(staffMember.device).length > 0)) ||
      (staffMember as any)?.deviceId ||
      (Array.isArray((staffMember as any)?.devices) &&
        (staffMember as any).devices.some(
          (d: any) => d.assignmentStatus !== "UNASSIGNED" && d.assignmentStatus !== "RETURNED"
        )) ||
      activationCode?.status === "USED"
  );

  const formatKobo = (kobo: number | string | undefined | null) => {
    if (kobo === undefined || kobo === null) return "₦0.00";
    return `₦${(Number(kobo) / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateStr: string | undefined | null) => {
    if (!dateStr) return "N/A";
    try {
      return format(new Date(dateStr), "MMM dd, yyyy");
    } catch {
      return dateStr;
    }
  };

  if (isDeviceFinanceUser) {
    return (
      <div className="space-y-6">
        {/* User Identity & Activation Banner */}
        <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--card-line)]">
            <div className="flex items-center gap-3">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: "#05E0E5", color: "#002147" }}
              >
                {`${staffMember?.user?.firstName?.[0] || ""}${staffMember?.user?.lastName?.[0] || ""}`.toUpperCase() || "-"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">
                    {`${staffMember?.user?.firstName || ""} ${staffMember?.user?.lastName || ""}`.trim() || "User Details"}
                  </h2>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold",
                      staffMember?.user?.status === "ACTIVE"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {staffMember?.user?.status || "ACTIVE"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {staffMember?.user?.email || "No email"} • {staffMember?.user?.phone || "No phone"}
                </p>
              </div>
            </div>

            {/* Quick Codes */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {activationCode?.code && (
                <div className="flex items-center gap-2 rounded-xl border border-[var(--card-line)] bg-white/5 px-3 py-2">
                  <KeyRound className="size-3.5 text-primary shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Activation Code</span>
                    <span className="font-mono font-medium text-foreground">{activationCode.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(activationCode.code, "activation")}
                    className="p-1 hover:text-primary transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === "activation" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              )}

              {(staffMember as any)?.onboardingCode && (
                <div className="flex items-center gap-2 rounded-xl border border-[var(--card-line)] bg-white/5 px-3 py-2">
                  <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Onboarding Code</span>
                    <span className="font-mono font-medium text-foreground">
                      {(staffMember as any).onboardingCode}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy((staffMember as any).onboardingCode, "onboarding")}
                    className="p-1 hover:text-primary transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === "onboarding" ? (
                      <Check className="size-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="size-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Fields Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-4">
            <div>
              <p className="text-[11px] text-muted-foreground">User ID</p>
              <p className="text-xs font-mono font-medium text-foreground truncate mt-0.5">
                {formatID(staffMember?.userId || staffMember?.id || "")}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Location</p>
              <p className="text-xs font-medium text-foreground mt-0.5">
                {getValue(staffMember?.location || (staffMember as any)?.address)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Gender</p>
              <p className="text-xs font-medium text-foreground mt-0.5">
                {getValue((staffMember as any)?.gender)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">State / Country</p>
              <p className="text-xs font-medium text-foreground mt-0.5">
                {[ (staffMember as any)?.state, (staffMember as any)?.country ].filter(Boolean).join(", ") || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Financed Device, Retailer & Pairing QR Grid */}
        <div className={cn("grid gap-4 md:grid-cols-2", !hasDeviceAssigned && "lg:grid-cols-3")}>
          {/* Financed Device Card */}
          <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--card-line)]">
              <Smartphone className="size-4 text-primary shrink-0" />
              <h3 className="text-sm font-semibold text-foreground">Financed Device</h3>
            </div>
            {financing ? (
              <div className="space-y-3">
                <div>
                  <p className="text-base font-bold text-foreground">
                    {financing.deviceBrand} {financing.deviceModel}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {[
                      financing.deviceType,
                      financing.deviceColour,
                      financing.deviceMemory && `${financing.deviceMemory} Storage`,
                      financing.deviceRam && `${financing.deviceRam} RAM`,
                    ]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--card-line)]">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">Device Price</span>
                    <span className="text-sm font-semibold text-foreground">
                      {formatKobo(financing.devicePriceInKobo)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block">Initial Down Payment</span>
                    <span className="text-sm font-semibold text-emerald-400">
                      {formatKobo(financing.downPaymentInKobo)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No financed device registered.</p>
            )}
          </div>

          {/* Retailer Card */}
          <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--card-line)]">
              <Store className="size-4 text-primary shrink-0" />
              <h3 className="text-sm font-semibold text-foreground">Retailer Details</h3>
            </div>
            {retailer ? (
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-bold text-foreground">{retailer.legalName}</p>
                    {retailer.branchName && (
                      <span className="text-xs bg-white/5 border border-[var(--card-line)] px-2 py-0.5 rounded text-muted-foreground">
                        {retailer.branchName}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Ref: {retailer.referenceNumber || "N/A"} • RC: {retailer.rcNumber || "N/A"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--card-line)] text-xs">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">Contact Phone</span>
                    <span className="font-medium text-foreground">{retailer.phone || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-muted-foreground block">Contact Email</span>
                    <span className="font-medium text-foreground truncate block">{retailer.email || "N/A"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[11px] text-muted-foreground block">Store Address</span>
                    <span className="font-medium text-foreground">
                      {[retailer.address, retailer.city, retailer.state, retailer.country].filter(Boolean).join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No retailer assigned.</p>
            )}
          </div>

          {/* Device Pairing QR Card */}
          {!hasDeviceAssigned && (
            <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--card-line)]">
                <div className="flex items-center gap-2">
                  <QrCode className="size-4 text-primary shrink-0" />
                  <h3 className="text-sm font-semibold text-foreground">Device Pairing QR</h3>
                </div>
                <span className="text-[10px] text-muted-foreground uppercase font-medium">MDM Enrollment</span>
              </div>

              <div className="flex flex-1 items-center justify-center py-2">
                <QRCodeCard
                  src={qrCodeSrc || ""}
                  isLoading={isGeneratingQr}
                  isError={isQrError}
                  statusLabel="Live Enrollment Key"
                  description="Scan with Flentra MDM Companion app on the device to pair."
                  allowEnlarge
                  onRefresh={refetchQr}
                  className="w-full border-none bg-transparent p-0 shadow-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Financing Agreement & Terms */}
        {financing && (
          <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--card-line)]">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-primary shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">Financing & Payment Agreement</h3>
              </div>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  financing.paymentStatus === "PAID"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : financing.paymentStatus === "PENDING"
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : "bg-red-500/15 text-red-400 border border-red-500/30"
                )}
              >
                {financing.paymentStatus || "PENDING"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Monthly Payment</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {formatKobo(financing.monthlyPaymentInKobo)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Payment</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {formatKobo(financing.totalPaymentInKobo)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Remaining Payment</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {formatKobo(financing.remainingPaymentInKobo)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-base font-bold text-foreground mt-0.5">
                  {financing.paymentPlanDuration} Months ({financing.paymentPlan})
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Interest Rate & Model</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">
                  {financing.interestRate}% {financing.interestModel} ({formatKobo(financing.interestAmountInKobo)})
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Grace Period</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">
                  {financing.gracePeriodInDays || 0} days
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Start Date</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">
                  {formatDate(financing.paymentStartDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment End Date</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">
                  {formatDate(financing.paymentEndDate)}
                </p>
              </div>
            </div>

            {businessPartner && (
              <div className="mt-3 pt-3 border-t border-[var(--card-line)] flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary shrink-0" />
                  <span>Partner Bank: <strong className="text-foreground">{businessPartner.name}</strong> ({businessPartner.partnerType || "BANK"})</span>
                </div>
                <span>RC: {businessPartner.rcNumber || "N/A"}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Regular staff view (fallback for non-device-financing users)
  return (
    <div className={cn("grid gap-6", !hasDeviceAssigned && "lg:grid-cols-[1.3fr_0.9fr]")}>
      <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--card-line)]">
          <h3 className="text-sm font-semibold text-foreground">Staff Details</h3>
          <span className="text-xs text-muted-foreground">{staffMember?.user?.email}</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
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
            className="col-span-2"
          />
          {((staffMember as any)?.onboardingCode || (staffMember as any)?.activationCode) && (
            <DisplayField
              orientation="horizontal"
              label="Onboarding Code"
              value={(staffMember as any)?.onboardingCode || (staffMember as any)?.activationCode?.code || "N/A"}
              className="col-span-2"
            />
          )}
        </div>
      </div>

      {!hasDeviceAssigned && (
        <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--card-line)]">
            <div className="flex items-center gap-2">
              <QrCode className="size-4 text-primary shrink-0" />
              <h3 className="text-sm font-semibold text-foreground">Device Pairing QR</h3>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase font-medium">MDM Enrollment</span>
          </div>

          <div className="flex flex-1 items-center justify-center py-2">
            <QRCodeCard
              src={qrCodeSrc || ""}
              isLoading={isGeneratingQr}
              isError={isQrError}
              statusLabel="Live Enrollment Key"
              description="Scan this QR code with the Flentra MDM Companion app on the device to pair."
              allowEnlarge
              onRefresh={refetchQr}
              className="w-full border-none bg-transparent p-0 shadow-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
