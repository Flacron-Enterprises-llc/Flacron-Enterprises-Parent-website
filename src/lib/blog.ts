/**
 * Blog / newsroom posts. One collection feeds three places: the /blog pages, /rss.xml (which Zapier, Make,
 * Buffer, dlvr.it etc. watch to post to the LinkedIn company page) and the sitemap. Posts are written in
 * Admin → Blog and stored in Firestore `blog_posts`, keyed by slug.
 *
 * This file is safe to import from client components; the Firestore reads live in blog-data.ts.
 */

export const BLOG_COLLECTION = "blog_posts";

export const BLOG_CATEGORIES = [
  { value: "news", label: "Company News" },
  { value: "blog", label: "Blog" },
  { value: "product-launch", label: "Product Launch" },
  { value: "feature-update", label: "Feature Update" },
  { value: "announcement", label: "Announcement" },
  { value: "education", label: "Education" },
  { value: "marketing", label: "Insights" },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]["value"];

export type BlogStatus = "draft" | "published";

export interface BlogPost {
  slug: string;
  title: string;
  /** One or two sentences: card text, meta description and the RSS <description> (what LinkedIn posts show). */
  excerpt: string;
  /** Markdown subset — see src/lib/markdown.ts. */
  content: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  /** Absolute URL or a /public path. Used as the card image, og:image and the RSS enclosure. */
  coverImage?: string;
  status: BlogStatus;
  /** ISO date. A published post with a future date stays hidden (scheduled) until that time. */
  publishedAt: string;
  updatedAt?: string;
  /** Leave out of /rss.xml (e.g. a post that should not go to LinkedIn). */
  excludeFromFeed?: boolean;
}

export function categoryLabel(value: string): string {
  return BLOG_CATEGORIES.find((c) => c.value === value)?.label ?? "Blog";
}

export function isBlogCategory(value: unknown): value is BlogCategory {
  return BLOG_CATEGORIES.some((c) => c.value === value);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function readingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function isLive(post: BlogPost, now = Date.now()): boolean {
  const at = Date.parse(post.publishedAt);
  return post.status === "published" && Number.isFinite(at) && at <= now;
}
