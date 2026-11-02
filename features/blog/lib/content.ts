import sanitizeHtml from "sanitize-html";
import type { BlogPost } from "../types";


const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr", "b", "strong", "i", "em", "u", "s", "sub", "sup", "span",
    "a", "ul", "ol", "li", "h2", "h3", "h4", "h5", "blockquote", "code", "pre",
    "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    "*": ["style"],
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
  },
  allowedStyles: {
    "*": { "text-align": [/^(left|right|center|justify)$/] },
    span: { "font-weight": [/^(bold|[5-9]00)$/] },
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  transformTags: {
    // The page already has an <h1> (the post title).
    h1: "h2",
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
};

// `<p><br></p>` (and bold/italic-wrapped variants) are editor spacers; spacing is handled in CSS.
const EMPTY_PARAGRAPH =
  /<p>(?:\s|&nbsp;|\u00a0|<br\s*\/?>|<\/?(?:strong|b|em|i|u)>)*<\/p>/gi;

export function sanitizeBlogHtml(html: string): string {
  return sanitizeHtml(html ?? "", SANITIZE_OPTIONS).replace(EMPTY_PARAGRAPH, "");
}

/** Plain text from HTML (tags stripped, entities decoded). */
export function htmlToText(html: string): string {
  return sanitizeHtml(html ?? "", { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

/** `excerpt` is optional in the API (often null) — fall back to the start of the body. */
export function getPostExcerpt(post: Pick<BlogPost, "excerpt" | "body">, maxLength = 160): string {
  const source = post.excerpt?.trim() ? htmlToText(post.excerpt) : htmlToText(post.body);
  if (source.length <= maxLength) return source;

  const cut = source.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export function getReadingTimeMinutes(body: string): number {
  const words = htmlToText(body).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getAuthorInitial(name: string | null | undefined): string {
  return (name?.trim().charAt(0) || "F").toUpperCase();
}
