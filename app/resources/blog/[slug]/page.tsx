import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostV2 from "@/views/BlogPostV2";
import { getBlogPost, getBlogPosts } from "@/features/blog/api/blog.api";
import { getPostExcerpt } from "@/features/blog/lib/content";
import LandingV2PageShell from "@/features/landing-v2/ui/LandingV2PageShell";
import Link from "next/link";
import LandingV2Button from "@/features/landing-v2/ui/LandingV2Button";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPost(slug);

  if (!result.ok) {
    return { title: "Blog", robots: { index: false, follow: false } };
  }

  const { post } = result;
  const description = getPostExcerpt(post, 160);
  const image = post.featured_media?.url;

  return {
    title: `${post.title} — Flentra Blog`,
    description,
    alternates: { canonical: `/resources/blog/${post.slug}` },
    authors: post.author_name ? [{ name: post.author_name }] : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `https://flentra.com/resources/blog/${post.slug}`,
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

export default async function ResourcesBlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const [result, relatedResult] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts({ page: 1, perPage: 4 }),
  ]);

  if (!result.ok) {
    if (result.notFound) notFound();

    return (
      <LandingV2PageShell>
        <section className="px-6 py-24 text-center">
          <div className="mx-auto flex max-w-[500px] flex-col items-center gap-4 rounded-lg border border-line bg-surface p-8">
            <h1 className="text-[24px] font-bold text-white">
              Unable to load article
            </h1>
            <p className="text-[15px] text-text-muted">{result.error}</p>
            <div className="flex gap-3 mt-2">
              <LandingV2Button
                href={`/resources/blog/${encodeURIComponent(slug)}`}
                variant="primary"
                size="md"
              >
                Try again
              </LandingV2Button>
              <LandingV2Button
                href="/resources/blog"
                variant="secondary"
                size="md"
              >
                Back to blog
              </LandingV2Button>
            </div>
          </div>
        </section>
      </LandingV2PageShell>
    );
  }

  const relatedPosts = relatedResult.ok ? relatedResult.posts : [];

  return <BlogPostV2 post={result.post} relatedPosts={relatedPosts} />;
}
