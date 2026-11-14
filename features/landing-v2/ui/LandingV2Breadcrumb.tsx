import Link from "next/link";

export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface LandingV2BreadcrumbProps {
  items: BreadcrumbSegment[];
}

export default function LandingV2Breadcrumb({
  items,
}: LandingV2BreadcrumbProps) {
  const allItems: BreadcrumbSegment[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <p className="m-0 text-[13.5px] text-text-dim">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-text-dim no-underline transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast ? " / " : ""}
          </span>
        );
      })}
    </p>
  );
}
