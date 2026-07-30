import Link from "next/link";
import { ArrowRight, CheckCircle, Search, Rocket, BarChart3, Star, Quote, Building2, Shield, Briefcase, Lock, Trophy, Leaf, Sparkles, MessageSquareText, CalendarCheck } from "lucide-react";
import { getApps } from "@/lib/apps-data";
import HeroSection from "@/components/HeroSection";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import WaveDivider from "@/components/WaveDivider";
import FadeIn from "@/components/FadeIn";
import FaqAccordion from "@/components/FaqAccordion";
import ROICalculator from "@/components/ROICalculator";
import TrackedLink from "@/components/TrackedLink";
import PartnerBadges from "@/components/PartnerBadges";
import CountUp from "@/components/CountUp";

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
  const liveApps = apps.filter((a) => a.status === "live").slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* ── Ask Flacron — interactive hook ── */}
      <section className="relative overflow-hidden bg-black py-12 px-4 sm:px-6 lg:px-8 sm:py-16">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="mx-auto max-w-3xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              Tell us what you need.{" "}
              <span className="text-[#FE4705]">We&apos;ll show you the AI for it.</span>
            </h2>
            <Link
              href="/ecosystem"
              className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-left text-sm text-slate-300 hover:border-[#FE4705]/50 hover:bg-white/[0.08] transition-colors sm:mt-8 sm:px-6 sm:py-5 sm:text-base"
            >
              <Search className="h-5 w-5 shrink-0 text-[#FE4705]" />
              Search the ecosystem — try &ldquo;construction&rdquo; or &ldquo;lead generation&rdquo;
            </Link>
          </FadeIn>
          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            {quickActions.map(({ label, href, icon: Icon }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                <Link
                  href={href}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:border-[#FE4705] hover:text-[#FE4705] transition-colors sm:w-auto sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="border-y border-slate-100 bg-white py-8 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted Technologies &amp; Partnerships
          </p>
          <FadeIn>
            <PartnerBadges />
          </FadeIn>
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
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FE4705]/30 transition-all sm:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FE4705]/10 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 text-[#FE4705] sm:h-6 sm:w-6" />
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
                      <p className="text-base font-black text-[#FE4705] sm:text-lg">{app.metrics.value}</p>
                      <p className="text-xs text-orange-600 font-medium">{app.metrics.label}</p>
                    </div>
                  )}
                  <Link href={`/apps/${app.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FE4705] hover:text-[#D83C04] transition-colors sm:mt-4 sm:text-sm">
                    Get Started <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI Calculator ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Calculate Your Impact"
            title="How much could AI save your team?"
            description="Move the sliders to see an estimate based on your team size and current manual workload."
            centered
          />
          <FadeIn>
            <ROICalculator />
          </FadeIn>
        </div>
      </section>

      {/* ── Stats / Social Proof banner ── */}
      <section className="bg-[#FE4705] py-10 px-4 sm:px-6 lg:px-8 sm:py-14">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-5xl font-black text-white sm:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              <CountUp value="9+" /> AI Products. One Ecosystem.
            </p>
            <p className="mt-3 text-sm text-orange-100 sm:text-base">
              Businesses across six industries already run on Flacron&apos;s AI ecosystem.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <TrackedLink href="/ecosystem" event="cta_see_all_solutions_stats"
                className="w-full rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900 transition-colors text-center sm:w-auto sm:px-7 sm:py-3.5">
                See All Solutions
              </TrackedLink>
              <TrackedLink href="/book-demo" event="cta_book_demo_stats"
                className="w-full rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#FE4705] transition-colors text-center sm:w-auto sm:px-7 sm:py-3.5">
                Book a Demo
              </TrackedLink>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24 border-b border-slate-100">
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
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#FE4705]/30 transition-all flex flex-col sm:p-6">
                  <Quote className="h-5 w-5 text-[#FE4705]/40 mb-3 sm:h-6 sm:w-6 sm:mb-4" />
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#FE4705] text-[#FE4705] sm:h-3.5 sm:w-3.5" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-flacron-navy leading-tight">{t.name}</p>
                    {/* Split role and company so they render on two clean lines, no overflow */}
                    <p className="text-xs text-[#FE4705] font-medium mt-0.5">{t.role}</p>
                    <p className="text-xs text-slate-400">{t.company}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
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
                <TrackedLink href="/industries" event="industry_tile_click" eventData={{ industry: ind.name }}
                  className="group flex flex-col items-center rounded-2xl bg-black p-4 text-center hover:bg-[#FE4705] transition-colors sm:p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 group-hover:bg-black/15 transition-colors sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5 text-[#FE4705] group-hover:text-white sm:h-6 sm:w-6" />
                  </div>
                  <p className="mt-2.5 text-xs font-bold text-white sm:mt-3 sm:text-sm">{ind.name}</p>
                  <p className="mt-1 text-[10px] text-slate-400 group-hover:text-orange-100 leading-snug sm:text-xs">{ind.desc}</p>
                </TrackedLink>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Flacron — dark ── */}
      <section className="bg-black py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24 relative overflow-hidden">
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
                  <CheckCircle className="mb-3 h-5 w-5 text-[#FE4705] sm:h-6 sm:w-6" />
                  <h3 className="text-sm font-bold text-white mb-1.5 sm:text-base">{d.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed sm:text-sm">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#FE4705" flip={false} />

      {/* ── Coming Soon teaser ── */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 sm:py-14 bg-[#FE4705]">
        <FadeIn direction="none">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-black mb-3 sm:text-sm">Ecosystem Expanding</p>
            <h2 className="text-2xl font-black text-white sm:text-3xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
              More solutions are coming.
            </h2>
            <p className="mt-3 text-sm text-orange-100 max-w-md mx-auto sm:text-base">
              We are actively building new AI products. Be first to hear about new launches.
            </p>
            <TrackedLink href="/contact" event="cta_stay_updated"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-900 transition-colors shadow-sm sm:mt-6 sm:px-7 sm:py-3.5">
              Stay Updated <ArrowRight className="h-4 w-4" />
            </TrackedLink>
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
            <p className="text-xs font-semibold text-slate-400 mb-4 sm:text-sm">
              No long contracts. No disruption to your current stack. Live in days.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <TrackedLink href="/ecosystem" event="cta_explore_ecosystem_final"
                className="ripple-btn w-full rounded-xl bg-[#FE4705] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors shadow-[0_4px_20px_rgba(254, 71, 5,0.25)] text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Explore Ecosystem
              </TrackedLink>
              <TrackedLink href="/book-demo" event="cta_book_demo_final"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#FE4705] hover:text-[#FE4705] transition-colors text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Book a Demo
              </TrackedLink>
              <TrackedLink href="/contact" event="cta_talk_to_sales_final"
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-flacron-navy hover:border-[#FE4705] hover:text-[#FE4705] transition-colors text-center sm:w-auto sm:px-8 sm:py-4 sm:text-base">
                Talk to Sales
              </TrackedLink>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 sm:py-16 lg:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered."
            description="Everything you need to know before getting started with Flacron."
            centered
          />
          <FadeIn delay={0.1}>
            <FaqAccordion items={faqs} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
