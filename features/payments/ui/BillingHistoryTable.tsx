import Table from "@/shared/ui/Table/Table";
import { usePaymentHistory, useExportSubscriptions } from "../model/usePayments";
import { Skeleton } from "@/shared/ui/skeleton";
import { useAuth } from "@/shared/auth/AuthProvider";
import { getBillingsHistoryColumns } from "../columns";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/button";
import { DownloadCloud, Loader2 } from "lucide-react";

export default function BillingHistoryTable() {
  const { user } = useAuth();
  const zoneId = user?.zoneId || "";
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: paymentHistory, isLoading } = usePaymentHistory(zoneId, { page, limit });
  const { exportSubscriptions, isExporting } = useExportSubscriptions();

  const transactions = paymentHistory?.data?.results || [];
  const totalCount = paymentHistory?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-10">
        <h3 className="font-semibold text-slate-500">Billing history</h3>
        <div className="space-y-4 bg-white md:max-w-xl">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-14 *:min-w-[100px]">
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
              <Skeleton className="h-[30px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-500">Billing history</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={exportSubscriptions}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <DownloadCloud className="mr-2 h-4 w-4" />
          )}
          Download
        </Button>
      </div>
      <Table
        variant="minimal"
        hasHeaders={false}
        emptyMessage="You have no billing history yet."
        data={transactions}
        columns={getBillingsHistoryColumns()}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        isPaginated
      />
    </div>
  );
}
