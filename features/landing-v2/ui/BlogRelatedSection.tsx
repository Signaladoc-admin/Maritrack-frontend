import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import { formatPostDate } from "@/features/blog/lib/content";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";

interface BlogRelatedSectionProps {
  posts?: BlogPost[];
  currentSlug: string;
}

export default function BlogRelatedSection({
  posts = [],
  currentSlug,
}: BlogRelatedSectionProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="px-6 py-[72px] min-[721px]:py-[88px] font-sans text-white">
      <div className="mx-auto flex max-w-site flex-col gap-8">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
          <h2 className="m-0 text-[26px] min-[721px]:text-[32px] font-extrabold tracking-[-0.02em] text-white">
            More articles
          </h2>
          <Link
            href="/resources/blog"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
          >
            View all
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {related.map((post) => {
            const cover = post.featured_media?.url;
            const date = formatPostDate(post.published_at);
            const author = post.author_name?.trim() || "Flentra Team";

            return (
              <Link
                key={post.ulid || post.slug}
                href={`/resources/blog/${post.slug}`}
                className="fl-v2-card-interactive group flex w-full max-w-[420px] sm:max-w-none flex-col overflow-hidden rounded-lg border border-line bg-surface text-white no-underline"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep p-4 flex items-end">
                  {cover ? (
                    <Image
                      src={cover}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 388px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  {post.category && (
                    <div className="relative z-10">
                      <LandingV2Badge tone="cyan" size="sm">
                        {post.category.name}
                      </LandingV2Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-[22px]">
                  <span className="text-[18px] leading-[1.35] font-bold text-white transition-colors group-hover:text-green-light line-clamp-2">
                    {post.title}
                  </span>
                  <span className="mt-auto pt-2 text-[13px] text-text-dim">
                    {date ? `${date} · ` : ""}
                    {author}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
