import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Shield, BarChart3, Network, Cpu, Eye, MessageSquare, RefreshCw, Lock, Code2, Layers, Check } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import AppLogo from "@/components/AppLogo";
import { getApps } from "@/lib/apps-data";
import { SITE_NAME, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Flacron AI Engine — The Intelligence Behind Every Product",
  description: "Discover the proprietary AI engine powering the entire Flacron Enterprises ecosystem. Built for accuracy, speed, and industry-specific reasoning.",
  alternates: { canonical: "/ai-engine" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Flacron AI Engine — The Intelligence Behind Every Product | Flacron Enterprises",
    url: "/ai-engine",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Flacron AI Engine — The Intelligence Behind Every Product" }],
  },
  twitter: { card: "summary_large_image", title: "Flacron AI Engine — The Intelligence Behind Every Product | Flacron Enterprises", images: [OG_IMAGE] },
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
  { icon: Zap,    title: "Speed",    value: "Low latency",  desc: "Fast inference across all endpoints." },
  { icon: Shield, title: "Accuracy", value: "Task-tuned",   desc: "Models tuned to each product's specific tasks." },
  { icon: Lock,   title: "Privacy",  value: "SOC 2 Ready",  desc: "Zero data retention. Your data never trains shared models." },
  { icon: Cpu,    title: "Scale",    value: "Auto-scaling", desc: "Enterprise-grade volume with auto-scaling infra." },
];

/**
 * Which engine capabilities each product uses — optional copy keyed by catalog slug. Every product the catalog
 * returns is listed; products without an entry here are summarised from their own feature list.
 */
const aiByProduct: Record<string, string> = {
  flacronbuild: "Cost estimation AI, damage CV, compliance NLP",
  flacronsport: "Fan sentiment, AI content generation, performance stats",
  beingtchitaka: "Behavioural patterns, personalised coaching, habit AI",
};

const architecture = [
  { step: "01", title: "Data Ingestion",      desc: "Structured and unstructured data enters via secure APIs, SDKs, or native integrations." },
  { step: "02", title: "Pre-processing",      desc: "Normalisation, deduplication, and enrichment pipelines prepare data for model consumption." },
  { step: "03", title: "Model Routing",       desc: "An orchestration layer selects the optimal model (LLM, CV, forecasting) based on task type." },
  { step: "04", title: "Inference & Reasoning", desc: "Domain-specific AI models generate results with confidence scores and explainability traces." },
  { step: "05", title: "Output Delivery",     desc: "Results are delivered via real-time streams or webhooks directly into the product experience." },
];

