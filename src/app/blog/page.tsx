import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/blog/PostCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { BLOG_CATEGORIES, categoryLabel, isBlogCategory } from "@/lib/blog";
import { getPublishedPosts } from "@/lib/blog-data";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — News, Launches & Insights",
  description:
    "Company news, product launches, feature updates, announcements and practical AI guides from Flacron Enterprises.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} — News & Insights` }] },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Blog | Flacron Enterprises",
    url: "/blog",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Blog — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Blog | Flacron Enterprises", images: [OG_IMAGE] },
};

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = isBlogCategory(category) ? category : null;

  const all = await getPublishedPosts();
  const posts = active ? all.filter((p) => p.category === active) : all;
  const usedCategories = BLOG_CATEGORIES.filter((c) => all.some((p) => p.category === c.value));
  const [featured, ...rest] = posts;

  const chip = (on: boolean) =>
    cn(
      "block whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      on ? "border-text bg-text text-bg" : "border-border bg-surface text-text-secondary hover:border-border-strong hover:text-text"
    );

  return (
    <div className="relative isolate">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />

      <PageHero
        title={<>News, launches &amp; <span className="text-accent-text">insights</span></>}
        description="Company news, product launches, feature updates and practical guides from the team building the Flacron AI ecosystem."
        actions={
          <a href="/rss.xml" className="btn btn-secondary w-fit">
            <Rss aria-hidden className="h-4 w-4" /> RSS feed
          </a>
        }
      />

      <section className="container-page pb-20">
        {usedCategories.length > 1 && (
          <nav aria-label="Blog categories" className="scrollbar-none -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              <li><Link href="/blog" aria-current={!active ? "page" : undefined} className={chip(!active)}>All posts</Link></li>
              {usedCategories.map((c) => (
                <li key={c.value}>
                  <Link href={`/blog?category=${c.value}`} aria-current={active === c.value ? "page" : undefined} className={chip(active === c.value)}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {!featured ? (
          <div className="card border-dashed p-12 text-center">
            <p className="font-semibold text-text">No {active ? categoryLabel(active).toLowerCase() : ""} posts yet.</p>
            <Link href="/blog" className="link-accent mt-2 inline-block text-sm">See all posts</Link>
          </div>
        ) : (
          <>
            <PostCard post={featured} featured />
            {rest.length > 0 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>
            )}
          </>
        )}
      </section>

      <section className="band">
        <div className="container-page flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white">Never miss an update</h2>
            <p className="mt-2 text-sm leading-relaxed text-band-muted">
              Get new posts by email, follow us on{" "}
              <a href="https://www.linkedin.com/company/109062090" target="_blank" rel="noopener noreferrer" className="font-semibold text-white underline underline-offset-4">LinkedIn</a>
              , or subscribe to the <a href="/rss.xml" className="font-semibold text-white underline underline-offset-4">RSS feed</a>.
            </p>
          </div>
          <div className="w-full lg:w-96"><NewsletterSignup /></div>
        </div>
      </section>
    </div>
  );
}
