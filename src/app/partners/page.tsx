import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import PageHero from "@/components/PageHero";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "Flacron Enterprises partners with Microsoft and IBM to deliver enterprise-grade AI solutions backed by world-class technology.",
  alternates: { canonical: "/partners" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Partners | Flacron Enterprises",
    url: "/partners",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Partners — Flacron Enterprises" }],
  },
  twitter: { card: "summary_large_image", title: "Partners | Flacron Enterprises", images: [OG_IMAGE] },
};

const partners = [
  {
    name: "Microsoft",
    logoInitial: "M",
    logoBg: "bg-[#0078D4]",
    type: "Technology Partner",
    description: "Flacron Enterprises is a Microsoft Partner, building on Azure's world-class cloud infrastructure, AI services, and security frameworks. Our products leverage Microsoft Copilot integrations, Azure OpenAI, and enterprise compliance tools.",
    benefits: ["Azure cloud infrastructure", "Microsoft 365 integrations", "Azure AI & Copilot capabilities", "Enterprise security compliance", "Microsoft Teams connectivity"],
  },
  {
    name: "IBM",
    logoInitial: "IBM",
    logoBg: "bg-[#1F70C1]",
    type: "Innovation Partner",
    description: "Through our IBM partnership, Flacron Enterprises accesses industry-leading AI research, enterprise consulting frameworks, and IBM's global network of technology innovation. Our platforms benefit from IBM Watson AI capabilities and enterprise integration tools.",
    benefits: ["IBM Watson AI integration", "Enterprise consulting frameworks", "Global technology network", "Industry-specific AI models", "Hybrid cloud deployment"],
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
    <div>
      <PageHero
        eyebrow="Partners & credentials"
        title="Built on world-class technology."
        description="Flacron Enterprises partners with the world's leading technology companies to ensure every product is enterprise-ready, secure, and backed by cutting-edge AI infrastructure."
      />

      {/* Partners */}
      <section className="section border-t border-border bg-surface-muted">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          {partners.map((p) => (
            <article key={p.name} className="card flex flex-col p-6 sm:p-9">
              <div className="mb-6 flex items-center gap-4">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${p.logoBg}`}>
                  <span aria-hidden className="text-sm font-black tracking-tight text-white">{p.logoInitial}</span>
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text">{p.name}</h2>
                  <span className="mt-1 inline-block rounded-full bg-info-soft px-2.5 py-0.5 text-xs font-semibold text-info">{p.type}</span>
                </div>
              </div>
              <p className="text-base leading-relaxed text-text-secondary">{p.description}</p>
              <div className="mt-7 border-t border-border pt-6">
                <h3 className="mb-3 text-sm font-semibold text-text">What this means for you</h3>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[15px] text-text-secondary">
                      <CheckCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="band section overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page">
          <SectionHeader eyebrow="Security & compliance" title="Enterprise standards in every product." light />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <li key={c.name} className="bg-band p-6">
                <ShieldCheck aria-hidden className="mb-4 h-6 w-6 text-[#ff8a55]" />
                <p className="font-display text-base font-semibold text-white">{c.name}</p>
                <p className="mt-1 text-sm text-band-muted">{c.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partnership interest CTA */}
      <section className="section">
        <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl">
              Interested in partnering with Flacron?
            </h2>
            <p className="mt-4 text-base text-text-secondary sm:text-lg">
              We welcome strategic partnerships, technology integrations, and channel partner opportunities.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto">
            Get In Touch <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
