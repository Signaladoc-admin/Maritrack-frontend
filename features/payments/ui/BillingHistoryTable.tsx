import Table from "@/shared/ui/Table/Table";
import { usePaymentHistory } from "../model/usePayments";
import { Skeleton } from "@/shared/ui/skeleton";
import { useAuth } from "@/shared/auth/AuthProvider";
import { getBillingsHistoryColumns } from "../columns";

export default function BillingHistoryTable() {
  const { user } = useAuth();
  const zoneId = user?.zoneId || "";
  // const [page, setPage] = useState(1);
  const { data: paymentHistory, isLoading } = usePaymentHistory(zoneId,
    // { page }
  );

  const transactions = paymentHistory?.data?.results || [];
  // const totalPages = paymentHistory?.totalPages || 1;

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
      <h3 className="mb-4 font-semibold text-slate-500">Billing history</h3>
      <Table
        variant="minimal"
        hasHeaders={false}
        emptyMessage="You have no billing history yet."
        data={transactions}
        columns={getBillingsHistoryColumns(() => { })}
      // totalPages={totalPages}
      // onPageChange={setPage}
      />
    </div>
  );
}
