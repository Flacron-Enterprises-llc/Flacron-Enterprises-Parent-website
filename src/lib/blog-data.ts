import { isFirebaseConfigured } from "./firebase-server";
import { BLOG_COLLECTION, isBlogCategory, isLive, type BlogPost } from "./blog";

/** Server-only: reads blog posts from Firestore. */

/** Shown only when Firestore is unreachable or has no posts yet, so /blog and /rss.xml are never empty. */
const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: "welcome-to-the-flacron-enterprises-blog",
    title: "Welcome to the Flacron Enterprises Blog",
    excerpt:
      "Company news, product launches, feature updates and practical guides from the team building the Flacron AI ecosystem — all in one place.",
    content: `This is the new home for everything happening at **Flacron Enterprises**.

## What you will find here

- **Company news and announcements** — milestones, partnerships and events.
- **Product launches** — new apps joining the Flacron ecosystem.
- **Feature updates** — what changed in the products you already use, and why.
- **Guides and insights** — practical articles on using AI in construction, insurance, sales, cybersecurity, sports and personal growth.

## Follow along

Every post here is also published to our [RSS feed](/rss.xml) and shared on our LinkedIn company page. Prefer email? Sign up for the newsletter at the bottom of any page.

Want to see the products in action? [Book a demo](/book-demo) with our team.`,
    category: "announcement",
    tags: ["Flacron Enterprises", "Announcement"],
    author: "Flacron Enterprises",
    status: "published",
    publishedAt: "2026-11-26T09:00:00.000Z",
  },
];

function normalize(raw: Partial<BlogPost> & { slug: string }): BlogPost {
  return {
    slug: raw.slug,
    title: raw.title ?? raw.slug,
    excerpt: raw.excerpt ?? "",
    content: raw.content ?? "",
    category: isBlogCategory(raw.category) ? raw.category : "blog",
    tags: Array.isArray(raw.tags) ? raw.tags.filter((t) => typeof t === "string" && t.trim()) : [],
    author: raw.author || "Flacron Enterprises",
    coverImage: raw.coverImage || undefined,
    status: raw.status === "published" ? "published" : "draft",
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    updatedAt: raw.updatedAt,
    excludeFromFeed: !!raw.excludeFromFeed,
  };
}

const byNewest = (a: BlogPost, b: BlogPost) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);

/** Every post in Firestore (drafts included), newest first. null when Firestore is unavailable. */
export async function getAllPostsRaw(): Promise<BlogPost[] | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const { getDb } = await import("./firebase-server");
    // The collection is small; filtering in memory avoids needing a composite Firestore index.
    const snapshot = await getDb().collection(BLOG_COLLECTION).get();
    return snapshot.docs.map((doc) => normalize({ ...(doc.data() as Partial<BlogPost>), slug: doc.id })).sort(byNewest);
  } catch (error) {
    console.error("blog: failed to load posts", error);
    return null;
  }
}

/** Published posts whose date has arrived, newest first. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const all = await getAllPostsRaw();
  const live = (all ?? []).filter((p) => isLive(p));
  return live.length ? live : FALLBACK_POSTS;
}

export async function getPublishedPost(slug: string): Promise<BlogPost | undefined> {
  return (await getPublishedPosts()).find((p) => p.slug === slug);
}
