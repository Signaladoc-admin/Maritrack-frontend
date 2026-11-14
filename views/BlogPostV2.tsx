import type { BlogPost } from "@/features/blog/types";
import BlogPostDetailSection from "@/features/landing-v2/ui/BlogPostDetailSection";
import BlogRelatedSection from "@/features/landing-v2/ui/BlogRelatedSection";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";
import SeeFlentraCtaBand from "@/features/landing-v2/ui/SeeFlentraCtaBand";

interface BlogPostV2Props {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export default function BlogPostV2({ post, relatedPosts }: BlogPostV2Props) {
  return (
    <LandingV2PageShell>
      <BlogPostDetailSection post={post} />
      <BlogRelatedSection currentSlug={post.slug} posts={relatedPosts} />
      <SeeFlentraCtaBand />
    </LandingV2PageShell>
  );
}
