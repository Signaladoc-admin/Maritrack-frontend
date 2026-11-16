import BlogPostV2 from "@/views/BlogPostV2";
import type { BlogPost } from "@/features/blog/types";

export default function BlogPostView({
  post,
  relatedPosts,
}: {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}) {
  return <BlogPostV2 post={post} relatedPosts={relatedPosts} />;
}