export default async function AIEnginePage() {
  const apps = await getApps();
  const products = apps.map((a) => ({
    name: a.name,
    slug: a.slug,
    logoUrl: a.logoUrl,
    ai: aiByProduct[a.slug] ?? (a.features?.length ? a.features.slice(0, 3).map((f) => f.title).join(", ") : a.tagline),
  }));

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="band mt-4 overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page pb-16 pt-12 sm:pb-24 sm:pt-16">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-[#ffb08a]">
              <Brain aria-hidden className="h-4 w-4" />
              Proprietary AI Infrastructure
            </p>

            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
              The Intelligence Behind Everything.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-band-muted">
              Flacron AI Engine is the proprietary platform powering every product in our ecosystem —
              built for industry-specific reasoning, real-time inference, and enterprise-grade reliability.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/book-demo" className="btn btn-primary btn-lg">
                Request AI Demo <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/ecosystem" className="btn btn-on-band btn-lg">
                See Products Using It
              </Link>
            </div>

            <p className="mt-6 text-sm text-band-muted">
              Already have API access?{" "}
              <Link href="/ai-engine/login" className="font-semibold text-[#ff8a55] underline-offset-4 hover:underline">Sign in with your API key</Link>
            </p>
          </div>

          {/* Pillar stats */}
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, value, desc }) => (
              <div key={title} className="bg-[#04122b] p-5 sm:p-6">
                <dt className="flex items-center gap-2 text-sm font-medium text-[#ffb08a]">
                  <Icon aria-hidden className="h-4 w-4" />
                  {title}
                </dt>
                <dd className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">{value}</dd>
                <dd className="mt-1.5 hidden text-sm leading-snug text-band-muted sm:block">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Core Capabilities ── */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="Core capabilities"
            title="AI built for real-world complexity."
            description="Six foundational AI capabilities that power every Flacron product across every industry."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Architecture ── */}
      <section className="section border-y border-border bg-surface-muted">
        <div className="container-page">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <SectionHeader
              eyebrow="How it works"
              title="From data to decision, fast."
              description="A five-layer pipeline that transforms raw business data into actionable AI-driven intelligence."
              className="lg:sticky lg:top-28 lg:self-start"
            />
            <ol className="relative space-y-3">
              {architecture.map(({ step, title, desc }) => (
                <li key={step} className="card relative flex items-start gap-4 p-4 sm:gap-5 sm:p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-soft font-display text-sm font-semibold text-accent-text sm:h-11 sm:w-11">
                    {step}
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <h3 className="font-display text-base font-semibold text-text">{title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-text-secondary">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── AI Per Product ── */}
      {products.length > 0 && (
        <section className="section">
          <div className="container-page">
            <SectionHeader
              eyebrow="AI across the ecosystem"
              title="Every product. Powered by the engine."
              description="See exactly which AI capabilities are deployed inside each Flacron product."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map(({ name, ai, slug, logoUrl }) => (
                <Link key={slug} href={`/apps/${slug}`} className="card card-interactive group flex flex-col p-6">
                  <AppLogo name={name} logoUrl={logoUrl} size={40} />
                  <h3 className="mt-4 font-display text-base font-semibold text-text group-hover:text-accent-text">{name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-secondary">{ai}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-text">
                    View product <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Two Ways to Access ── */}
      <section className="section border-y border-border bg-surface-muted">
        <div className="container-page">
          <SectionHeader
            eyebrow="Get access"
            title="Two ways to use the Flacron AI Engine."
            description="Whether you want to call our API directly or deploy a fully branded version — we have a path for you."
          />
          <div className="grid gap-5 md:grid-cols-2">

            {/* Option 2 — API */}
            <div className="card flex flex-col border-accent-border p-6 sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft">
                <Code2 aria-hidden className="h-6 w-6 text-accent-text" />
              </div>
              <p className="mb-1 text-sm font-semibold text-accent-text">Option 2</p>
              <h3 className="font-display text-xl font-semibold text-text sm:text-2xl">API Platform Access</h3>
              <p className="mb-5 mt-2 text-[15px] leading-relaxed text-text-secondary">
                Call our AI endpoints directly from your own product. Industry-trained models for language, vision, scoring, and prediction — on a simple REST API. Plans from $299/month.
              </p>
              <ul className="mb-7 flex-1 space-y-2.5">
                {["50K–unlimited API calls/month", "12 AI model endpoints", "Fast inference", "Zero data retention"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[15px] text-text">
                    <Check aria-hidden className="h-4 w-4 shrink-0 text-accent-text" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/ai-engine/api-access" className="btn btn-primary">
                Apply for API Access <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            {/* Option 3 — White-Label */}
            <div className="card flex flex-col p-6 sm:p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-info-soft">
                <Layers aria-hidden className="h-6 w-6 text-info" />
              </div>
              <p className="mb-1 text-sm font-semibold text-info">Option 3</p>
              <h3 className="font-display text-xl font-semibold text-text sm:text-2xl">White-Label Deployment</h3>
              <p className="mb-5 mt-2 text-[15px] leading-relaxed text-text-secondary">
                License the full Flacron AI stack under your brand. Deployed on your infrastructure, customised to your workflows, with a dedicated team. Starts at $25,000.
              </p>
              <ul className="mb-7 flex-1 space-y-2.5">
                {["Your brand, your domain", "Dedicated AI infrastructure", "Custom model training", "Revenue-share available"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-[15px] text-text">
                    <Check aria-hidden className="h-4 w-4 shrink-0 text-info" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/ai-engine/white-label" className="btn btn-secondary">
                Start White-Label Enquiry <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust & Security ── */}
      <section className="section band overflow-hidden">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold text-[#ff8a55]">Enterprise trust</p>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            AI you can trust at scale.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-band-muted sm:text-lg">
            Built on Microsoft and IBM infrastructure with ISO 27001-aligned practices, SOC 2-ready architecture, and zero-data-retention by default.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {["Microsoft Azure AI", "IBM watsonx", "ISO 27001 Aligned", "SOC 2 Ready", "GDPR Compliant", "Zero Data Retention"].map((b) => (
              <li key={b} className="rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-white/90">
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <Link href="/book-demo" className="btn btn-primary btn-lg">
              Request AI Demo
            </Link>
            <Link href="/contact" className="btn btn-on-band btn-lg">
              Talk to Our AI Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
