"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useDeviceFinanceDetails, useMarkPlanAsPaid } from "@/entities/device/model/useDeviceFinance";
import { Button } from "@/shared/ui/button";
import CardHeader from "@/shared/ui/card-header";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function RepaymentPlans({ mdmDeviceId }: { mdmDeviceId?: string }) {
  // We use mdmDeviceId to fetch the device finance details. 
  const { data: financeData, isLoading, refetch } = useDeviceFinanceDetails(mdmDeviceId);
  
  const { mutateAsync: markAsPaid, isPending: isPaying } = useMarkPlanAsPaid();
  const [payingId, setPayingId] = useState<string | null>(null);

  // The user requested to log the schema so they can look at it
  console.log("Finance Details Response Schema:", financeData);

  if (isLoading) {
    return (
      <CardWrapper variant="outline">
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
        </div>
      </CardWrapper>
    );
  }

  if (!financeData) {
    return null;
  }

  // Handle nested data structures or array fallback
  const plans = Array.isArray(financeData) 
    ? financeData 
    : financeData.installments || financeData.plans || financeData.data || [];

  if (plans.length === 0) {
    return (
      <CardWrapper variant="outline">
        <CardHeader
          title="Repayment Plans"
          description="Manage the user's repayment plans here"
        />
        <div className="mt-6 border-t pt-6 text-sm text-gray-500">
          No repayment plans found for this device.
          <pre className="mt-4 max-h-64 overflow-auto rounded bg-gray-100 p-4 text-xs text-gray-800">
            {JSON.stringify(financeData, null, 2)}
          </pre>
        </div>
      </CardWrapper>
    );
  }

  const handleMarkAsPaid = async (planId: string) => {
    setPayingId(planId);
    try {
      await markAsPaid(planId);
      toast.success("Plan marked as paid successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to mark plan as paid");
    } finally {
      setPayingId(null);
    }
  };

  const formatAmount = (kobo?: number | string) => {
    const num = Number(kobo);
    if (isNaN(num)) return "₦0";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(num / 100);
  };

  return (
    <CardWrapper variant="outline" className="mb-6">
      <CardHeader
        title="Repayment Plans"
        description="Manage the user's repayment plans here"
      />

      <div className="border-t px-6 py-4 bg-gray-50/50 flex flex-wrap gap-x-8 gap-y-4 text-sm">
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Device Price</span>
          <span className="font-semibold text-gray-900">{formatAmount(financeData.devicePriceInKobo)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Down Payment</span>
          <span className="font-semibold text-gray-900">{formatAmount(financeData.downPaymentInKobo)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Remaining</span>
          <span className="font-semibold text-[#D95D55]">{formatAmount(financeData.remainingPaymentInKobo)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Plan</span>
          <span className="font-semibold text-gray-900 capitalize">{financeData.paymentPlan?.toLowerCase() || 'Monthly'} ({financeData.paymentPlanDuration})</span>
        </div>
      </div>

      <div className="mt-0 flex flex-col gap-0 divide-y border-t px-6">
        {plans.map((plan: any, index: number) => {
          // Standardizing assumed fields, handling multiple possible backend naming conventions
          const id = plan.id;
          const date = plan.dueDate || plan.date || plan.paymentDate;
          const amountKobo = plan.amountInKobo ?? plan.amountKobo ?? plan.amount ?? 0;
          const status = (plan.status || "PENDING").toUpperCase();
          const isPaid = status === "PAID" || plan.isPaid;
          const lockedDate = plan.lockedDate;

          let statusText = "";
          let statusColor = "text-gray-500";
          let isOverdue = false;

          if (date && !isPaid) {
            const due = new Date(date);
            const now = new Date();
            const diffTime = due.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 0) {
              isOverdue = true;
              statusColor = "text-[#D95D55]";
              statusText = `Due ${Math.abs(diffDays)} days ago`;
              if (lockedDate) {
                statusText += ` • Locked ${format(new Date(lockedDate), "MMMM d")}`;
              }
            } else {
              statusText = `Due in ${diffDays} days`;
            }
          }

          return (
            <div key={id || index} className="flex items-center justify-between py-6 first:pt-6 last:pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-base font-medium text-[#1A2C4D]">
                  {date ? format(new Date(date), "MMMM d, yyyy") : "Unknown Date"}
                </span>
                
                <div className={`flex items-center gap-1 text-sm ${statusColor}`}>
                  <span className={statusColor === 'text-[#D95D55]' ? 'text-[#D95D55]' : 'text-gray-400'}>{formatAmount(amountKobo)}</span>
                  {statusText && (
                    <>
                      <span className={statusColor === 'text-[#D95D55]' ? 'text-[#D95D55]' : 'text-gray-400'}>•</span>
                      <span>{statusText}</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                {isPaid ? (
                  <Button
                    variant="outline"
                    disabled
                    className="rounded-full border-gray-200 text-gray-400 disabled:opacity-100 font-normal"
                  >
                    Paid
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-full border-gray-300 font-medium text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMarkAsPaid(id);
                    }}
                    disabled={isPaying}
                  >
                    {payingId === id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Mark as Paid"
                    )}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}
