import Link from "next/link";
import { getBlogPosts } from "../api/blog.api";
import PostCard from "./PostCard";

/** "More articles" under a post. Silently renders nothing if there's nothing to show or the call fails. */
export default async function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const result = await getBlogPosts({ page: 1, perPage: 4 });
  if (!result.ok) return null;

  const related = result.posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section
      className="container mx-auto px-6 py-12 md:p-10"
      aria-labelledby="more-articles-heading"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 id="more-articles-heading" className="text-2xl font-bold text-white md:text-3xl">
          More articles
        </h2>
        <Link href="/blog" className="text-sm font-semibold text-[#05E0E4] hover:underline">
          View all →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((post, i) => (
          <PostCard key={post.ulid} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
