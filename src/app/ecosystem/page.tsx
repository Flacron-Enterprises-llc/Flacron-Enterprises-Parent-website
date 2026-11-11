import type { Metadata } from "next";
import { getApps } from "@/lib/apps-data";
import AppGrid from "@/components/AppGrid";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import TrackedLink from "@/components/TrackedLink";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "Explore the full Flacron Enterprises ecosystem of AI-powered products. Filter by industry, category, and status.",
  alternates: { canonical: "/ecosystem" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Ecosystem | Flacron Enterprises",
    url: "/ecosystem",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Ecosystem — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Ecosystem | Flacron Enterprises", images: [OG_IMAGE] },
};

export default async function EcosystemPage() {
  const apps = await getApps();
  const stats = [
    { value: apps.length, label: "Products" },
    { value: apps.filter((a) => a.status === "live").length, label: "Live now" },
    { value: apps.filter((a) => a.status === "beta").length, label: "Beta" },
    { value: apps.filter((a) => a.status === "coming-soon").length, label: "Coming soon" },
    { value: new Set(apps.map((a) => a.category)).size, label: "Industries" },
  ].filter((s) => s.value > 0);

  return (
    <>
      <PageHero
        eyebrow="Full ecosystem"
        title="Every product. One mission."
        description="Browse the complete suite of Flacron Enterprises AI products. New solutions are added continuously — this is where you find them all."
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-5 py-4">
                <dt className="text-[13px] text-text-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-text">{s.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="container-page pb-16 sm:pb-24">
        <AppGrid apps={apps} mode="full" />

        <div className="band mt-16 overflow-hidden rounded-[1.75rem] px-6 py-10 sm:mt-24 sm:px-12 sm:py-14">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">More solutions are on the way.</h2>
              <p className="mt-3 text-base leading-relaxed text-band-muted">
                We are continuously building and launching new AI-powered products. Want to be first to know?
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink href="/contact" event="cta_stay_updated" className="btn btn-primary btn-lg">
                Stay in the loop
              </TrackedLink>
              <Link href="/custom-order" className="btn btn-on-band btn-lg">
                Order a custom build
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
