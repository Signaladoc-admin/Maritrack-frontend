import Image from "next/image";
import type { BlogPost } from "../types";

interface PostCoverProps {
  post: Pick<BlogPost, "title" | "featured_media">;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/** Fills its (relatively-positioned) parent. Falls back to a branded gradient when there's no image. */
export default function PostCover({ post, sizes, priority = false, className = "" }: PostCoverProps) {
  const url = post.featured_media?.url;

  if (!url) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#17366A] via-[#0e2146] to-[#05E0E4]/30 ${className}`}
        aria-hidden="true"
      >
        <Image
          src="/assets/FlentraLogo.svg"
          alt="Flentra Logo"
          width={118}
          height={60}
          className="h-16 md:h-20 w-auto !filter-none"
          style={{ filter: "none" }}
        />
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={post.title}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
