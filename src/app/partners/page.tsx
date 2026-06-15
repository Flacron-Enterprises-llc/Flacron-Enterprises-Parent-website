import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Partners — Flacron Enterprises",
  description: "Flacron Enterprises partners with Microsoft and IBM to deliver enterprise-grade AI solutions backed by world-class technology.",
};

const partners = [
  {
    name: "Microsoft",
    logoInitial: "M",
    logoBg: "bg-[#0078D4]",
    type: "Technology Partner",
    description: "Flacron Enterprises is a Microsoft Partner, building on Azure's world-class cloud infrastructure, AI services, and security frameworks. Our products leverage Microsoft Copilot integrations, Azure OpenAI, and enterprise compliance tools.",
    benefits: ["Azure cloud infrastructure", "Microsoft 365 integrations", "Azure AI & Copilot capabilities", "Enterprise security compliance", "Microsoft Teams connectivity"],
    color: "border-blue-200 bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    name: "IBM",
    logoInitial: "IBM",
    logoBg: "bg-[#1F70C1]",
    type: "Innovation Partner",
    description: "Through our IBM partnership, Flacron Enterprises accesses industry-leading AI research, enterprise consulting frameworks, and IBM's global network of technology innovation. Our platforms benefit from IBM Watson AI capabilities and enterprise integration tools.",
    benefits: ["IBM Watson AI integration", "Enterprise consulting frameworks", "Global technology network", "Industry-specific AI models", "Hybrid cloud deployment"],
    color: "border-indigo-200 bg-indigo-50",
    badge: "bg-indigo-100 text-indigo-700",
  },
];

const certifications = [
  { name: "ISO 27001 Aligned", desc: "Information security management framework" },
  { name: "GDPR Compliant", desc: "European data protection standards" },
  { name: "SOC 2 Ready", desc: "Service organisation control reporting" },
  { name: "Enterprise Grade", desc: "Built for scale, reliability, and security" },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Partners & Credentials"
          title="Built on world-class technology."
          description="Flacron Enterprises partners with the world's leading technology companies to ensure every product is enterprise-ready, secure, and backed by cutting-edge AI infrastructure."
          centered
        />

        {/* Partners */}
        <div className="grid gap-6 lg:grid-cols-2 mb-16">
          {partners.map((p) => (
            <div key={p.name} className={`rounded-2xl border p-5 sm:p-8 ${p.color}`}>
              <div className="flex items-center gap-4 mb-5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${p.logoBg}`}>
                  <span className="text-sm font-black text-white tracking-tight">{p.logoInitial}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-flacron-navy">{p.name}</h2>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.badge}`}>{p.type}</span>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{p.description}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">What This Means for You</p>
                <ul className="space-y-2">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#F97316]" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="rounded-2xl bg-flacron-navy p-6 sm:p-10">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#F97316] mb-8">Security & Compliance</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <div key={c.name} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <CheckCircle className="mx-auto mb-3 h-6 w-6 text-[#F97316]" />
                <p className="text-sm font-bold text-white">{c.name}</p>
                <p className="mt-1 text-xs text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership interest CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-black text-flacron-navy mb-3" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
            Interested in partnering with Flacron?
          </h3>
          <p className="text-slate-500 mb-6 max-w-lg mx-auto">
            We welcome strategic partnerships, technology integrations, and channel partner opportunities.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#F97316] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors">
            Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
