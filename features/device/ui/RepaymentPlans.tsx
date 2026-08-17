"use client";

import { useGetDeviceFinanceByDeviceId } from "@/entities/device/model/useDeviceFinance";
import { CardWrapper } from "@/shared/ui/card-wrapper";
import CardHeader from "@/shared/ui/card-header";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { format, differenceInDays, isPast } from "date-fns";

interface RepaymentPlansProps {
  deviceId: string;
}

export function RepaymentPlans({ deviceId }: RepaymentPlansProps) {
  const { data: response, isLoading } = useGetDeviceFinanceByDeviceId(deviceId);

  const data = response?.data || response;
  // Fallback to empty array if no plans, we will just map over what's there
  const plans = data?.paymentPlans || data?.plans || [];

  return (
    <CardWrapper variant="outline" className="w-full">
      <CardHeader 
        title="Repayment Plans" 
        description="Manage the user's repayment plans here" 
      />
      <div className="mt-6 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        ) : plans.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {plans.map((plan: any, index: number) => {
              const dueDate = new Date(plan.dueDate || plan.date || new Date());
              const amountFormatted = `₦${((plan.amount || plan.amountInKobo || 0) / 100).toLocaleString()}`;
              const isPaid = plan.status === "PAID" || plan.paid;
              const diffDays = Math.abs(differenceInDays(new Date(), dueDate));
              const past = isPast(dueDate);
              
              let statusText = "";
              let isRed = false;
              let isButtonDisabled = isPaid;

              if (!isPaid) {
                if (past) {
                  statusText = ` • Due ${diffDays} days ago${plan.lockedDate ? ` • Locked ${format(new Date(plan.lockedDate), "MMM d")}` : ""}`;
                  isRed = true;
                  isButtonDisabled = false;
                } else {
                  statusText = ` • Due in ${diffDays} days`;
                  isButtonDisabled = true; // Based on image, future payments might not be markable yet, or maybe they are, we leave it disabled for now if it's future
                }
              }

              return (
                <div key={index} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-base text-gray-900">
                      {plan.dueDate || plan.date ? format(dueDate, "MMMM d, yyyy") : "N/A"}
                    </p>
                    <div className={`text-sm ${isRed ? "text-red-500" : "text-gray-500"}`}>
                      {amountFormatted}
                      {statusText}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      disabled={isButtonDisabled}
                      className="rounded-full"
                    >
                      {isPaid ? "Paid" : "Mark as Paid"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
           <p className="text-sm text-gray-500 py-4">No repayment plans found.</p>
        )}
      </div>
    </CardWrapper>
  );
}
