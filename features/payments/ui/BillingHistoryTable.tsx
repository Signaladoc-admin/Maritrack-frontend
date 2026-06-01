import { formatCurrency, formatDate, formatPaystackKoboAmount } from "@/shared/lib/utils";
import Table from "@/shared/ui/Table/Table";
import { CloudDownload, DownloadCloud } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { usePaymentHistory } from "../model/usePayments";
import { useBusinessZones } from "@/features/mdm-sync/model/useMdmSync";
import { Skeleton } from "@/shared/ui/skeleton";

export interface BillingRecord {
  id: string;
  invoiceName: string;
  date: string;
  planName: string;
  amount: string;
  downloadUrl?: string;
}

export default function BillingHistoryTable() {
  const { data: zones } = useBusinessZones();
  const zoneId = zones?.[0]?.id;

  const { data: paymentHistory, isLoading } = usePaymentHistory(zoneId);

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

  const transactions = paymentHistory?.results || [];

  return (
    <div>
      <h3 className="mb-4 font-semibold text-slate-500">Billing history</h3>
      <Table
        variant="minimal"
        hasHeaders={false}
        emptyMessage="You have no billing history yet."
        data={transactions}
        columns={[
          {
            key: "file",
            render: () => <FaFilePdf className="text-primary" size={30} />,
          },
          {
            key: "invoiceName",
            render: (item) => (
              <span className="font-bold text-neutral-800">{item.invoiceNumber}</span>
            ),
          },
          {
            key: "date",
            render: (item) => <span>{formatDate(item.paidAt)}</span>,
          },
          {
            key: "planName",
            render: (item) => <span>{item.plan.name}</span>,
          },
          {
            key: "amount",
            render: (item) => <span>{formatCurrency(formatPaystackKoboAmount(item.amountNGN))}</span>,
          },
          {
            key: "downloadUrl",
            render: (item) => (
              <a
                href={item.invoiceUrl!}
                aria-label={`Download ${item.invoiceNumber}`}
                className="text-[#6B7280] transition-colors hover:text-[#1B3C73]"
              >
                <DownloadCloud size={25} />
              </a>
            ),
          },
        ]}
      />
    </div>
  );
}
