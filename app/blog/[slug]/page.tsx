import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/views/BlogPost";
import { getBlogPost } from "@/features/blog/api/blog.api";
import { BlogErrorState } from "@/features/blog/ui/BlogStates";
import LandingHeader from "@/features/landing/ui/LandingHeader";
import LandingFooter from "@/features/landing/ui/LandingFooter";
import { getPostExcerpt } from "@/features/blog/lib/content";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPost(slug);

  if (!result.ok) {
    // Don't index error/missing states.
    return { title: "Blog", robots: { index: false, follow: false } };
  }

  const { post } = result;
  const description = getPostExcerpt(post, 160);
  const image = post.featured_media?.url;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `https://flentra.com/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at ?? undefined,
      authors: post.author_name ? [post.author_name] : undefined,
      images: image
        ? [{ url: image, alt: post.title }]
        : [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image ?? "/assets/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const result = await getBlogPost(slug);

  if (!result.ok) {
    if (result.notFound) notFound();

    // Transient failure (network / 5xx): show a retryable state rather than a hard 404.
    return (
      <div className="min-h-screen overflow-hidden bg-[#0A0E1A] text-white">
        <LandingHeader />
        <div className="container mx-auto px-6 py-24 md:px-10">
          <BlogErrorState message={result.error} retryHref={`/blog/${encodeURIComponent(slug)}`} />
        </div>
        <LandingFooter />
      </div>
    );
  }

  return <BlogPostView post={result.post} />;
}
