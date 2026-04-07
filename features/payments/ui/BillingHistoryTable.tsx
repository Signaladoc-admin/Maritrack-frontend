import { formatCurrency } from "@/shared/lib/utils";
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

export default function BillingHistoryTable({ records }: BillingHistoryTableProps) {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-slate-500">Billing history</h3>
      <div className="divide-y divide-[#e5e7eb] border-t border-b border-y-[#e5e7eb]">
        {records.map((record) => (
          <div key={record.id} className="flex items-center gap-4 py-4 font-medium text-slate-500">
            {/* PDF icon */}
            <FaFilePdf className="text-primary" size={30} />

            {/* Invoice name */}
            <span className="w-40 shrink-0 text-sm font-bold text-neutral-700">
              {record.invoiceName}
            </span>

            {/* Date */}
            <span className="flex-1 text-sm text-[#6B7280]">{record.date}</span>

            {/* Plan */}
            <span className="flex-1 text-sm text-[#6B7280]">{record.planName}</span>

            {/* Amount */}
            <span className="flex-1 text-sm text-[#6B7280]">
              {formatCurrency(Number(record.amount))}
            </span>

            {/* Download */}
            <a
              href={record.downloadUrl ?? "#"}
              aria-label={`Download ${record.invoiceName}`}
              className="text-[#6B7280] transition-colors hover:text-[#1B3C73]"
            >
              <DownloadCloud size={25} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
