import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import { getApps, getAppBySlug, getAllSlugs } from "@/lib/apps-data";
import { generateAppMetadata } from "@/lib/seo";

export const revalidate = 60;
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import GlassCard from "@/components/GlassCard";
import SectionHeader from "@/components/SectionHeader";
import WaitlistForm from "@/components/WaitlistForm";
import DynamicIcon from "@/components/DynamicIcon";

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

  return (
    <div className="min-h-screen">
      {/* 1. HERO */}
      <section className="relative pt-6 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(249,115,22,0.06)_0%,transparent_70%)]" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <AppLogo name={app.name} size={52} />
                <StatusBadge status={app.status} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-2 block">{app.category}</span>
              <h1 className="text-3xl font-black text-flacron-navy leading-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
                {app.name}
              </h1>
              <p className="mt-3 text-base text-slate-500 leading-relaxed sm:text-lg sm:mt-4">{app.tagline}</p>
              {!isComingSoon && (
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href={app.primaryCTA.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-[0_4px_16px_rgba(249,115,22,0.25)] sm:px-7 sm:py-3.5 sm:text-base">
                    {app.primaryCTA.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  {app.secondaryCTA && (
                    <Link href={app.secondaryCTA.href}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#F97316] hover:text-[#F97316] transition-colors sm:px-7 sm:py-3.5 sm:text-base">
                      {app.secondaryCTA.label}
                    </Link>
                  )}
                </div>
              )}
              {isComingSoon && (
                <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-orange-50 border border-orange-200 px-4 py-3">
                  <span className="text-sm font-medium text-orange-700">This product is launching soon.</span>
                  <a href="#waitlist" className="text-sm font-bold text-[#F97316] hover:underline whitespace-nowrap">Join the waitlist ↓</a>
                </div>
              )}
            </div>
            {/* Metrics */}
            {app.metrics && (
              <div className="w-full sm:w-56 lg:w-56 xl:w-64">
                <GlassCard priority="featured" className="p-5 sm:p-8 text-center">
                  <p className="text-4xl sm:text-5xl font-black text-[#F97316]" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>{app.metrics.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-500">{app.metrics.label}</p>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. PROBLEM / SOLUTION */}
      <section className="pt-10 pb-16 px-4 sm:px-6 lg:px-8 sm:pb-20 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-red-100 bg-white p-5 sm:p-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-red-400">The Problem</p>
              <p className="text-slate-600 leading-relaxed">{app.problem}</p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-white p-5 sm:p-8">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-green-500">Our Solution</p>
              <p className="text-slate-600 leading-relaxed">{app.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Features" title={`What ${app.name} does.`} description="Purpose-built tools for your exact workflow." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f) => (
              <GlassCard key={f.title} className="p-5 sm:p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#F97316]">
                  <DynamicIcon iconName={f.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-flacron-navy mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS / OUTCOMES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 sm:py-20 bg-flacron-navy">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Benefits" title="Real outcomes, not promises." light />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {app.benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <CheckCircle className="mb-3 h-6 w-6 text-[#F97316]" />
                <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO IT'S FOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Built For" title="Who uses it." description="Designed around the people who do this work every day." />
          <div className="flex flex-wrap gap-3">
            {app.targetAudience.map((a) => (
              <span key={a} className="rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-[#F97316] hover:text-[#F97316] transition-colors">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. USE CASES */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Use Cases" title="Where it applies." description={`Real scenarios where ${app.name} delivers value.`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {app.useCases.map((uc, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-xs font-black text-white">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-slate-700">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TECH STACK */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Powered By</p>
          <div className="flex flex-wrap gap-3">
            {app.techStack.map((t) => (
              <span key={t} className="rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-semibold text-[#F97316]">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Common questions." centered />
          <div className="space-y-4">
            {app.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-5 sm:p-6 text-sm font-bold text-flacron-navy list-none">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section id="waitlist" className="py-16 px-4 sm:px-6 lg:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          {isComingSoon ? (
            <div className="text-center mb-10">
              <SectionHeader eyebrow="Coming Soon" title={`Be first to try ${app.name}.`} description="Join the waitlist and get notified the moment we launch." centered />
              <div className="max-w-xl mx-auto">
                <WaitlistForm appName={app.name} appSlug={app.slug} />
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl bg-flacron-navy p-7 sm:p-12 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(249,115,22,0.12)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#F97316]">{isBeta ? "Join the Beta" : "Get Started"}</p>
                <h2 className="text-2xl font-black text-white sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
                  Ready to get started with {app.name}?
                </h2>
                <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
                  {isBeta
                    ? "Join our beta programme and help shape the product while getting early access."
                    : `Join the teams already using ${app.name} to transform their workflow.`}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
                  <Link href={app.primaryCTA.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-8 py-4 text-base font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-[0_4px_20px_rgba(249,115,22,0.3)]">
                    {app.primaryCTA.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  {app.secondaryCTA && (
                    <Link href={app.secondaryCTA.href}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                      {app.secondaryCTA.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
