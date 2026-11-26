import { revalidatePath } from "next/cache";
import { isBlogCategory, slugify, type BlogPost } from "@/lib/blog";

/** Server-only helpers for the Admin → Blog API routes. */

export function revalidateBlog(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/rss.xml");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

/** Validates and cleans an incoming post. Returns an error message instead when it cannot be saved. */
export function parsePost(body: unknown): BlogPost | string {
  if (!body || typeof body !== "object") return "Invalid body";
  const b = body as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const title = str(b.title);
  const slug = slugify(str(b.slug) || title);
  const content = typeof b.content === "string" ? b.content : "";
  const publishedAt = str(b.publishedAt) || new Date().toISOString();

  if (!title) return "Title is required";
  if (!slug) return "Slug is required";
  if (!content.trim()) return "Content is required";
  if (!isBlogCategory(b.category)) return "Choose a category";
  if (!Number.isFinite(Date.parse(publishedAt))) return "Invalid publish date";

  const coverImage = str(b.coverImage);
  if (coverImage && !/^https:\/\//i.test(coverImage) && !coverImage.startsWith("/")) {
    return "Cover image must be an https:// URL or a /path on this site";
  }

  return {
    slug,
    title,
    excerpt: str(b.excerpt),
    content,
    category: b.category,
    tags: Array.isArray(b.tags) ? b.tags.map(str).filter(Boolean).slice(0, 15) : [],
    author: str(b.author) || "Flacron Enterprises",
    ...(coverImage ? { coverImage } : {}),
    status: b.status === "published" ? "published" : "draft",
    publishedAt: new Date(publishedAt).toISOString(),
    updatedAt: new Date().toISOString(),
    excludeFromFeed: !!b.excludeFromFeed,
  };
}
