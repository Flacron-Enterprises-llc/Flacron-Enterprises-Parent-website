import Link from "next/link";
import { ArrowRight, CheckCircle, Search, Rocket, BarChart3, Star, Quote, Building2, Shield, Briefcase, Lock, Trophy, Leaf } from "lucide-react";
import { getApps } from "@/lib/apps-data";
import HeroSection from "@/components/HeroSection";
import AppGrid from "@/components/AppGrid";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import WaveDivider from "@/components/WaveDivider";
import FadeIn from "@/components/FadeIn";

export const revalidate = 60;

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
  { step: "01", icon: Search,   title: "Discover Your Solution", desc: "Browse our ecosystem to find the AI product built for your specific industry and challenge." },
  { step: "02", icon: Rocket,   title: "Deploy in Days",         desc: "Onboard quickly with guided setup, integrations, and a dedicated team to get you live fast." },
  { step: "03", icon: BarChart3,title: "Scale With Confidence",  desc: "Monitor performance, unlock features, and expand to other Flacron products as you grow." },
];

const testimonials = [
  {
    quote: "FlacronBuild cut our estimation time from 3 days to under 2 hours. The AI accuracy is impressive.",
    name: "James Okafor",
    role: "General Contractor",
    company: "BuildRight Ltd",
    rating: 5,
  },
  {
    quote: "FlacronConnect AI transformed our outreach. We went from 50 to 300 qualified leads per month.",
    name: "Sarah Chen",
    role: "Head of Growth",
    company: "NovaSales",
    rating: 5,
  },
  {
    quote: "FlacronSecure AI flagged a real threat our previous tool missed. We switched immediately.",
    name: "Marcus Webb",
    role: "CISO",
    company: "TrustLayer Inc",
    rating: 5,
  },
];

const partners = ["Microsoft Partner", "IBM Certified", "AWS Infrastructure", "Azure AI", "ISO 27001 Aligned"];

