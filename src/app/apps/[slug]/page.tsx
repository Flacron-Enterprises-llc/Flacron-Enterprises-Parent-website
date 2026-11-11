import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowUpRight, ChevronDown, AlertTriangle, Sparkles } from "lucide-react";
import { getApps, getAppBySlug, getAllSlugs } from "@/lib/apps-data";
import { generateAppMetadata } from "@/lib/seo";
import { getAppWebsite, websiteHost } from "@/lib/app-display";

export const dynamic = "force-dynamic";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import SectionHeader from "@/components/SectionHeader";
import WaitlistForm from "@/components/WaitlistForm";
import DynamicIcon from "@/components/DynamicIcon";
import AppSchema from "@/components/AppSchema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return {};
  return generateAppMetadata(app);
}

export default async function AppPage({ params }: PageProps) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  const isComingSoon = app.status === "coming-soon";
  const isBeta = app.status === "beta";
  const website = getAppWebsite(app);

  // Related products: same category first, then the rest of the catalog, whatever the data source returns.
  const allApps = await getApps();
  const others = allApps.filter((a) => a.slug !== app.slug);
  const related = [...others.filter((a) => a.category === app.category), ...others.filter((a) => a.category !== app.category)].slice(0, 3);

  const websiteLink = website ? (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost btn-lg"
      aria-label={`Visit ${app.name} website (${websiteHost(website)}, opens in a new tab)`}
    >
      Visit {websiteHost(website)} <ArrowUpRight aria-hidden className="h-4 w-4" />
    </a>
  ) : null;

  return (
    <div className="min-h-screen">
      <AppSchema app={app} />
      <Breadcrumbs lastLabel={app.name} />

      {/* 1. HERO */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[420px] w-[620px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgb(254 71 5 / 0.14), transparent)" }}
        />
        <div className="container-page pb-14 pt-8 sm:pb-20 sm:pt-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-4">
                <AppLogo name={app.name} logoUrl={app.logoUrl} size={72} className="shadow-sm" />
                <div className="flex flex-col gap-1.5">
                  <StatusBadge status={app.status} className="self-start" />
                  <span className="text-sm font-medium text-text-muted">{app.category}</span>
                </div>
              </div>
              <h1 className="mt-6 font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-text sm:text-5xl lg:text-6xl">
                {app.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">{app.tagline}</p>

              {!isComingSoon && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href={app.primaryCTA.href} className="btn btn-primary btn-lg">
                    {app.primaryCTA.label} <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                  {app.secondaryCTA && (
                    <Link href={app.secondaryCTA.href} className="btn btn-secondary btn-lg">
                      {app.secondaryCTA.label}
                    </Link>
                  )}
                  {websiteLink}
                </div>
              )}
              {isComingSoon && (
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-accent-border bg-accent-soft px-4 py-3">
                    <span className="text-sm font-medium text-text">This product is launching soon.</span>
                    <a href="#waitlist" className="link-accent whitespace-nowrap text-sm">Join the waitlist</a>
                  </div>
                  {websiteLink}
                </div>
              )}
            </div>

            {/* Metric */}
            {app.metrics && (
              <div className="card relative overflow-hidden p-6 sm:p-8">
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-accent" />
                <p className="font-display text-5xl font-semibold tracking-[-0.03em] text-accent-text sm:text-6xl">{app.metrics.value}</p>
                <p className="mt-2 text-sm font-medium text-text-secondary">{app.metrics.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW + PROBLEM / SOLUTION */}
      <section className="section border-y border-border bg-surface-muted">
        <div className="container-page">
          {app.longDescription && (
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-text-secondary sm:mb-14">{app.longDescription}</p>
          )}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-danger">
                <AlertTriangle aria-hidden className="h-4 w-4" /> The problem
              </p>
              <p className="leading-relaxed text-text-secondary">{app.problem}</p>
            </div>
            <div className="card p-6 sm:p-8">
              <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-success">
                <Sparkles aria-hidden className="h-4 w-4" /> Our solution
              </p>
              <p className="leading-relaxed text-text-secondary">{app.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      {app.features.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeader eyebrow="Features" title={`What ${app.name} does.`} description="Purpose-built tools for your exact workflow." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {app.features.map((f) => (
                <div key={f.title} className="card p-6">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <DynamicIcon iconName={f.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-text">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. BENEFITS */}
      {app.benefits.length > 0 && (
        <section className="section band">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
          <div className="container-page">
            <SectionHeader eyebrow="Benefits" title="Key benefits." light />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {app.benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                  <CheckCircle2 aria-hidden className="mb-4 h-6 w-6 text-[#ff8a55]" />
                  <h3 className="font-display text-base font-semibold text-white">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-band-muted">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. WHO IT'S FOR */}
      {app.targetAudience.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeader eyebrow="Built for" title="Who uses it." description="Designed around the people who do this work every day." />
            <ul className="flex flex-wrap gap-2.5">
              {app.targetAudience.map((a) => (
                <li key={a} className="rounded-full border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-text">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 6. USE CASES */}
      {app.useCases.length > 0 && (
        <section className="section border-y border-border bg-surface-muted">
          <div className="container-page">
            <SectionHeader eyebrow="Use cases" title="Where it applies." description={`Real scenarios where ${app.name} delivers value.`} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {app.useCases.map((uc, i) => (
                <li key={i} className="card flex items-start gap-3 p-5">
                  <CheckCircle2 aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-text" />
                  <p className="text-[15px] font-medium text-text">{uc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 7. TECH STACK */}
      {app.techStack.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className="container-page">
            <h2 className="mb-4 font-display text-lg font-semibold text-text">Tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {app.techStack.map((t) => (
                <li key={t} className="chip px-4 py-1.5 text-sm">{t}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8. FAQ */}
      {app.faqs.length > 0 && (
        <section className="section border-t border-border bg-surface-muted">
          <div className="container-page max-w-3xl">
            <SectionHeader eyebrow="FAQ" title="Common questions." />
            <div className="space-y-3">
              {app.faqs.map((faq) => (
                <details key={faq.question} className="card group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.25rem] p-5 text-[15px] font-semibold text-text sm:p-6 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-text-muted transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="text-[15px] leading-relaxed text-text-secondary">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FINAL CTA */}
      <section id="waitlist" className="section scroll-mt-24">
        <div className="container-page max-w-5xl">
          {isComingSoon ? (
            <div>
              <SectionHeader eyebrow="Coming soon" title={`Be first to try ${app.name}.`} description="Join the waitlist and get notified the moment we launch." centered />
              <div className="mx-auto max-w-xl">
                <WaitlistForm appName={app.name} appSlug={app.slug} />
              </div>
            </div>
          ) : (
            <div className="band overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
              <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
              <p className="mb-3 text-sm font-semibold text-[#ff8a55]">{isBeta ? "Join the beta" : "Get started"}</p>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Ready to get started with {app.name}?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-band-muted sm:text-lg">
                {isBeta
                  ? "Join our beta programme and help shape the product while getting early access."
                  : `Talk to our team to see if ${app.name} fits your workflow.`}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <Link href={app.primaryCTA.href} className="btn btn-primary btn-lg">
                  {app.primaryCTA.label} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                {app.secondaryCTA && (
                  <Link href={app.secondaryCTA.href} className="btn btn-on-band btn-lg">
                    {app.secondaryCTA.label}
                  </Link>
                )}
                {website && (
                  <a href={website} target="_blank" rel="noopener noreferrer" className="btn btn-on-band btn-lg">
                    Visit site <ArrowUpRight aria-hidden className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="section border-t border-border bg-surface-muted">
          <div className="container-page">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl">More from Flacron</h2>
              <Link href="/ecosystem" className="link-accent inline-flex items-center gap-1.5 text-sm">
                View the ecosystem <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProductCard key={r.slug} app={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
