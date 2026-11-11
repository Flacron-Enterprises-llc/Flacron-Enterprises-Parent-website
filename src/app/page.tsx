import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Rocket, BarChart3, Building2, Shield, Briefcase, Lock, Trophy, Leaf, Sparkles, MessageSquareText, CalendarCheck, Check } from "lucide-react";
import { getApps } from "@/lib/apps-data";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";
import ROICalculator from "@/components/ROICalculator";
import TrackedLink from "@/components/TrackedLink";
import PartnerBadges from "@/components/PartnerBadges";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Flacron Enterprises — AI Apps for a Smarter World",
    description: "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.",
    url: "/",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Flacron Enterprises — AI Apps for a Smarter World",
      },
    ],
  },
};

const industries = [
  { name: "Construction",   icon: Building2, desc: "AI estimation, project tracking, and compliance." },
  { name: "Insurance",      icon: Shield,    desc: "Claims automation, fraud detection, self-service." },
  { name: "Small Business", icon: Briefcase, desc: "Lead generation, CRM, automated outreach." },
  { name: "Cybersecurity",  icon: Lock,      desc: "Threat detection, compliance monitoring." },
  { name: "Sports & Media", icon: Trophy,    desc: "Fan engagement, content AI, athlete branding." },
  { name: "Personal Growth",icon: Leaf,      desc: "Coaching, habit intelligence, community." },
];

const differentiators = [
  { title: "Ecosystem Approach",      desc: "All products share infrastructure, integrations, and support — your tools work better together." },
  { title: "AI-First Architecture",   desc: "Every product is built with AI at the core, not bolted on as an afterthought." },
  { title: "Scalable Solutions",      desc: "From solo founders to enterprise teams — our platforms grow as you grow." },
  { title: "Industry-Focused",        desc: "Each product is purpose-built for its industry's specific workflows and regulations." },
  { title: "Partner-Backed",          desc: "Built on Microsoft and IBM technology with enterprise-grade security and reliability." },
  { title: "Future-Ready Platform",   desc: "New products are constantly being added. One relationship, expanding capability." },
];

const howItWorks = [
  { step: "1", icon: Search,   title: "Discover Your Solution", desc: "Browse our ecosystem to find the AI product built for your specific industry and challenge." },
  { step: "2", icon: Rocket,   title: "Deploy in Days",         desc: "Onboard quickly with guided setup, integrations, and a dedicated team to get you live fast." },
  { step: "3", icon: BarChart3,title: "Scale With Confidence",  desc: "Monitor performance, unlock features, and expand to other Flacron products as you grow." },
];

const quickActions = [
  { label: "Connect me with a sales rep", href: "/contact", icon: MessageSquareText },
  { label: "Show me a live demo", href: "/book-demo", icon: CalendarCheck },
  { label: "Find the right AI product", href: "/ecosystem", icon: Sparkles },
];

const faqs = [
  { q: "What is Flacron Enterprises?", a: "Flacron is an ecosystem of AI-powered products, each purpose-built for a specific industry — from construction and insurance to cybersecurity and personal growth — sharing one infrastructure, support team, and account." },
  { q: "How fast can I deploy a Flacron AI product?", a: "Most teams are live within days, not months. Our guided onboarding and prebuilt integrations mean you skip the long implementation cycles typical of enterprise software." },
  { q: "Do Flacron products integrate with my existing tools?", a: "Yes. Every product is built on a shared, Microsoft and IBM-backed infrastructure with standard integrations into common CRMs, calendars, and business tools." },
  { q: "Is my data secure?", a: "Security is core to our architecture, not an add-on. We align with ISO 27001 practices and enterprise-grade encryption across every product in the ecosystem." },
  { q: "Can I use more than one Flacron product?", a: "Absolutely — that's the point of the ecosystem. Add products as you grow, and they work together under one relationship instead of stitching together separate vendors." },
];

