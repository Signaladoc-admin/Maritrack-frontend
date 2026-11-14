"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  blogCategories as fallbackCategories,
  blogPostCards as fallbackPostCards,
} from "@/features/landing-v2/data";
import type { BlogPost } from "@/features/blog/types";
import { formatPostDate } from "@/features/blog/lib/content";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Breadcrumb from "@/features/landing-v2/ui/LandingV2Breadcrumb";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

interface ResourcesBlogSectionProps {
  initialPosts?: BlogPost[];
}

export default function ResourcesBlogSection({
  initialPosts,
}: ResourcesBlogSectionProps) {
  const hasApiPosts = Boolean(initialPosts && initialPosts.length > 0);

  // Derive categories dynamically if API posts exist, otherwise use fallback categories
  const categories: string[] = hasApiPosts
    ? [
        "All",
        ...Array.from(
          new Set(
            (initialPosts || [])
              .map((p) => p.category?.name?.trim())
              .filter((name): name is string => Boolean(name)),
          ),
        ),
      ]
    : [...fallbackCategories];

  const [activeCategory, setActiveCategory] = useState<string>("All");

  return (
    <>
      {/* Header & Filter Section */}
      <section className="px-6 pt-14 pb-12 min-[721px]:pt-[72px] min-[721px]:pb-14">
        <div className="mx-auto flex max-w-site flex-col gap-[18px]">
          <div className="fl-v2-enter-badge">
            <LandingV2Breadcrumb
              items={[{ label: "Resources" }, { label: "Blog" }]}
            />
          </div>

          <h1 className="m-0 text-[38px] leading-[1.06] font-extrabold tracking-[-0.03em] text-white min-[721px]:text-[52px] fl-v2-enter-title">
            Blog
          </h1>

          <p className="m-0 max-w-[720px] text-[19px] leading-[1.6] text-text-muted fl-v2-enter-desc">
            Guides, news and practical advice on managing device portfolios,
            device financing and company devices.
          </p>

          <div
            role="tablist"
            aria-label="Blog categories"
            className="flex flex-wrap gap-1.5 self-start rounded-24 border border-line bg-surface p-1 text-[13px] font-semibold fl-v2-enter-actions"
          >
            {categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer rounded-badge border-none px-3.5 py-2 text-[13px] font-semibold transition-colors ${
                    isSelected
                      ? "bg-green-tint text-white"
                      : "bg-transparent text-text-muted hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid Section */}
      <section className="px-6 pt-0 pb-[72px] min-[721px]:pb-[88px]">
        <div className="mx-auto grid max-w-site grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {hasApiPosts
            ? (initialPosts || [])
                .filter(
                  (post) =>
                    activeCategory === "All" ||
                    post.category?.name === activeCategory,
                )
                .map((post, idx) => {
                  const cover = post.featured_media?.url;
                  const date = formatPostDate(post.published_at);
                  const author = post.author_name?.trim() || "Flentra Team";

                  return (
                    <Link
                      key={post.ulid || post.slug}
                      href={`/resources/blog/${post.slug}`}
                      style={{
                        animation:
                          "fl-v2-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                        animationDelay: `${0.1 + (idx % 6) * 0.06}s`,
                      }}
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
                        <span className="text-[19px] leading-[1.3] font-bold text-white transition-colors group-hover:text-green-light line-clamp-2">
                          {post.title}
                        </span>
                        <span className="mt-auto pt-2 text-[13.5px] text-text-dim">
                          {date ? `${date} · ` : ""}
                          {author}
                        </span>
                      </div>
                    </Link>
                  );
                })
            : fallbackPostCards
                .filter(
                  (post) =>
                    activeCategory === "All" ||
                    post.category === activeCategory,
                )
                .map((post, idx) => (
                  <a
                    key={post.title}
                    href={post.href}
                    style={{
                      animation:
                        "fl-v2-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
                      animationDelay: `${0.1 + (idx % 6) * 0.06}s`,
                    }}
                    className="fl-v2-card-interactive group flex w-full max-w-[420px] sm:max-w-none flex-col overflow-hidden rounded-lg border border-line bg-surface text-white no-underline"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep p-4 flex items-end">
                      <LandingV2Badge
                        tone={post.badgeTone}
                        size="sm"
                        className={
                          post.badgeTone === "neutral" ? "text-text-soft" : ""
                        }
                      >
                        {post.category}
                      </LandingV2Badge>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-[22px]">
                      <span className="text-[19px] leading-[1.3] font-bold text-white transition-colors group-hover:text-green-light line-clamp-2">
                        {post.title}
                      </span>
                      <span className="mt-auto pt-2 text-[13.5px] text-text-dim">
                        {post.meta}
                      </span>
                    </div>
                  </a>
                ))}
        </div>
      </section>

      <SeeFlentraCtaBand />
    </>
  );
}
