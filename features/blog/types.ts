export interface BlogCategory {
  ulid: string;
  slug: string;
  name: string;
  ref?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogMedia {
  ulid: string;
  url: string;
  original_name?: string;
  mime?: string;
  size_bytes?: number;
  ref?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  ulid: string;
  slug: string;
  title: string;
  excerpt: string | null;
  /** Rich-text HTML authored in the CMS. Always sanitize before rendering. */
  body: string;
  status: string;
  published_at: string | null;
  author_ref?: string | null;
  author_name: string | null;
  category: BlogCategory | null;
  featured_media: BlogMedia | null;
  blogger_url?: string | null;
  ref?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogListMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface BlogListResponse {
  status: string;
  data: BlogPost[];
  meta: BlogListMeta;
  message: string;
}

export interface BlogPostResponse {
  status: string;
  data: BlogPost;
  message: string;
}

export interface GetBlogPostsParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type BlogListResult =
  | { ok: true; posts: BlogPost[]; meta: BlogListMeta }
  | { ok: false; error: string };

export type BlogPostResult =
  | { ok: true; post: BlogPost }
  | { ok: false; notFound: boolean; error: string };