export default async function HomePage() {
  const apps = await getApps();
  const liveApps = apps.filter((a) => a.status === "live").slice(0, 3);
  const previewApps = apps.slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* ── Trusted By ── */}
      <section className="border-y border-slate-100 bg-slate-50 py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted Technologies &amp; Partnerships
          </p>
          {/* Scrollable on mobile, wrapped on desktop */}
          <div className="flex items-center gap-8 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 sm:gap-x-12 sm:gap-y-4">
            {partners.map((p) => (
              <span key={p} className="shrink-0 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How It Works"
            title="From discovery to transformation."
            description="Getting started with Flacron is simple. Three steps to unlocking AI-driven results."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {howItWorks.map(({ step, icon: Icon, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.1} direction="up">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#F97316]/30 transition-all sm:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F97316]/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-[#F97316] sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-100 sm:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>{step}</span>
                  </div>
                  <h3 className="text-sm font-bold text-flacron-navy mb-2 sm:text-base">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed sm:text-sm">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosystem Overview ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
              <SectionHeader
                eyebrow="Our Ecosystem"
                title="Built for every frontier."
                description="Explore our suite of AI-powered products — each solving real problems in its industry."
              />
              <Link
                href="/ecosystem"
                className="shrink-0 self-start sm:self-auto inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:border-[#F97316] hover:text-[#F97316] transition-colors sm:px-5 sm:py-2.5"
              >
                View All Apps <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
          <AppGrid apps={previewApps} mode="preview" />
        </div>
      </section>

      <WaveDivider fill="#f8fafc" />

      {/* ── Live Solutions ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Available Now"
            title="Solutions ready to deploy."
            description="These products are live and helping teams right now."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {liveApps.map((app, i) => (
              <FadeIn key={app.id} delay={i * 0.1} direction="up">
                <GlassCard className="p-5 flex flex-col h-full sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <AppLogo name={app.name} size={40} />
                    <StatusBadge status={app.status} />
                  </div>
                  <h3 className="text-sm font-bold text-flacron-navy sm:text-base">{app.name}</h3>
                  <p className="mt-2 text-xs text-slate-500 flex-1 leading-relaxed sm:text-sm">{app.shortDescription}</p>
                  {app.metrics && (
                    <div className="mt-3 rounded-xl bg-orange-50 border border-orange-100 px-3 py-2.5 sm:mt-4 sm:px-4 sm:py-3">
                      <p className="text-base font-black text-[#F97316] sm:text-lg">{app.metrics.value}</p>
                      <p className="text-xs text-orange-600 font-medium">{app.metrics.label}</p>
                    </div>
                  )}
                  <Link href={`/apps/${app.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors sm:mt-4 sm:text-sm">
                    Get Started <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24 border-y border-slate-100">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What Our Customers Say"
            title="Real results, real businesses."
            description="Teams across industries are already transforming with Flacron."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.12} direction="up">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#F97316]/30 transition-all flex flex-col sm:p-6">
                  <Quote className="h-5 w-5 text-[#F97316]/40 mb-3 sm:h-6 sm:w-6 sm:mb-4" />
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#F97316] text-[#F97316] sm:h-3.5 sm:w-3.5" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-flacron-navy leading-tight">{t.name}</p>
                    {/* Split role and company so they render on two clean lines, no overflow */}
                    <p className="text-xs text-[#F97316] font-medium mt-0.5">{t.role}</p>
                    <p className="text-xs text-slate-400">{t.company}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Industries We Serve"
            title="Your industry, intelligently served."
            description="Flacron Enterprises builds focused solutions for the industries where AI makes the biggest difference."
            centered
          />
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-4">
            {industries.map(({ icon: Icon, ...ind }, i) => (
              <FadeIn key={ind.name} delay={i * 0.07} direction="up">
                <Link href="/industries"
                  className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center hover:border-[#F97316]/40 hover:shadow-md transition-all sm:p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F97316]/10 group-hover:bg-[#F97316]/20 transition-colors sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-[#F97316] sm:h-6 sm:w-6" />
                  </div>
                  <p className="mt-2.5 text-xs font-bold text-flacron-navy sm:mt-3 sm:text-sm">{ind.name}</p>
                  <p className="mt-1 text-[10px] text-slate-400 leading-snug sm:text-xs">{ind.desc}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Flacron — dark ── */}
      <section className="bg-flacron-navy py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="mx-auto max-w-7xl relative z-10">
          <SectionHeader
            eyebrow="Why Flacron"
            title="One company. One vision. Many solutions."
            description="We don't build disconnected tools. We build a connected ecosystem that grows with you."
            centered
            light
          />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {differentiators.map((d, i) => (
              <FadeIn key={d.title} delay={i * 0.08} direction="up">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] hover:border-white/20 transition-all sm:p-6">
                  <CheckCircle className="mb-3 h-5 w-5 text-[#F97316] sm:h-6 sm:w-6" />
                  <h3 className="text-sm font-bold text-white mb-1.5 sm:text-base">{d.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed sm:text-sm">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#FFF7ED" flip={false} />

      {/* ── Coming Soon teaser ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-14 bg-orange-50 border-y border-orange-100">
        <FadeIn direction="none">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3 sm:text-sm">Ecosystem Expanding</p>
            <h2 className="text-2xl font-black text-flacron-navy sm:text-3xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              More solutions are coming.
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto sm:text-base">
              We are actively building new AI products. Be first to hear about new launches.
            </p>
            <Link href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-sm sm:mt-6 sm:px-7 sm:py-3.5">
              Stay Updated <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            eyebrow="Get Started"
            title="Ready to transform your business?"
            description="Talk to our team, explore the ecosystem, or book a personalised demo today."
            centered
          />
          <FadeIn delay={0.15}>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link href="/ecosystem"
                className="ripple-btn w-full rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-[0_4px_20px_rgba(249,115,22,0.25)] text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Explore Ecosystem
              </Link>
              <Link href="/book-demo"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#F97316] hover:text-[#F97316] transition-colors text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Book a Demo
              </Link>
              <Link href="/contact"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#F97316] hover:text-[#F97316] transition-colors text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Talk to Sales
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
