import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPostExcerpt } from "../lib/content";
import type { BlogPost } from "../types";
import PostCover from "./PostCover";
import PostMeta from "./PostMeta";
import "./blog.css";

export default function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <article
      className="blog-enter blog-card group relative grid overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm lg:grid-cols-2"
      style={{ animationDelay: "0.1s" }}
    >
      <div className="blog-card-media relative aspect-[16/10] w-full overflow-hidden bg-[#0e1730] lg:aspect-auto lg:min-h-[360px]">
        <PostCover
          post={post}
          sizes="(min-width: 1024px) 600px, 100vw"
          priority
        />
      </div>

      <div className="flex flex-col justify-center gap-5 p-5 md:p-6">
        <div className="flex items-center gap-3">
          {post.category && (
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">
              {post.category.name}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl line-clamp-3">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-4 text-base leading-relaxed text-white/60">
          {getPostExcerpt(post, 220)}
        </p>

        <PostMeta post={post} />

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#05E0E4]">
          Read article
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
