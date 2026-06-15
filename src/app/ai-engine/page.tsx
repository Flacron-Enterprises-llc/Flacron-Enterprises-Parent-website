import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Shield, BarChart3, Network, Cpu, Eye, MessageSquare, RefreshCw, Lock, Code2, Layers, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import GlassCard from "@/components/GlassCard";
import WaveDivider from "@/components/WaveDivider";

export const metadata: Metadata = {
  title: "Flacron AI Engine — The Intelligence Behind Every Product",
  description: "Discover the proprietary AI engine powering the entire Flacron Enterprises ecosystem. Built for accuracy, speed, and industry-specific reasoning.",
};

const capabilities = [
  { icon: Brain, title: "Industry-Specific LLMs", desc: "Fine-tuned language models trained on domain data — construction regulations, insurance policies, cybersecurity threat feeds." },
  { icon: Eye, title: "Computer Vision", desc: "Real-time image and video analysis for inspections, damage assessment, fraud detection, and document reading." },
  { icon: MessageSquare, title: "Conversational AI", desc: "Context-aware assistants with multi-turn memory, intent understanding, and seamless handoff to human agents." },
  { icon: BarChart3, title: "Predictive Analytics", desc: "Time-series forecasting, anomaly detection, and risk scoring models that turn historical data into decisions." },
  { icon: Network, title: "Knowledge Graph Engine", desc: "Connects entities across your business — clients, projects, documents, rules — to surface hidden insights." },
  { icon: RefreshCw, title: "Continuous Learning", desc: "Models improve with every interaction through RLHF feedback loops, keeping accuracy high as your business evolves." },
];

const pillars = [
  { icon: Zap,    title: "Speed",    value: "<200ms",       desc: "Average inference latency across all endpoints." },
  { icon: Shield, title: "Accuracy", value: "97.4%",        desc: "Task-specific accuracy across live deployments." },
  { icon: Lock,   title: "Privacy",  value: "SOC 2 Ready",  desc: "Zero data retention. Your data never trains shared models." },
  { icon: Cpu,    title: "Scale",    value: "10M+/day",     desc: "Enterprise-grade volume with auto-scaling infra." },
];

const products = [
  { name: "FlacronBuild",       ai: "Cost estimation AI, damage CV, compliance NLP",          slug: "flacronbuild" },
  { name: "FlacronConnect AI",  ai: "Lead scoring, conversation intelligence, outreach gen",   slug: "flacronconnect-ai" },
  { name: "RapidClaimPro",      ai: "Fraud detection, document OCR, claims triage",            slug: "rapidclaimpro" },
  { name: "FlacronSecure AI",   ai: "Threat classification, anomaly detection, dark web NLP",  slug: "flacronsecure-ai" },
  { name: "FlacronSport",       ai: "Fan sentiment, AI content generation, performance stats", slug: "flacronsport" },
  { name: "Tchitaka Growth",    ai: "Behavioural patterns, personalised coaching, habit AI",   slug: "beingtchitaka" },
];

const architecture = [
  { step: "01", title: "Data Ingestion",      desc: "Structured and unstructured data enters via secure APIs, SDKs, or native integrations." },
  { step: "02", title: "Pre-processing",      desc: "Normalisation, deduplication, and enrichment pipelines prepare data for model consumption." },
  { step: "03", title: "Model Routing",       desc: "An orchestration layer selects the optimal model (LLM, CV, forecasting) based on task type." },
  { step: "04", title: "Inference & Reasoning", desc: "Domain-specific AI models generate results with confidence scores and explainability traces." },
  { step: "05", title: "Output Delivery",     desc: "Results are delivered via real-time streams or webhooks directly into the product experience." },
];

