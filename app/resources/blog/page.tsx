import type { Metadata } from "next";
import ResourcesBlogV2 from "@/views/ResourcesBlogV2";
import { getBlogPosts } from "@/features/blog/api/blog.api";

export const metadata: Metadata = {
  title: "Blog — Flentra",
  description:
    "Guides, news and practical advice on device portfolios, device financing and company devices.",
  alternates: { canonical: "/resources/blog" },
};

export default async function ResourcesBlogPage() {
  const result = await getBlogPosts({ page: 1, perPage: 24 });
  const posts = result.ok ? result.posts : [];

  return <ResourcesBlogV2 posts={posts} />;
}
