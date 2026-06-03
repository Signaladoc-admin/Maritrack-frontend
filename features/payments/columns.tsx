import { BillingRecord } from "./types";
import { formatCurrency, formatDate, formatPaystackKoboAmount } from "@/shared/lib/utils";
import { FaFilePdf } from "react-icons/fa";
import { DownloadCloud } from "lucide-react";
import { TableColumn } from "@/shared/ui/Table/types";

export function getBillingsHistoryColumns(onDownload: () => void) {
    const columns: TableColumn<BillingRecord>[] = [
        {
            key: "file",
            render: () => <FaFilePdf className="text-primary" size={30} />,
        },
        {
            key: "invoiceName",
            render: (item) => (
                <span className="font-bold text-neutral-800">{item.invoiceNumber || 'N/A'}</span>
            ),
        },
        {
            key: "date",
            render: (item) => <span>{getDefaultValue(formatDate(item.paidAt!))}</span>,
        },
        {
            key: "planName",
            render: (item) => <span>{getDefaultValue(item.plan?.name!)}</span>,
        },
        {
            key: "amount",
            render: (item) => <span>{getDefaultValue(formatCurrency(formatPaystackKoboAmount(item.amountNGN)))}</span>,
        },
        {
            key: "downloadUrl",
            render: (item) => (
                <button
                    onClick={onDownload}
                    aria-label={`Download ${item.invoiceNumber}`}
                    className="text-[#6B7280] transition-colors hover:text-[#1B3C73] cursor-pointer"
                >
                    <DownloadCloud size={25} />
                </button>
            ),
        },
    ]
    return columns
}
function getDefaultValue(renderValue: string, defaultValue = 'N/A') {
    const value = renderValue;
    if (value === null || value === undefined || value === '') return defaultValue;
    return value;
}