import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import TrackedLink from "@/components/TrackedLink";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import { categoriesIn } from "@/lib/app-display";

interface HeroSectionProps {
  apps: AppDefinition[];
}

/**
 * Homepage hero. Left: the promise and the two primary actions. Right: the signature element — a live directory of
 * the ecosystem, rendered from the same catalog as the rest of the site, so it is always true.
 */
export default function HeroSection({ apps }: HeroSectionProps) {
  const categories = categoriesIn(apps);
  const liveCount = apps.filter((a) => a.status === "live").length;
  const ordered = [...apps].sort((a, b) => Number(b.status === "live") - Number(a.status === "live"));

  const stats = [
    { value: apps.length, label: apps.length === 1 ? "AI product" : "AI products" },
    { value: liveCount, label: "Live now" },
    { value: categories.length, label: categories.length === 1 ? "Industry" : "Industries" },
  ];

  return (
    <section className="band overflow-hidden" aria-labelledby="hero-title">
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />

      <div className="container-page grid grid-cols-1 items-center gap-14 pb-20 pt-28 sm:pt-32 lg:min-h-[min(100svh,880px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-28 lg:pt-32">
        {/* Left — promise */}
        <div>
          <p style={{ ["--i" as string]: 0 }} className="rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[13px] text-white/80">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#fe4705]" />
            AI Apps for a Smarter World
          </p>

          <h1 style={{ ["--i" as string]: 1 }}
            id="hero-title"
            className="rise mt-7 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-[3.4rem] lg:text-[3.9rem]"
          >
            One ecosystem. Multiple AI&#8209;powered solutions.
          </h1>

          <p style={{ ["--i" as string]: 2 }} className="rise mt-7 max-w-xl text-lg leading-8 text-white/75">
            Discover Flacron Enterprises&apos; ecosystem of intelligent applications for
            construction, insurance, lead generation, cybersecurity, sports, and personal growth.
          </p>

          <div style={{ ["--i" as string]: 3 }} className="rise mt-10 flex flex-col gap-3 sm:flex-row">
            <TrackedLink href="/ecosystem" event="cta_explore_ecosystem_hero" className="btn btn-primary btn-lg">
              Explore the ecosystem <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink href="/book-demo" event="cta_book_demo_hero" className="btn btn-on-band btn-lg">
              Book a demo
            </TrackedLink>
          </div>

          <dl style={{ ["--i" as string]: 4 }} className="rise mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-4 first:pl-0">
                <dt className="text-[13px] text-white/65">{s.label}</dt>
                <dd className="mt-1 font-display text-3xl font-semibold tabular-nums tracking-[-0.03em] text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <ul style={{ ["--i" as string]: 5 }} className="rise mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
            {["Microsoft Partner", "IBM Certified", "AWS Partner", "ISO 27001 Aligned"].map((badge) => (
              <li key={badge} className="flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#fe4705]" />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — live ecosystem directory */}
        <div className="rise relative" style={{ ["--i" as string]: 2 }}>
          <div aria-hidden className="pointer-events-none absolute -inset-16 -z-10 hidden lg:block">
            <div className="rings absolute inset-0" />
            <div className="radar absolute inset-[12%] opacity-60" />
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <p className="font-display text-base font-semibold text-text">The Flacron ecosystem</p>
                <p className="text-[13px] text-text-muted">Every product shares one infrastructure and one team.</p>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-xs font-semibold text-success sm:inline-flex">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                {liveCount} live
              </span>
            </div>

            <ul className="divide-y divide-border">
              {ordered.slice(0, 5).map((app) => (
                <li key={app.id}>
                  <Link
                    href={`/apps/${app.slug}`}
                    className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted sm:px-6"
                  >
                    <AppLogo name={app.name} logoUrl={app.logoUrl} size={44} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[15px] font-semibold text-text">{app.name}</span>
                        <span className="hidden text-[13px] text-text-muted sm:inline">{app.category}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-text-secondary">{app.tagline}</span>
                    </span>
                    <StatusBadge status={app.status} compact className="hidden sm:inline-flex" />
                    <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2 border-t border-border bg-surface-muted px-5 py-4 sm:px-6">
              {categories.slice(0, 6).map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
              <Link href="/ecosystem" className="link-accent ml-auto inline-flex items-center gap-1 text-sm">
                {apps.length > 5 ? `All ${apps.length} products` : "View all"} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
