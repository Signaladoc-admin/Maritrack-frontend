import { CardWrapper } from "@/shared/ui/card-wrapper";
import Badge from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";
import { ReactNode } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DashboardTableCardProps<T> {
  title?: string;
  timingLabel?: string;
  columns: Column<T>[];
  data: T[];
}

export default function DashboardTableCard<T>({
  title,
  timingLabel,
  columns,
  data,
}: DashboardTableCardProps<T>) {
  return (
    <CardWrapper variant="outline" className="p-5 lg:p-6 flex flex-col h-full w-full overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        {title && <h3 className="font-semibold text-neutral-800 text-sm">{title}</h3>}
        {timingLabel && (
          <Badge
            variant="secondary"
            content={
              <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
                <Calendar size={13} />
                <span className="text-[11px]">{timingLabel}</span>
              </div>
            }
          />
        )}
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100">
              {columns.map((col, idx) => (
                <th
                  key={String(col.key)}
                  className={`pb-3 text-[12px] font-semibold text-neutral-400 whitespace-nowrap ${
                    col.className || ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td
                    key={String(col.key)}
                    className={`py-4 text-[12px] font-bold text-neutral-800 ${col.className || ""}`}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-sm text-neutral-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
}