export default function AIEnginePage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-flacron-navy px-4 pt-20 pb-14 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_80%,rgba(249,115,22,0.12)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-[#F97316] sm:text-sm">
              <Brain className="h-3.5 w-3.5" />
              Proprietary AI Infrastructure
            </span>
          </div>

          <h1
            className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Intelligence<br />
            <span className="text-[#F97316]">Behind Everything.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 leading-relaxed sm:mt-6 sm:text-base lg:text-lg">
            Flacron AI Engine is the proprietary platform powering every product in our ecosystem —
            built for industry-specific reasoning, real-time inference, and enterprise-grade reliability.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/book-demo"
              className="ripple-btn inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors shadow-[0_4px_20px_rgba(249,115,22,0.35)] sm:px-8 sm:py-4">
              Request AI Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/ecosystem"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition-colors sm:px-8 sm:py-4">
              See Products Using It
            </Link>
          </div>

          {/* Pillar stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4">
            {pillars.map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm sm:p-5">
                <Icon className="mx-auto mb-2 h-4 w-4 text-[#F97316] sm:h-5 sm:w-5 sm:mb-3" />
                <p className="text-lg font-black text-white sm:text-2xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>{value}</p>
                <p className="text-[10px] font-semibold text-[#F97316] uppercase tracking-wider mt-0.5 sm:text-xs">{title}</p>
                <p className="mt-1 hidden text-xs text-slate-400 leading-snug sm:block">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#ffffff" />

      {/* ── Core Capabilities ── */}
      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core Capabilities"
            title="AI built for real-world complexity."
            description="Six foundational AI capabilities that power every Flacron product across every industry."
            centered
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <GlassCard key={title} className="p-5 sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 sm:mb-4 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 text-[#F97316]" />
                </div>
                <h3 className="text-sm font-bold text-flacron-navy mb-1.5 sm:text-base sm:mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed sm:text-sm">{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-24 border-y border-slate-100">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How It Works"
            title="From data to decision in milliseconds."
            description="A five-layer pipeline that transforms raw business data into actionable AI-driven intelligence."
            centered
          />
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/30 via-[#F97316]/60 to-transparent hidden sm:block sm:left-8" />
            <div className="space-y-3 sm:space-y-4">
              {architecture.map(({ step, title, desc }) => (
                <div key={step} className="relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-[#F97316]/30 hover:shadow-md transition-all sm:gap-6 sm:p-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#F97316]/30 bg-orange-50 sm:h-12 sm:w-12">
                    <span className="text-xs font-black text-[#F97316]">{step}</span>
                  </div>
                  <div className="pt-1 sm:pt-0">
                    <h3 className="text-sm font-bold text-flacron-navy sm:text-base">{title}</h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed sm:text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Per Product ── */}
      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="AI Across the Ecosystem"
            title="Every product. Powered by the engine."
            description="See exactly which AI capabilities are deployed inside each Flacron product."
            centered
          />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {products.map(({ name, ai, slug }) => (
              <Link key={slug} href={`/apps/${slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F97316]/40 hover:shadow-md transition-all sm:p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#F97316]/10 sm:h-10 sm:w-10">
                  <Brain className="h-4 w-4 text-[#F97316] sm:h-5 sm:w-5" />
                </div>
                <h3 className="text-sm font-bold text-flacron-navy mb-1.5 group-hover:text-[#F97316] transition-colors">{name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{ai}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#F97316]">
                  View product <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Ways to Access ── */}
      <section className="bg-orange-50 border-y border-orange-100 py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Get Access"
            title="Two ways to use the Flacron AI Engine."
            description="Whether you want to call our API directly or deploy a fully branded version — we have a path for you."
            centered
          />
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Option 2 — API */}
            <div className="flex flex-col rounded-2xl border border-orange-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#F97316]/50 transition-all sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F97316]/10 mb-4 sm:h-12 sm:w-12 sm:mb-5">
                <Code2 className="h-5 w-5 text-[#F97316] sm:h-6 sm:w-6" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#F97316]">Option 2</p>
              <h3 className="text-lg font-black text-flacron-navy mb-2 sm:text-xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>API Platform Access</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 sm:mb-5">
                Call our AI endpoints directly from your own product. Industry-trained models for language, vision, scoring, and prediction — on a simple REST API. Plans from $299/month.
              </p>
              <ul className="space-y-2 mb-5 flex-1 sm:mb-6">
                {["50K–unlimited API calls/month", "12 AI model endpoints", "Sub-200ms inference", "Zero data retention"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-[#F97316] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/ai-engine/api-access"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors">
                Apply for API Access <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Option 3 — White-Label */}
            <div className="flex flex-col rounded-2xl border border-orange-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-[#F97316]/50 transition-all sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-flacron-navy/5 mb-4 sm:h-12 sm:w-12 sm:mb-5">
                <Layers className="h-5 w-5 text-flacron-navy sm:h-6 sm:w-6" />
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-flacron-navy">Option 3</p>
              <h3 className="text-lg font-black text-flacron-navy mb-2 sm:text-xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>White-Label Deployment</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 sm:mb-5">
                License the full Flacron AI stack under your brand. Deployed on your infrastructure, customised to your workflows, with a dedicated team. Starts at $25,000.
              </p>
              <ul className="space-y-2 mb-5 flex-1 sm:mb-6">
                {["Your brand, your domain", "Dedicated AI infrastructure", "Custom model training", "Revenue-share available"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-flacron-navy shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/ai-engine/white-label"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-flacron-navy bg-white px-5 py-3 text-sm font-semibold text-flacron-navy hover:bg-flacron-navy hover:text-white transition-colors">
                Start White-Label Enquiry <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust & Security ── */}
      <section className="bg-flacron-navy py-12 px-4 sm:px-6 sm:py-20 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3 sm:text-sm sm:mb-4">Enterprise Trust</p>
          <h2 className="text-2xl font-black text-white sm:text-3xl sm:mb-4 mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            AI you can trust at scale.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto sm:text-base sm:mb-8 lg:text-lg">
            Built on Microsoft and IBM infrastructure with ISO 27001-aligned practices, SOC 2-ready architecture, and zero-data-retention by default.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Microsoft Azure AI", "IBM watsonx", "ISO 27001 Aligned", "SOC 2 Ready", "GDPR Compliant", "Zero Data Retention"].map((b) => (
              <span key={b} className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 sm:px-4 sm:py-2 sm:text-sm">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link href="/book-demo"
              className="ripple-btn rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors text-center sm:px-8 sm:py-4">
              Request AI Demo
            </Link>
            <Link href="/contact"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors text-center sm:px-8 sm:py-4">
              Talk to Our AI Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
