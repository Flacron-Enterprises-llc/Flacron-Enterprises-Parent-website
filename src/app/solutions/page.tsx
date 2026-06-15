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
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Solutions"
          title="Find the right solution for your challenge."
          description="Each Flacron product is purpose-built to solve specific business problems. Browse by need to find your fit."
          centered
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutionCategories.map((cat) => {
            const catApps = apps.filter((a) => cat.apps.includes(a.slug));
            const Icon = cat.icon;
            return (
              <div key={cat.title} className={`rounded-2xl border p-5 sm:p-6 ${cat.color}`}>
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${cat.iconBg}`}>
                  <Icon className={`h-5 w-5 ${cat.iconColor}`} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-flacron-navy">{cat.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                <div className="mt-5 space-y-3">
                  {catApps.map((app) => (
                    <GlassCard key={app.id} className="p-4 flex items-center gap-3">
                      <AppLogo name={app.name} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-flacron-navy truncate">{app.name}</p>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="text-xs text-slate-500 truncate">{app.tagline}</p>
                      </div>
                      <Link href={`/apps/${app.slug}`} className="shrink-0 text-[#F97316] hover:text-[#EA580C]">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </GlassCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">{"Can't find what you're looking for?"}</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors">
            Talk to Our Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
