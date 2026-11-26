import { categoryLabel, isBlogCategory } from "@/lib/blog";
import { getPublishedPosts } from "@/lib/blog-data";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_NAME, SITE_DESCRIPTION, LOGO_PATH, OG_IMAGE, absoluteUrl } from "@/lib/site";

/**
 * Central RSS 2.0 feed: https://flacronenterprises.com/rss.xml
 *
 * Every published blog post (news, launches, feature updates, announcements, guides, insights) lands here
 * automatically. LinkedIn has no built-in RSS import for company pages, so an automation tool (Zapier / Make /
 * Buffer / dlvr.it) watches this URL and posts each new <item> to the company page. Each item carries a stable
 * <guid>, the excerpt as <description>, the full article as <content:encoded>, and the cover image as both
 * <enclosure> and <media:content> so the LinkedIn post gets a picture.
 *
 * Optional `?category=product-launch` (or news, feature-update, …) returns a single-category feed.
 */

export const revalidate = 300;

const MAX_ITEMS = 50;

function xml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    // Characters XML 1.0 forbids would make the whole feed unparseable.
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
}

function cdata(s: string): string {
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function imageType(url: string): string {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "image/jpeg";
}

function toAbsolute(url: string): string {
  return /^https?:\/\//i.test(url) ? url : absoluteUrl(url);
}

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get("category");
  const filter = isBlogCategory(category) ? category : null;

  const posts = (await getPublishedPosts())
    .filter((p) => !p.excludeFromFeed)
    .filter((p) => !filter || p.category === filter)
    .slice(0, MAX_ITEMS);

  const feedUrl = absoluteUrl(filter ? `/rss.xml?category=${filter}` : "/rss.xml");
  const title = filter ? `${SITE_NAME} — ${categoryLabel(filter)}` : `${SITE_NAME} — News & Insights`;
  const lastBuild = posts[0] ? new Date(posts[0].updatedAt ?? posts[0].publishedAt) : new Date();

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.slug}`);
      const image = toAbsolute(post.coverImage || OG_IMAGE);
      const categories = [...new Set([categoryLabel(post.category), ...post.tags])]
        .map((c) => `      <category>${xml(c)}</category>`)
        .join("\n");
      return `    <item>
      <title>${xml(post.title)}</title>
      <link>${xml(link)}</link>
      <guid isPermaLink="true">${xml(link)}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${xml(post.author)}</dc:creator>
${categories}
      <description>${xml(post.excerpt)}</description>
      <content:encoded>${cdata(renderMarkdown(post.content, { absolute: true }))}</content:encoded>
      <enclosure url="${xml(image)}" length="0" type="${imageType(image)}" />
      <media:content url="${xml(image)}" medium="image" type="${imageType(image)}" />
    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xml(title)}</title>
    <link>${xml(absoluteUrl("/blog"))}</link>
    <atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml" />
    <description>${xml(`Company news, product launches, feature updates, announcements and insights from ${SITE_NAME}. ${SITE_DESCRIPTION}`)}</description>
    <language>en-us</language>
    <copyright>${xml(`© ${new Date().getFullYear()} ${SITE_NAME} LLC`)}</copyright>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${xml(absoluteUrl(LOGO_PATH))}</url>
      <title>${xml(title)}</title>
      <link>${xml(absoluteUrl("/blog"))}</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
