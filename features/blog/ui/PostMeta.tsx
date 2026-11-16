import { Clock } from "lucide-react";
import {
  formatPostDate,
  getAuthorInitial,
  getReadingTimeMinutes,
} from "../lib/content";
import type { BlogPost } from "../types";

interface PostMetaProps {
  post: Pick<BlogPost, "author_name" | "published_at" | "body">;
  className?: string;
}

export default function PostMeta({ post, className = "" }: PostMetaProps) {
  const date = formatPostDate(post.published_at);
  const author = post.author_name || " ";

  return (
    <div className={`flex flex-wrap items-center gap-2 text-sm text-white/55 ${className}`}>
      <span className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#05E0E4] to-[#4A9EFF] text-xs font-bold text-[#0A0E1A]"
          aria-hidden="true"
        >
          {getAuthorInitial(post.author_name)}
        </span>
        <span className="font-medium text-white/80">{author}</span>
      </span>
      {date && (
        <>
          
          <time dateTime={post.published_at ?? undefined}>{date}</time>
        </>
      )}
      
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {getReadingTimeMinutes(post.body)} min read
      </span>
    </div>
  );
}
