import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import BlogArticle from "@/features/blog/ui/BlogArticle";
import RelatedPosts from "@/features/blog/ui/RelatedPosts";
import BlogCta from "@/features/blog/ui/BlogCta";
import type { BlogPost } from "@/features/blog/types";

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
      <LandingHeader />
      <BlogArticle post={post} />
      <RelatedPosts currentSlug={post.slug} />
      <BlogCta />
      <LandingFooter />
    </div>
  );
}
