import "server-only";

import type {
  BlogListMeta,
  BlogListResponse,
  BlogListResult,
  BlogPostResponse,
  BlogPostResult,
  GetBlogPostsParams,
} from "../types";

const GATEWAY_URL = (process.env.NEXT_PUBLIC_BLOG_API_URL || "").replace(/\/+$/, "");

export const BLOG_PARTNER_CODE = "flentra";
export const BLOG_PAGE_SIZE = 10;

const POSTS_URL = `${GATEWAY_URL}/content/v1/partners/${BLOG_PARTNER_CODE}/posts`;
const REVALIDATE_SECONDS = 300;
const REQUEST_TIMEOUT_MS = 10_000;

const EMPTY_META: BlogListMeta = {
  current_page: 1,
  per_page: BLOG_PAGE_SIZE,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

async function request<T>(url: string): Promise<{ status: number; body: T | null }> {
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const body = (await res.json().catch(() => null)) as T | null;
  return { status: res.status, body };
}

/** Lists published posts. */
export async function getBlogPosts({
  page = 1,
  perPage = BLOG_PAGE_SIZE,
  search,
}: GetBlogPostsParams = {}): Promise<BlogListResult> {
  const query = new URLSearchParams({
    page: String(Math.max(1, page)),
    per_page: String(Math.min(100, Math.max(1, perPage))),
  });
  const trimmedSearch = search?.trim().slice(0, 255);
  if (trimmedSearch) query.set("search", trimmedSearch);

  try {
    const { status, body } = await request<BlogListResponse>(`${POSTS_URL}?${query.toString()}`);

    if (status < 200 || status >= 300 || !body || !Array.isArray(body.data)) {
      return { ok: false, error: `Failed to load posts (${status}).` };
    }

    return { ok: true, posts: body.data, meta: { ...EMPTY_META, ...body.meta } };
  } catch {
    return { ok: false, error: "We couldn't reach the blog right now. Please try again." };
  }
}

/** Fetches a single published post by slug. */
export async function getBlogPost(slug: string): Promise<BlogPostResult> {
  try {
    const { status, body } = await request<BlogPostResponse>(
      `${POSTS_URL}/${encodeURIComponent(slug)}`
    );

    if (status === 404) {
      return { ok: false, notFound: true, error: "Post not found." };
    }

    if (status < 200 || status >= 300 || !body?.data) {
      return { ok: false, notFound: false, error: `Failed to load post (${status}).` };
    }

    return { ok: true, post: body.data };
  } catch {
    return {
      ok: false,
      notFound: false,
      error: "We couldn't reach the blog right now. Please try again.",
    };
  }
}
