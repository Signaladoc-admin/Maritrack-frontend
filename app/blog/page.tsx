import type { Metadata } from "next";
import Blog from "@/views/Blog";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseParams(params: { [key: string]: string | string[] | undefined }) {
  const search = first(params.q)?.trim().slice(0, 255) || undefined;
  const parsedPage = Number.parseInt(first(params.page) ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  return { search, page };
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { search, page } = parseParams(await searchParams);
  // Search results / deep pages shouldn't compete with /blog in search engines.
  const isFilteredView = Boolean(search) || page > 1;

  return {
    title: "Blog — Device Security, MDM & Digital Safety Insights",
    description:
      "News, guides and best practices from Flentra on mobile device management, device security, and keeping families safe online.",
    alternates: { canonical: "/blog" },
    robots: isFilteredView ? { index: false, follow: true } : undefined,
    openGraph: {
      title: "The Flentra Blog — Insights on Device Security & Digital Safety",
      description:
        "News, guides and best practices for managing devices, protecting data and keeping families safe online.",
      url: "https://flentra.com/blog",
      type: "website",
      images: [
        {
          url: "/assets/og-image.png",
          width: 1200,
          height: 630,
          alt: "The Flentra Blog",
        },
      ],
    },
  };
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { search, page } = parseParams(await searchParams);
  return <Blog search={search} page={page} />;
}
