import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, TrendingUp, Shield, Lock, Trophy, Leaf } from "lucide-react";
import { getApps } from "@/lib/apps-data";

export const revalidate = 60;
import SectionHeader from "@/components/SectionHeader";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";
import GlassCard from "@/components/GlassCard";

export const metadata: Metadata = {
  title: "Solutions — Flacron Enterprises",
  description: "Explore Flacron Enterprises solutions by business need. Find the right AI-powered tool for your challenge.",
};

const solutionCategories = [
  {
    title: "Construction & Property",
    description: "AI estimation, project management, compliance tracking, and insurance integration for the built environment.",
    apps: ["flacronbuild"],
    icon: Building2,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    color: "bg-amber-50 border-amber-200",
  },
  {
    title: "Business Growth & Sales",
    description: "Intelligent lead generation, automated outreach, and CRM to help businesses grow faster.",
    apps: ["flacronconnect-ai"],
    icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    color: "bg-blue-50 border-blue-200",
  },
  {
    title: "Insurance & Claims",
    description: "End-to-end claims automation, fraud detection, and policyholder self-service for modern insurers.",
    apps: ["rapidclaimpro"],
    icon: Shield,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    color: "bg-green-50 border-green-200",
  },
  {
    title: "Cybersecurity & Compliance",
    description: "AI-powered threat detection, vulnerability scanning, and compliance automation for enterprise teams.",
    apps: ["flacronsecure-ai"],
    icon: Lock,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
    color: "bg-slate-50 border-slate-200",
  },
  {
    title: "Sports & Fan Engagement",
    description: "AI content creation, fan community management, and athlete brand tools for sports organisations.",
    apps: ["flacronsport"],
    icon: Trophy,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    color: "bg-orange-50 border-orange-200",
  },
  {
    title: "Personal Growth & Coaching",
    description: "Guided development programmes, habit intelligence, and community mentorship for modern professionals.",
    apps: ["beingtchitaka"],
    icon: Leaf,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    color: "bg-purple-50 border-purple-200",
  },
];

export default async function SolutionsPage() {
  const apps = await getApps();
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Solutions"
          title="Find the right solution for your challenge."
          description="Each Flacron product is purpose-built to solve specific business problems. Browse by need to find your fit."
          centered
        />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutionCategories.map((cat) => {
            const catApps = apps.filter((a) => cat.apps.includes(a.slug));
            const Icon = cat.icon;
            return (
              <div key={cat.title} className={`flex flex-col rounded-2xl border p-4 sm:p-6 ${cat.color}`}>
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${cat.iconBg}`}>
                  <Icon className={`h-5 w-5 ${cat.iconColor}`} />
                </div>
                <h3 className="mt-3 text-base font-bold text-flacron-navy sm:mt-4 sm:text-lg">{cat.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                <div className="mt-auto pt-4 space-y-3 sm:pt-5">
                  {catApps.map((app) => (
                    <GlassCard key={app.id} className="p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <AppLogo name={app.name} size={34} />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <p className="text-sm font-bold text-flacron-navy">{app.name}</p>
                            <StatusBadge status={app.status} />
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{app.tagline}</p>
                        </div>
                        <Link href={`/apps/${app.slug}`} className="shrink-0 text-[#FE4705] hover:text-[#D83C04]">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-2xl bg-flacron-navy px-6 py-10 text-center sm:px-12 sm:py-14">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(254, 71, 5,0.15)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(37,99,235,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10">
              <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#FE4705] mb-4">
                Custom Solutions
              </span>
              <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {"Can't find what you're looking for?"}
              </h2>
              <p className="mt-3 mx-auto max-w-xl text-sm text-slate-400 leading-relaxed sm:text-base">
                Our team works with businesses to design custom AI solutions beyond our standard product catalogue. Tell us your challenge and we&apos;ll find a way.
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors shadow-[0_4px_20px_rgba(254, 71, 5,0.3)] sm:w-auto">
                  Talk to Our Team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/book-demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors sm:w-auto">
                  Book a Demo
                </Link>
              </div>

              {/* Trust line */}
              <p className="mt-6 text-xs text-slate-500">
                Microsoft Partner · IBM Certified · Responds within 1 business day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
