import { BillingRecord } from "./types";
import { cn, formatCurrency, formatDate, formatPaystackKoboAmount } from "@/shared/lib/utils";
import { FaFilePdf } from "react-icons/fa";
import { DownloadCloud } from "lucide-react";
import { TableColumn } from "@/shared/ui/Table/types";
import { ComponentProps } from "react";

export function getBillingsHistoryColumns(onDownload: () => void) {
    const columns: TableColumn<BillingRecord>[] = [
        {
            key: "file",
            render: (item) => <PdfIcon {...item} className="text-primary" />,
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

function PdfIcon({ props, className }: { props?: ComponentProps<'svg'>, className?: string }) {
    return <svg {...props} className={cn(className)} width="28" height="35" viewBox="0 0 28 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 0H3.5C2.57174 0 1.6815 0.368749 1.02513 1.02513C0.368749 1.6815 0 2.57174 0 3.5V31.5C0 32.4283 0.368749 33.3185 1.02513 33.9749C1.6815 34.6313 2.57174 35 3.5 35H24.5C25.4283 35 26.3185 34.6313 26.9749 33.9749C27.6312 33.3185 28 32.4283 28 31.5V10.5L17.5 0ZM9.6215 24.8325C9.08075 25.34 8.28275 25.5675 7.3535 25.5675C7.17329 25.5709 6.99309 25.5604 6.8145 25.536V28.0315H5.25V21.1435C5.95608 21.0385 6.66947 20.9905 7.38325 21C8.358 21 9.051 21.1855 9.51825 21.5583C9.96275 21.9118 10.2637 22.491 10.2637 23.1735C10.262 23.8595 10.0345 24.4388 9.6215 24.8325ZM16.2837 27.2038C15.5487 27.8145 14.4305 28.105 13.0637 28.105C12.2447 28.105 11.6655 28.0525 11.2717 28V21.1453C11.9781 21.0425 12.6913 20.994 13.405 21C14.7297 21 15.5907 21.238 16.2627 21.7455C16.989 22.2845 17.444 23.1438 17.444 24.3775C17.444 25.7128 16.9557 26.635 16.2837 27.2038ZM22.75 22.3475H20.069V23.9418H22.575V25.2263H20.069V28.0333H18.4835V21.0525H22.75V22.3475ZM17.5 12.25H15.75V3.5L24.5 12.25H17.5Z" fill="currentColor" />
    </svg>

}