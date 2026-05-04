import { formatCurrency, formatDate } from "@/shared/lib/utils";
import Table from "@/shared/ui/Table/Table";
import { CloudDownload, DownloadCloud } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";

export interface BillingRecord {
  id: string;
  invoiceName: string;
  date: string;
  planName: string;
  amount: string;
  downloadUrl?: string;
}

interface BillingHistoryTableProps {
  records: BillingRecord[];
  onDownloadItem: (item: any) => void;
}

export default function BillingHistoryTable({ records, onDownloadItem }: BillingHistoryTableProps) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-slate-500">Billing history</h3>
      <Table
        variant="minimal"
        hasHeaders={false}
        data={records}
        columns={[
          {
            key: "file",
            render: () => <FaFilePdf className="text-primary" size={30} />,
          },
          {
            key: "invoiceName",
            render: (item) => (
              <span className="font-bold text-neutral-800">{item.invoiceName}</span>
            ),
          },
          {
            key: "date",
            render: (item) => <span>{formatDate(item.date)}</span>,
          },
          {
            key: "planName",
            render: (item) => <span>{item.planName}</span>,
          },
          {
            key: "amount",
            render: (item) => <span>{formatCurrency(Number(item.amount))}</span>,
          },
          {
            key: "downloadUrl",
            render: (item) => (
              <a
                href={item.downloadUrl}
                aria-label={`Download ${item.invoiceName}`}
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