export default async function HomePage() {
  const apps = await getApps();
  // Live products first, then the rest in catalog order.
  const featured = [...apps].sort((a, b) => Number(b.status === "live") - Number(a.status === "live")).slice(0, 6);

  return (
    <>
      <HeroSection apps={apps} />

      {/* ── Partners strip ── */}
      <section aria-label="Technologies and partnerships" className="border-y border-border bg-surface-muted py-8">
        <div className="container-page flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
          <p className="shrink-0 text-sm font-medium text-text-muted">Trusted technologies &amp; partnerships</p>
          <div className="w-full min-w-0 flex-1">
            <PartnerBadges />
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="The ecosystem"
              title="Solutions ready to deploy."
              description="Each product is purpose-built for its industry, and they all share one infrastructure, one support team and one account."
              className="mb-0 sm:mb-0"
            />
            <TrackedLink href="/ecosystem" event="cta_see_all_solutions_stats" className="btn btn-secondary shrink-0 self-start sm:self-auto">
              See all solutions <ArrowRight aria-hidden className="h-4 w-4" />
            </TrackedLink>
          </div>
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((app, i) => (
              <FadeIn key={app.id} delay={i * 0.05} className="h-full">
                <ProductCard app={app} showMetric />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ask Flacron — interactive hook ── */}
      <section className="band overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.75rem]">
              Tell us what you need. We&apos;ll show you the AI for it.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-band-muted sm:text-lg">
              Search the ecosystem by industry or by problem, or go straight to a person.
            </p>
          </div>
          <div>
            <Link
              href="/ecosystem"
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-left text-[15px] text-band-muted transition-colors hover:border-[#ff8a55]/60 hover:bg-white/[0.09] sm:px-6 sm:py-5 sm:text-base"
            >
              <Search aria-hidden className="h-5 w-5 shrink-0 text-[#ff8a55]" />
              <span className="min-w-0">Search the ecosystem — try &ldquo;construction&rdquo; or &ldquo;lead generation&rdquo;</span>
            </Link>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
              {quickActions.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link href={href} className="btn btn-on-band h-full min-h-11 w-full justify-start whitespace-normal py-2.5 text-left">
                    <Icon aria-hidden className="h-4 w-4 shrink-0 text-[#ff8a55]" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="How it works"
            title="From discovery to transformation."
            description="Getting started with Flacron is simple. Three steps to unlocking AI-driven results."
          />
          <ol className="relative grid gap-5 md:grid-cols-3">
            <span aria-hidden className="absolute left-[16%] right-[16%] top-[58px] hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block" />
            {howItWorks.map(({ step, icon: Icon, title, desc }) => (
              <li key={step} className="card relative p-7">
                <span className="relative inline-flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-border bg-bg text-[#002961] shadow-sm dark:text-[#8fb2ec]">
                  <Icon aria-hidden className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cta font-display text-xs font-semibold text-on-cta">
                    <span className="sr-only">Step </span>{step}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-text">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-7 text-text-secondary">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            eyebrow="Industries we serve"
            title="Your industry, intelligently served."
            description="Flacron Enterprises builds focused solutions for the industries where AI makes the biggest difference."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(({ icon: Icon, ...ind }) => (
              <TrackedLink
                key={ind.name}
                href="/industries"
                event="industry_tile_click"
                eventData={{ industry: ind.name }}
                className="card card-interactive group flex items-start gap-4 p-5 sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#002961] text-white shadow-sm transition-colors duration-300 group-hover:bg-cta group-hover:text-on-cta dark:bg-[#8fb2ec]/15 dark:text-[#8fb2ec]">
                  <Icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-text">{ind.name}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-text-secondary">{ind.desc}</span>
                </span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Flacron ── */}
      <section className="band overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page section">
          <SectionHeader
            eyebrow="Why Flacron"
            title="One company. One vision. Many solutions."
            description="We don't build disconnected tools. We build a connected ecosystem that grows with you."
            light
          />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((d) => (
              <li key={d.title} className="bg-band p-6 sm:p-7">
                <Check aria-hidden className="h-5 w-5 text-[#ff8a55]" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-band-muted">{d.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Calculate your impact"
            title="How much could AI save your team?"
            description="Move the sliders to see an estimate based on your team size and current manual workload."
          />
          <FadeIn>
            <ROICalculator />
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <div className="band overflow-hidden rounded-3xl px-6 py-14 sm:px-12 lg:py-16">
            <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 hidden h-[420px] w-[420px] sm:block">
              <div className="rings absolute inset-0" />
              <div className="radar absolute inset-[10%] opacity-70" />
            </div>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <h2 className="font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[2.3rem]">
                  Ready to transform your business?
                </h2>
                <p className="mt-4 max-w-xl text-[16.5px] leading-7 text-white/75">
                  Talk to our team, explore the ecosystem, or book a personalised demo today. More solutions are coming — we are
                  actively building new AI products.
                </p>
                <p className="mt-5 text-sm font-medium text-white/65">No long contracts. No disruption to your current stack. Live in days.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <TrackedLink href="/book-demo" event="cta_book_demo_final" className="btn btn-primary btn-lg">
                  Book a demo
                </TrackedLink>
                <TrackedLink href="/ecosystem" event="cta_explore_ecosystem_final" className="btn btn-on-band btn-lg">
                  Explore ecosystem
                </TrackedLink>
                <TrackedLink href="/contact" event="cta_talk_to_sales_final" className="btn btn-lg text-white/80 hover:bg-white/10 hover:text-white">
                  Talk to sales
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section border-t border-border bg-surface-muted">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="FAQ"
              title="Questions, answered."
              description="Everything you need to know before getting started with Flacron."
              className="mb-0 sm:mb-0"
            />
          </div>
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
