import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Shield, Briefcase, Lock, Trophy, Leaf } from "lucide-react";
import { getApps } from "@/lib/apps-data";

export const revalidate = 60;
import SectionHeader from "@/components/SectionHeader";
import AppLogo from "@/components/AppLogo";
import StatusBadge from "@/components/StatusBadge";

export const metadata: Metadata = {
  title: "Industries — Flacron Enterprises",
  description: "Flacron Enterprises builds AI solutions for construction, insurance, cybersecurity, sports, business, and personal development.",
};

const industries = [
  {
    name: "Construction & Property",
    icon: Building2,
    description: "The construction industry loses billions annually to inaccurate estimates, poor communication, and compliance failures. Our AI platforms bring precision, automation, and real-time visibility to every project.",
    challenges: ["Manual and inaccurate cost estimation", "Disconnected stakeholder communication", "Compliance and permit management overhead", "Slow insurance claim resolution"],
    apps: ["flacronbuild", "rapidclaimpro"],
  },
  {
    name: "Insurance",
    icon: Shield,
    description: "Insurance operations are burdened by paper-heavy processes, rising fraud, and policyholder expectations for instant digital experiences. We digitise and automate the full claims lifecycle.",
    challenges: ["Slow and manual claims processing", "Rising fraudulent claim rates", "High cost per claim", "Poor policyholder experience"],
    apps: ["rapidclaimpro", "flacronbuild"],
  },
  {
    name: "Business & Sales",
    icon: Briefcase,
    description: "Growing businesses struggle with inconsistent follow-up, underused CRM tools, and sales teams spending too much time on admin. Our AI growth platform automates the journey from lead to close.",
    challenges: ["Inconsistent lead follow-up", "Low CRM adoption", "Sales admin overhead", "Unpredictable revenue forecasting"],
    apps: ["flacronconnect-ai"],
  },
  {
    name: "Cybersecurity",
    icon: Lock,
    description: "Cyber threats evolve faster than most security teams can respond. We give organisations the AI intelligence and automation to detect, respond, and stay compliant — without burning out their team.",
    challenges: ["Alert fatigue from too many signals", "Manual compliance reporting", "Slow incident detection and response", "Dark web exposure monitoring"],
    apps: ["flacronsecure-ai"],
  },
  {
    name: "Sports & Media",
    icon: Trophy,
    description: "Sports organisations struggle to keep fans engaged beyond matchdays while athletes lack tools for direct-to-fan relationships. We build the infrastructure for modern sports engagement.",
    challenges: ["Low fan engagement between events", "Manual content production costs", "Limited athlete monetisation tools", "Fragmented fan community management"],
    apps: ["flacronsport"],
  },
  {
    name: "Personal Development",
    icon: Leaf,
    description: "The personal development industry is full of content but short on structured, accountable transformation. We combine AI, coaching frameworks, and community to drive real change.",
    challenges: ["Lack of structure and accountability", "Fragmented tools and coaches", "Low habit formation success rates", "Missing peer community support"],
    apps: ["beingtchitaka"],
  },
];

export default async function IndustriesPage() {
  const apps = await getApps();
  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Industries"
          title="Solving real problems in the right industries."
          description="Every Flacron product is built around deep industry understanding — not generic software adapted to fit."
          centered
        />

        <div className="space-y-5">
          {industries.map((ind) => {
            const relatedApps = apps.filter((a) => ind.apps.includes(a.slug));
            const Icon = ind.icon;
            return (
              <div key={ind.name} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                <div className="grid lg:grid-cols-3">
                  {/* Left info */}
                  <div className="p-5 sm:p-8 lg:col-span-2 border-b border-slate-100 lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F97316]/10">
                        <Icon className="h-5 w-5 text-[#F97316]" />
                      </div>
                      <h2 className="text-xl font-bold text-flacron-navy">{ind.name}</h2>
                    </div>
                    <p className="text-slate-500 leading-relaxed mb-6">{ind.description}</p>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Key Challenges We Address</p>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {ind.challenges.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-sm text-slate-600">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F97316]" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Right apps */}
                  <div className="p-5 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Relevant Products</p>
                    <div className="space-y-3">
                      {relatedApps.map((app) => (
                        <Link key={app.id} href={`/apps/${app.slug}`}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:border-[#F97316]/30 hover:bg-orange-50/50 transition-all group">
                          <AppLogo name={app.name} size={36} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-flacron-navy truncate">{app.name}</p>
                              <StatusBadge status={app.status} />
                            </div>
                            <p className="text-xs text-slate-400 truncate">{app.tagline}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#F97316] transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
