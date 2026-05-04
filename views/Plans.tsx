"use client";

import { usePaymentPlans } from "@/features/payments/model/usePayments";
import BillingHistoryTable from "@/features/payments/ui/BillingHistoryTable";
import PlanCard from "@/features/payments/ui/PlanCard";
import { formatCurrency } from "@/shared/lib/utils";
import { Header } from "@/shared/ui/layout/header";
import { Skeleton } from "@/shared/ui/skeleton";

export default function Plans() {
  async function handleDownloadInvoice(billingItem: any) {
    console.log(billingItem);
  }

  const { data: plans, isLoading } = usePaymentPlans();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Header title="Your Plans" subtitle="Manage your subscription and billing history" />
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-[120px]" />
          <Skeleton className="h-[120px]" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <PlanCard
            price={formatCurrency(plans?.at(-2)?.priceNGN || 0)}
            name="Basic plan"
            billingCycle="Monthly"
            isCurrent
          />
          <PlanCard
            price={formatCurrency(plans?.at(-1)?.priceNGN || 0)}
            name="Multi plan"
            billingCycle="Monthly"
            onUpgrade={() => {}}
          />
        </div>
      )}

      <div>
        <BillingHistoryTable
          onDownloadItem={handleDownloadInvoice}
          records={[
            {
              id: "1",
              invoiceName: "Invoice 001",
              date: "2026-01-10",
              planName: "Basic plan",
              amount: "20000",
              downloadUrl: "/invoices/001.pdf",
            },
            {
              id: "2",
              invoiceName: "Invoice 001",
              date: "2026-01-10",
              planName: "Basic plan",
              amount: "6800000",
              downloadUrl: "/invoices/001.pdf",
            },
          ]}
        />
      </div>
    </div>
  );
}
