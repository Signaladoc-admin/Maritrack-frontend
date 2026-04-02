"use client";

import BillingHistoryTable from "@/features/payments/ui/BillingHistoryTable";
import PlanCard from "@/features/payments/ui/PlanCard";
import { formatCurrency } from "@/shared/lib/utils";
import { Header } from "@/shared/ui/layout/header";

export default function PlansPage() {
  async function handleDownloadInvoide(billingItem: any) {}

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Header title="Your Plans" subtitle="Manage your subscription and billing history" />
      <div className="grid gap-4 sm:grid-cols-2">
        <PlanCard
          price={formatCurrency(10000)}
          name="Basic plan"
          billingCycle="Monthly"
          isCurrent
        />
        <PlanCard
          price={formatCurrency(10000)}
          name="Multi plan"
          billingCycle="Monthly"
          onUpgrade={() => {}}
        />
      </div>
      <div>
        <BillingHistoryTable
          records={[
            {
              id: "1",
              invoiceName: "Invoice 001",
              date: "10 January 2026",
              planName: "Basic plan",
              amount: "20000",
              downloadUrl: "/invoices/001.pdf",
            },
            {
              id: "2",
              invoiceName: "Invoice 001",
              date: "10 January 2026",
              planName: "Basic plan",
              amount: "6800000",
              downloadUrl: "/invoices/001.pdf",
            },
          ]}
          onDownloadItem={handleDownloadInvoide}
        />
      </div>
    </div>
  );
}
