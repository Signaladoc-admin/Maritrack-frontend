import { redirect } from "next/navigation";
import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import { getBlogPosts } from "@/features/blog/api/blog.api";
import BlogHero from "@/features/blog/ui/BlogHero";
import FeaturedPost from "@/features/blog/ui/FeaturedPost";
import PostCard from "@/features/blog/ui/PostCard";
import BlogPagination from "@/features/blog/ui/BlogPagination";
import BlogCta from "@/features/blog/ui/BlogCta";
import { BlogEmptyState, BlogErrorState } from "@/features/blog/ui/BlogStates";

interface BlogProps {
  search?: string;
  page: number;
}

function listHref(search: string | undefined, page: number) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

export default async function Blog({ search, page }: BlogProps) {
  const result = await getBlogPosts({ page, search });

  // Requested a page past the end (e.g. stale bookmark) → send them to the last real page.
  if (result.ok && result.posts.length === 0 && page > 1 && result.meta.total > 0) {
    redirect(listHref(search, result.meta.last_page));
  }

  const showFeatured = result.ok && page === 1 && !search && result.posts.length > 0;
  const featured = showFeatured && result.ok ? result.posts[0] : null;
  const gridPosts = result.ok ? (featured ? result.posts.slice(1) : result.posts) : [];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      <LandingHeader />
      <BlogHero search={search} />

      <section className="container mx-auto px-6 py-12 md:px-10 " aria-label="Articles">
        {!result.ok ? (
          <BlogErrorState message={result.error} retryHref={listHref(search, page)} />
        ) : result.posts.length === 0 ? (
          <BlogEmptyState search={search} />
        ) : (
          <div className="flex flex-col gap-10">
            {search && (
              <p className="text-sm text-white/55" role="status">
                {result.meta.total} {result.meta.total === 1 ? "result" : "results"} for{" "}
                <span className="font-semibold text-white">“{search}”</span>
              </p>
            )}

            {featured && <FeaturedPost post={featured} />}

            {gridPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post, i) => (
                  <PostCard key={post.ulid} post={post} index={i} />
                ))}
              </div>
            )}

            <BlogPagination
              currentPage={result.meta.current_page}
              lastPage={result.meta.last_page}
              search={search}
            />
          </div>
        )}
      </section>

      <BlogCta />
      <LandingFooter />
    </div>
  );
}
