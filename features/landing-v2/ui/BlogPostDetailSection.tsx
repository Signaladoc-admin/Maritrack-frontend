"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import {
  formatPostDate,
  getAuthorInitial,
  getReadingTimeMinutes,
  sanitizeBlogHtml,
} from "@/features/blog/lib/content";
import LandingV2Badge from "@/features/landing-v2/ui/LandingV2Badge";
import LandingV2Breadcrumb from "@/features/landing-v2/ui/LandingV2Breadcrumb";

interface BlogPostDetailSectionProps {
  post: BlogPost;
}

export default function BlogPostDetailSection({ post }: BlogPostDetailSectionProps) {
  const html = sanitizeBlogHtml(post.body);
  const cover = post.featured_media?.url;
  const date = formatPostDate(post.published_at);
  const author = post.author_name?.trim() || "Flentra Team";
  const readingTime = getReadingTimeMinutes(post.body);

  return (
    <article className="px-6 pt-14 pb-12 min-[721px]:pt-[72px] min-[721px]:pb-16 font-sans text-white">
      <div className="mx-auto max-w-[840px] flex flex-col gap-6">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col gap-4 fl-v2-enter-badge">
          <LandingV2Breadcrumb
            items={[
              { label: "Resources", href: "/resources/blog" },
              { label: "Blog", href: "/resources/blog" },
              { label: post.category?.name || "Article" },
            ]}
          />

          <Link
            href="/resources/blog"
            className="inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold text-cyan no-underline transition-colors hover:text-cyan-light"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all posts
          </Link>
        </div>

        {/* Header: Category, Title, Meta */}
        <header className="flex flex-col gap-4 mt-2">
          {post.category && (
            <div className="w-fit fl-v2-enter-badge">
              <LandingV2Badge tone="cyan" size="md">
                {post.category.name}
              </LandingV2Badge>
            </div>
          )}

          <h1 className="m-0 text-[32px] min-[721px]:text-[48px] leading-[1.1] font-extrabold tracking-[-0.03em] text-white fl-v2-enter-title">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[14px] text-text-muted pt-2 border-b border-line pb-6 fl-v2-enter-desc">
            <span className="flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-blue-500 text-xs font-bold text-navy"
                aria-hidden="true"
              >
                {getAuthorInitial(author)}
              </span>
              <span className="font-semibold text-white">{author}</span>
            </span>

            {date && (
              <>
                <span className="text-text-dim" aria-hidden="true">
                  •
                </span>
                <time dateTime={post.published_at ?? undefined}>{date}</time>
              </>
            )}

            <span className="text-text-dim" aria-hidden="true">
              •
            </span>
            <span className="inline-flex items-center gap-1.5 text-text-soft">
              <Clock className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
              {readingTime} min read
            </span>
          </div>
        </header>

        {/* Featured Cover Image */}
        {cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-deep fl-v2-enter-aside">
            <Image
              src={cover}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 840px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="fl-v2-blog-prose pt-4 fl-v2-enter-desc"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
