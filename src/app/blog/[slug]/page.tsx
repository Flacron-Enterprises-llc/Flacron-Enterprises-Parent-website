import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PostCard, { PostMeta } from "@/components/blog/PostCard";
import { categoryLabel } from "@/lib/blog";
import { getPublishedPost, getPublishedPosts } from "@/lib/blog-data";
import { renderMarkdown } from "@/lib/markdown";
import { normalizeTitle } from "@/lib/seo";
import { SITE_NAME, SITE_URL, OG_IMAGE, LOGO_PATH, absoluteUrl } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false } };

  const title = normalizeTitle(post.title);
  const image = post.coverImage || OG_IMAGE;
  const path = `/blog/${post.slug}`;
  return {
    title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} — News & Insights` }] },
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description: post.excerpt,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      section: categoryLabel(post.category),
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description: post.excerpt, images: [image] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = (await getPublishedPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [/^https?:/i.test(post.coverImage ?? "") ? post.coverImage : absoluteUrl(post.coverImage || OG_IMAGE)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization`, "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_PATH) } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: categoryLabel(post.category),
    keywords: post.tags.join(", "),
  };

  return (
    <div className="relative isolate">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />
      <Breadcrumbs lastLabel={post.title} />

      <article className="container-page pb-16 pt-6 sm:pt-8">
        <header className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-accent-text">
            <ArrowLeft aria-hidden className="h-4 w-4" /> All posts
          </Link>
          <PostMeta post={post} className="mt-6 text-sm" />
          <h1 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-text sm:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-[17px] leading-8 text-text-secondary">{post.excerpt}</p>
          <p className="mt-4 text-sm font-medium text-text">By {post.author}</p>
        </header>

        {post.coverImage && (
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- cover images are arbitrary URLs entered in the admin */}
            <img src={post.coverImage} alt="" className="aspect-[16/9] w-full object-cover" />
          </div>
        )}

        <div className="blog-prose mx-auto mt-10 max-w-3xl" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

        <footer className="mx-auto mt-12 max-w-3xl border-t border-border pt-6">
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => <li key={tag} className="chip">#{tag}</li>)}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#0A66C2] text-white hover:bg-[#004182]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.24H4.5V23H.5V8.24zM8.24 8.24h3.84v2.02h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V23h-4V15.1c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V23h-4V8.24z" /></svg>
              Share on LinkedIn
            </a>
            <Link href="/book-demo" className="btn btn-secondary">Book a demo</Link>
          </div>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="section border-t border-border bg-surface-muted">
          <div className="container-page">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text">More from the blog</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
