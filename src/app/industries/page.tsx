import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Shield, Briefcase, Lock, Trophy, Leaf, type LucideIcon } from "lucide-react";
import { getApps } from "@/lib/apps-data";
import type { AppDefinition } from "@/data/apps";
import PageHero from "@/components/PageHero";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import { categoriesIn, categoryIcon } from "@/lib/app-display";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries",
  description: "Flacron Enterprises builds AI solutions for construction, insurance, cybersecurity, sports, business, and personal development.",
  alternates: { canonical: "/industries" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Industries | Flacron Enterprises",
    url: "/industries",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Industries — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Industries | Flacron Enterprises", images: [OG_IMAGE] },
};

type Match = { categories: string[]; industries: string[] };

/**
 * Industry stories. Products are attached from their catalog data (category, or an exact industry tag), never by
 * slug, so new products land in the right place automatically. Categories none of these cover get their own section.
 */
const industries: Array<{ name: string; icon: LucideIcon; description: string; challenges: string[]; match: Match }> = [
  {
    name: "Construction & Property",
    icon: Building2,
    description: "The construction industry loses billions annually to inaccurate estimates, poor communication, and compliance failures. Our AI platforms bring precision, automation, and real-time visibility to every project.",
    challenges: ["Manual and inaccurate cost estimation", "Disconnected stakeholder communication", "Compliance and permit management overhead", "Slow insurance claim resolution"],
    match: { categories: ["Construction"], industries: ["Construction"] },
  },
  {
    name: "Insurance",
    icon: Shield,
    description: "Insurance operations are burdened by paper-heavy processes, rising fraud, and policyholder expectations for instant digital experiences. We digitise and automate the full claims lifecycle.",
    challenges: ["Slow and manual claims processing", "Rising fraudulent claim rates", "High cost per claim", "Poor policyholder experience"],
    match: { categories: ["Insurance"], industries: ["Insurance"] },
  },
  {
    name: "Business & Sales",
    icon: Briefcase,
    description: "Growing businesses struggle with inconsistent follow-up, underused CRM tools, and sales teams spending too much time on admin. Our AI growth platform automates the journey from lead to close.",
    challenges: ["Inconsistent lead follow-up", "Low CRM adoption", "Sales admin overhead", "Unpredictable revenue forecasting"],
    match: { categories: ["Business", "Marketing"], industries: [] },
  },
  {
    name: "Cybersecurity",
    icon: Lock,
    description: "Cyber threats evolve faster than most security teams can respond. We give organisations the AI intelligence and automation to detect, respond, and stay compliant — without burning out their team.",
    challenges: ["Alert fatigue from too many signals", "Manual compliance reporting", "Slow incident detection and response", "Dark web exposure monitoring"],
    match: { categories: ["Security"], industries: ["Cybersecurity"] },
  },
  {
    name: "Sports & Media",
    icon: Trophy,
    description: "Sports organisations struggle to keep fans engaged beyond matchdays while athletes lack tools for direct-to-fan relationships. We build the infrastructure for modern sports engagement.",
    challenges: ["Low fan engagement between events", "Manual content production costs", "Limited athlete monetisation tools", "Fragmented fan community management"],
    match: { categories: ["Sports"], industries: ["Sports"] },
  },
  {
    name: "Personal Development",
    icon: Leaf,
    description: "The personal development industry is full of content but short on structured, accountable transformation. We combine AI, coaching frameworks, and community to drive real change.",
    challenges: ["Lack of structure and accountability", "Fragmented tools and coaches", "Low habit formation success rates", "Missing peer community support"],
    match: { categories: ["Growth", "Community"], industries: ["Personal Development"] },
  },
];

function matches(app: AppDefinition, match: Match) {
  if (match.categories.includes(app.category)) return true;
  const tags = (app.industries ?? []).map((i) => i.toLowerCase());
  return match.industries.some((i) => tags.includes(i.toLowerCase()));
}

function slugify(name: string) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function IndustriesPage() {
  const apps = await getApps();
  const covered = new Set(industries.flatMap((i) => i.match.categories));
  const sections = [
    ...industries.map((ind) => ({ ...ind, relatedApps: apps.filter((a) => matches(a, ind.match)) })),
    ...categoriesIn(apps)
      .filter((c) => !covered.has(c))
      .map((category) => ({
        name: category,
        icon: categoryIcon(category),
        description: "",
        challenges: [] as string[],
        relatedApps: apps.filter((a) => a.category === category),
      })),
  ];

  return (
    <div>
      <PageHero
        eyebrow="Industries"
        title="Solving real problems in the right industries."
        description="Every Flacron product is built around deep industry understanding — not generic software adapted to fit."
      >
        <nav aria-label="Industries on this page" className="mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.name} href={`#${slugify(s.name)}`} className="chip transition-colors hover:border-accent-border hover:text-text">
              {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="section border-t border-border bg-surface-muted">
        <div className="container-page space-y-5">
          {sections.map((ind) => {
            const Icon = ind.icon;
            return (
              <article key={ind.name} id={slugify(ind.name)} className="card scroll-mt-24 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                  <div className="border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                        <Icon aria-hidden className="h-5 w-5 text-accent-text" />
                      </span>
                      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text">{ind.name}</h2>
                    </div>
                    {ind.description && <p className="max-w-2xl text-base leading-relaxed text-text-secondary">{ind.description}</p>}
                    {ind.challenges.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-sm font-semibold text-text">Key challenges we address</h3>
                        <ul className="grid gap-2.5 sm:grid-cols-2">
                          {ind.challenges.map((c) => (
                            <li key={c} className="flex items-start gap-2.5 text-[15px] text-text-secondary">
                              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="bg-surface-muted/60 p-6 sm:p-8">
                    <h3 className="mb-4 text-sm font-semibold text-text">Relevant products</h3>
                    {ind.relatedApps.length > 0 ? (
                      <ul className="space-y-2.5">
                        {ind.relatedApps.map((app) => (
                          <li key={app.id}>
                            <Link
                              href={`/apps/${app.slug}`}
                              className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-accent-border"
                            >
                              <AppLogo name={app.name} logoUrl={app.logoUrl} size={38} />
                              <span className="min-w-0 flex-1">
                                <span className="flex flex-wrap items-center gap-1.5">
                                  <span className="truncate text-sm font-semibold text-text group-hover:text-accent-text">{app.name}</span>
                                  <StatusBadge status={app.status} compact />
                                </span>
                                <span className="block truncate text-[13px] text-text-muted">{app.tagline}</span>
                              </span>
                              <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent-text" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        <Link href="/contact" className="link-accent">Talk to our team</Link> about solutions for this industry.
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
