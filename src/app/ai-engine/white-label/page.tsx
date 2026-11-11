import Link from "next/link";
import { ArrowLeft, Check, Layers, Palette, Server, Users, Shield, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { getApps } from "@/lib/apps-data";
import WhiteLabelEnquiryForm from "./WhiteLabelEnquiryForm";

const whatYouGet = [
  { icon: Palette, title: "Your Brand, Fully",       desc: "Completely white-labelled — your logo, colours, domain. No Flacron branding anywhere." },
  { icon: Server,  title: "Dedicated Infrastructure", desc: "Your own isolated AI cluster. No shared resources — guaranteed performance at scale." },
  { icon: Layers,  title: "Any Product, Customised",  desc: "We adapt any product in our ecosystem (or build new ones) to match your exact workflows." },
  { icon: Users,   title: "Embedded Team",            desc: "A dedicated Flacron team handles AI model updates, retraining, and support for your deployment." },
  { icon: Shield,  title: "Your Data Stays Yours",    desc: "On-premise or private cloud. Full data sovereignty — nothing leaves your environment." },
  { icon: Check,   title: "Revenue Share Available",  desc: "Reselling our technology? We offer revenue-share arrangements for partners and integrators." },
];

const useCases = [
  { title: "System Integrators",       desc: "Bundle Flacron AI into your existing software and resell to your client base." },
  { title: "Enterprise In-House",      desc: "Deploy a private AI platform inside your organisation under your brand and IT governance." },
  { title: "Industry Platforms",       desc: "Build a vertical SaaS product on top of Flacron AI and own the customer relationship." },
  { title: "Government & Public Sector", desc: "On-premise, air-gapped deployments that meet strict compliance and data residency rules." },
];

export default async function WhiteLabelPage() {
  const apps = await getApps();
  const productOptions = apps.map((a) => (a.category ? `${a.name} (${a.category})` : a.name));

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="band mt-4 overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page pb-14 pt-10 sm:pb-20 sm:pt-14">
          <Link href="/ai-engine" className="mb-8 inline-flex w-fit items-center gap-2 rounded-md text-sm text-band-muted transition-colors hover:text-white">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Back to AI Engine
          </Link>
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-[#ffb08a]">
              <Layers aria-hidden className="h-4 w-4" />
              Option 3 — White-Label Deployment
            </p>
            <h1 className="font-display text-[2.375rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              Our AI platform. Your product.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-band-muted">
              License the full Flacron AI stack — rebranded as your own, deployed on your infrastructure, and tailored to your industry and workflows. You keep the client relationship and revenue. We provide the intelligence.
            </p>
            <div className="mt-8">
              <a href="#enquiry-form" className="btn btn-primary btn-lg w-full sm:w-auto">
                Start Your Enquiry <ArrowRight aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="What's included" title="Everything you need to launch your AI product." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whatYouGet.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                  <Icon aria-hidden className="h-5 w-5 text-accent-text" />
                </div>
                <h3 className="font-display text-base font-semibold text-text">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who this is for ── */}
      <section className="section border-y border-border bg-surface-muted">
        <div className="container-page">
          <SectionHeader eyebrow="Who it's for" title="Built for partners and enterprises." />
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map(({ title, desc }) => (
              <div key={title} className="card flex items-start gap-4 p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                  <Check aria-hidden className="h-4 w-4 text-accent-text" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-text">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry form ── */}
      <section id="enquiry-form" className="section scroll-mt-20">
        <div className="container-page max-w-2xl">
          <SectionHeader
            eyebrow="Start the conversation"
            title="Tell us about your project."
            description="White-label engagements start at $25,000. We'll review your enquiry and schedule a scoping call within 2 business days."
          />
          <WhiteLabelEnquiryForm productOptions={productOptions} />
        </div>
      </section>

    </div>
  );
}
