import { createElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getApps } from "@/lib/apps-data";
import type { AppDefinition } from "@/data/apps";
import PageHero from "@/components/PageHero";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import { categoriesIn, categoryIcon } from "@/lib/app-display";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Explore Flacron Enterprises solutions by business need. Find the right AI-powered tool for your challenge.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Solutions | Flacron Enterprises",
    url: "/solutions",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Solutions — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Solutions | Flacron Enterprises", images: [OG_IMAGE] },
};

/**
 * Copy for the business needs we describe on this page, keyed by product category. Products are grouped by their
 * catalog category, so every product shows up; a category without copy here gets a plain heading.
 */
const needCopy: Record<string, { title: string; description: string }> = {
  Construction: {
    title: "Construction & Property",
    description: "AI estimation, project management, compliance tracking, and insurance integration for the built environment.",
  },
  Business: {
    title: "Business Growth & Sales",
    description: "Intelligent lead generation, automated outreach, and CRM to help businesses grow faster.",
  },
  Insurance: {
    title: "Insurance & Claims",
    description: "End-to-end claims automation, fraud detection, and policyholder self-service for modern insurers.",
  },
  Security: {
    title: "Cybersecurity & Compliance",
    description: "AI-powered threat detection, vulnerability scanning, and compliance automation for enterprise teams.",
  },
  Sports: {
    title: "Sports & Fan Engagement",
    description: "AI content creation, fan community management, and athlete brand tools for sports organisations.",
  },
  Growth: {
    title: "Personal Growth & Coaching",
    description: "Guided development programmes, habit intelligence, and community mentorship for modern professionals.",
  },
};

export default async function SolutionsPage() {
  const apps = await getApps();
  const groups = categoriesIn(apps).map((category) => ({
    category,
    title: needCopy[category]?.title ?? category,
    description: needCopy[category]?.description,
    apps: apps.filter((a) => a.category === category),
  }));

  return (
    <div>
      <PageHero
        eyebrow="Solutions"
        title="Find the right solution for your challenge."
        description="Each Flacron product is purpose-built to solve specific business problems. Browse by need to find your fit."
      />

      <section className="section border-t border-border bg-surface-muted">
        <div className="container-page">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <SolutionGroup key={group.category} {...group} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="band relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#ff8a55]">
                  <span aria-hidden className="h-px w-6 bg-[#ff8a55]" />
                  Custom solutions
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                  {"Can't find what you're looking for?"}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-band-muted sm:text-lg">
                  Our team works with businesses to design custom AI solutions beyond our standard product catalogue. Tell us your challenge and we&apos;ll find a way.
                </p>
                <p className="mt-6 text-sm text-band-muted">
                  Microsoft Partner · IBM Certified · AWS Partner · Responds within 1 business day
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Talk to Our Team <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link href="/book-demo" className="btn btn-on-band btn-lg">Book a Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SolutionGroup({ category, title, description, apps }: { category: string; title: string; description?: string; apps: AppDefinition[] }) {
  return (
    <div className="card flex flex-col p-6 sm:p-7">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
        {createElement(categoryIcon(category), { "aria-hidden": true, className: "h-5 w-5 text-accent-text" })}
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold tracking-[-0.02em] text-text">{title}</h2>
      {description && <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{description}</p>}
      <ul className="mt-auto space-y-2 pt-6">
        {apps.map((app) => (
          <li key={app.id}>
            <Link
              href={`/apps/${app.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-bg p-3 transition-colors hover:border-accent-border"
            >
              <AppLogo name={app.name} logoUrl={app.logoUrl} size={36} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-semibold text-text group-hover:text-accent-text">{app.name}</span>
                  <StatusBadge status={app.status} compact />
                </span>
                <span className="mt-0.5 line-clamp-1 block text-[13px] text-text-muted">{app.tagline}</span>
              </span>
              <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-text" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
