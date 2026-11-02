import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPostExcerpt } from "../lib/content";
import type { BlogPost } from "../types";
import PostCover from "./PostCover";
import PostMeta from "./PostMeta";
import "./blog.css";

interface PostCardProps {
  post: BlogPost;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article
      className="blog-enter blog-card group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm"
      style={{ animationDelay: `${Math.min(index, 8) * 0.06 + 0.1}s` }}
    >
      <div className="blog-card-media relative aspect-[16/10] w-full overflow-hidden bg-[#0e1730]">
        <PostCover post={post} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
        {post.category && (
          <span className="absolute left-4 top-4 rounded-full border border-[#05E0E4]/30 bg-[#0A0E1A]/70 px-3 py-1 text-xs font-medium text-[#05E0E4] backdrop-blur-md">
            {post.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-bold leading-snug text-white line-clamp-2">
          {/* Stretched link: the whole card is clickable */}
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-white/60">{getPostExcerpt(post)}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <PostMeta post={post} className="text-xs" />
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#05E0E4]"
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
