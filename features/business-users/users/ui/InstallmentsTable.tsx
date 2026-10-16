import { useGetStaffMember } from "@/entities/business/model/useStaffMembers";
import { Skeleton } from "@/shared/ui/skeleton";
import { DeviceFinanceInstallment } from "@/entities/business/types";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function InstallmentsTable({ staffId }: { staffId: string }) {
  const { data: staffMember, isLoading } = useGetStaffMember(staffId);

  const financing = (staffMember as any)?.onDeviceFinancing || (staffMember as any)?.deviceFinancing;
  const installments: DeviceFinanceInstallment[] = financing?.installments || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!financing || installments.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)] p-8 text-center text-muted-foreground">
        <Clock className="mx-auto size-8 mb-2 opacity-50" />
        <p className="font-medium text-foreground">No installment plan found</p>
        <p className="text-xs mt-1">This user does not have an active repayment plan schedule.</p>
      </div>
    );
  }

  const totalAmountKobo = Number(financing.totalPaymentInKobo || 0);
  const remainingKobo = Number(financing.remainingPaymentInKobo || 0);
  const totalPaidKobo = Math.max(0, totalAmountKobo - remainingKobo);
  const monthlyPaymentKobo = Number(financing.monthlyPaymentInKobo || 0);

  const formatKobo = (kobo: number | string) => {
    return (Number(kobo) / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const paidCount = installments.filter((i) => i.status === "PAID").length;

  return (
    <div className="space-y-6">
      {/* Financing Overview Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Total Financed</p>
          <p className="text-lg font-bold text-foreground">₦{formatKobo(totalAmountKobo)}</p>
          <p className="text-[11px] text-muted-foreground">{financing.paymentPlanDuration} monthly installments</p>
        </div>
        <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Amount Paid</p>
          <p className="text-lg font-bold text-emerald-400">₦{formatKobo(totalPaidKobo)}</p>
          <p className="text-[11px] text-muted-foreground">{paidCount} of {installments.length} completed</p>
        </div>
        <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Remaining Balance</p>
          <p className="text-lg font-bold text-foreground">₦{formatKobo(remainingKobo)}</p>
          <p className="text-[11px] text-muted-foreground">{installments.length - paidCount} installments pending</p>
        </div>
        <div className="rounded-xl border border-[var(--card-line)] bg-[var(--card-fill)] p-4 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Monthly Payment</p>
          <p className="text-lg font-bold text-primary">₦{formatKobo(monthlyPaymentKobo)}</p>
          <p className="text-[11px] text-muted-foreground">Grace period: {financing.gracePeriodInDays || 0} days</p>
        </div>
      </div>

      {/* Installments Table */}
      <div className="overflow-hidden rounded-2xl border border-[var(--card-line)] bg-[var(--card-fill)]">
        <div className="border-b border-[var(--card-line)] px-5 py-4">
          <h3 className="font-semibold text-foreground text-sm">Repayment Schedule</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tracking {installments.length} monthly installments for {financing.deviceBrand} {financing.deviceModel}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-[var(--card-line)]">
              <tr>
                <th className="px-5 py-3 font-semibold">#</th>
                <th className="px-5 py-3 font-semibold">Due Date</th>
                <th className="px-5 py-3 font-semibold">Amount Due</th>
                <th className="px-5 py-3 font-semibold">Amount Paid</th>
                <th className="px-5 py-3 font-semibold">Late Fee</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Paid Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--card-line)]">
              {installments.map((inst) => {
                const isPaid = inst.status === "PAID";
                const isOverdue = inst.status === "OVERDUE";
                const isPending = !isPaid && !isOverdue;

                let dueDateFormatted = inst.dueDate;
                try {
                  dueDateFormatted = format(new Date(inst.dueDate), "MMM dd, yyyy");
                } catch (e) {}

                let paidDateFormatted = "—";
                if (inst.paidAt) {
                  try {
                    paidDateFormatted = format(new Date(inst.paidAt), "MMM dd, yyyy");
                  } catch (e) {}
                }

                return (
                  <tr key={inst.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      Installment {inst.installmentNumber}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-muted-foreground/60 shrink-0" />
                        <span>{dueDateFormatted}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-foreground">
                      ₦{formatKobo(inst.amountInKobo)}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      ₦{formatKobo(inst.amountPaidInKobo || 0)}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      ₦{formatKobo(inst.lateFeeInKobo || 0)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold",
                          isPaid && "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
                          isPending && "bg-amber-500/15 text-amber-400 border border-amber-500/30",
                          isOverdue && "bg-red-500/15 text-red-400 border border-red-500/30"
                        )}
                      >
                        {isPaid && <CheckCircle2 className="size-3 shrink-0" />}
                        {isPending && <Clock className="size-3 shrink-0" />}
                        {isOverdue && <AlertCircle className="size-3 shrink-0" />}
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-muted-foreground">
                      {paidDateFormatted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
