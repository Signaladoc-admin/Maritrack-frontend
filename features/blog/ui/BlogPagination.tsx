import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  lastPage: number;
  search?: string;
}

function buildHref(page: number, search?: string) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

/** 1 … 4 5 [6] 7 8 … 20 */
function getPageItems(current: number, last: number): (number | "ellipsis-start" | "ellipsis-end")[] {
  if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

  const items: (number | "ellipsis-start" | "ellipsis-end")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(last - 1, current + 1);

  if (start > 2) items.push("ellipsis-start");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < last - 1) items.push("ellipsis-end");
  items.push(last);
  return items;
}

const baseBtn =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-all duration-200";

export default function BlogPagination({ currentPage, lastPage, search }: BlogPaginationProps) {
  if (lastPage <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < lastPage;

  return (
    <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {hasPrev ? (
        <Link
          href={buildHref(currentPage - 1, search)}
          rel="prev"
          className={`${baseBtn} gap-1 border-white/12 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span className={`${baseBtn} gap-1 cursor-not-allowed border-white/6 text-white/25`} aria-disabled="true">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </span>
      )}

      {getPageItems(currentPage, lastPage).map((item) =>
        typeof item === "string" ? (
          <span key={item} className="px-1 text-white/35" aria-hidden="true">
            …
          </span>
        ) : item === currentPage ? (
          <span
            key={item}
            aria-current="page"
            className={`${baseBtn} border-[#05E0E4] bg-[#05E0E4] text-[#0A0E1A]`}
          >
            {item}
          </span>
        ) : (
          <Link
            key={item}
            href={buildHref(item, search)}
            aria-label={`Page ${item}`}
            className={`${baseBtn} border-white/12 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10`}
          >
            {item}
          </Link>
        )
      )}

      {hasNext ? (
        <Link
          href={buildHref(currentPage + 1, search)}
          rel="next"
          className={`${baseBtn} gap-1 border-white/12 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10`}
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className={`${baseBtn} gap-1 cursor-not-allowed border-white/6 text-white/25`} aria-disabled="true">
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
