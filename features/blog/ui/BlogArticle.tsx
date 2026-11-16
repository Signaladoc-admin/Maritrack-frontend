import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sanitizeBlogHtml } from "../lib/content";
import type { BlogPost } from "../types";
import PostMeta from "./PostMeta";
import "@/features/landing/ui/landing.css";
import "./blog.css";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const html = sanitizeBlogHtml(post.body);
  const cover = post.featured_media?.url;

  return (
    <article className="container mx-auto px-6 pb-8 pt-12 md:px-10 md:pt-16">
      <div className="mx-auto max-w-4xl">
        <nav
          aria-label="Breadcrumb"
          className="blog-enter flex items-center gap-2 text-sm text-white/45"
        >
          <Link href="/blog" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#05E0E4]">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all posts
          </Link>
          {post.category && (
            <>
              <span aria-hidden="true">/</span>
              <span className="text-white/60">{post.category.name}</span>
            </>
          )}
        </nav>

        <header className="mt-8 flex flex-col gap-6">
          {post.category && (
            <span
              className="blog-enter w-fit rounded-full border border-[#05E0E4]/30 bg-[#05E0E4]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#05E0E4]"
              style={{ animationDelay: "0.05s" }}
            >
              {post.category.name}
            </span>
          )}
          <h1
            className="blog-enter text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl"
            style={{ animationDelay: "0.1s" }}
          >
            {post.title}
          </h1>
          <div className="blog-enter" style={{ animationDelay: "0.18s" }}>
            <PostMeta post={post} />
          </div>
        </header>
      </div>

      {cover && (
        <div
          className="blog-enter relative mx-auto mt-8 aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#0e1730]"
          style={{ animationDelay: "0.25s" }}
        >
          <Image
            src={cover}
            alt={post.title}
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mx-auto mt-8 max-w-4xl">
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
