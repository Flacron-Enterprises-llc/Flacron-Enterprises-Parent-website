"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Code2, BarChart3, Lock, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    per: "/month",
    calls: "50,000 API calls/mo",
    desc: "For startups and small teams exploring AI integration.",
    features: ["5 AI model endpoints", "Standard inference speed", "JSON + webhook output", "Email support", "99.5% uptime SLA"],
    highlight: false,
  },
  {
    name: "Growth",
    price: "$999",
    per: "/month",
    calls: "250,000 API calls/mo",
    desc: "For growing businesses that need reliable AI at scale.",
    features: ["All 12 AI model endpoints", "Priority inference", "Streaming + webhook output", "Slack & email support", "99.9% uptime SLA", "Custom prompt tuning"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    calls: "Unlimited",
    desc: "Dedicated infrastructure for large-scale deployments.",
    features: ["All endpoints + custom models", "Dedicated inference cluster", "Real-time + batch processing", "Dedicated account manager", "99.99% uptime SLA", "On-premise option"],
    highlight: false,
  },
];

const capabilities = [
  { icon: Code2,    title: "REST API",           desc: "Simple JSON API — integrate in minutes with any stack." },
  { icon: Zap,      title: "Real-time Inference", desc: "Fast responses for completions, classification, scoring." },
  { icon: BarChart3, title: "Industry Models",    desc: "Construction, insurance, cybersecurity, and sales models." },
  { icon: Lock,     title: "Zero Retention",      desc: "Payloads never stored or used to train shared models." },
];

export default function APIAccessPage() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    useCase: "", callVolume: "", message: "", tier: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: `API Access – ${form.tier || "Unspecified tier"}`,
          source: "api-access",
        }),
      });
    } catch { /* silent */ }
    setState("success");
  }

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
              <Code2 aria-hidden className="h-4 w-4" />
              Option 2 — API Platform Access
            </p>
            <h1 className="font-display text-[2.375rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              Add AI to your product. Without building it.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-band-muted">
              Call our AI endpoints directly from your codebase. Industry-trained models for language, vision, prediction, and scoring — all via a simple REST API. You ship the feature, we run the intelligence.
            </p>
          </div>

          {/* Capability cards */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-col">
                <Icon aria-hidden className="h-5 w-5 shrink-0 text-[#ff8a55]" />
                <div>
                  <p className="font-display text-[15px] font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-snug text-band-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section className="section border-b border-border bg-surface-muted">
        <div className="container-page">
          <SectionHeader eyebrow="Pricing" title="Pick the plan that fits." />
          <div className="grid gap-5 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "card relative flex flex-col p-6 sm:p-7",
                  tier.highlight && "border-accent shadow-lg ring-1 ring-accent"
                )}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-cta px-3 py-1 text-xs font-semibold text-on-cta">Most popular</span>
                )}
                <p className="font-display text-lg font-semibold text-text">{tier.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <p className="font-display text-4xl font-semibold tracking-[-0.03em] text-text">{tier.price}</p>
                  {tier.per && <p className="mb-1 text-sm text-text-muted">{tier.per}</p>}
                </div>
                <p className="mt-1 text-sm font-semibold text-accent-text">{tier.calls}</p>
                <p className="mb-5 mt-3 text-[15px] leading-relaxed text-text-secondary">{tier.desc}</p>
                <ul className="flex-1 space-y-2.5 border-t border-border pt-5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-text">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application form ── */}
      <section className="section">
        <div className="container-page max-w-2xl">
          <SectionHeader
            eyebrow="Request access"
            title="Apply for API access."
            description="Fill in your details and we'll get you set up with credentials and docs within 1 business day."
          />

          {state === "success" ? (
            <div role="status" className="card flex flex-col items-center justify-center p-8 text-center sm:p-12">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-soft sm:h-16 sm:w-16">
                <Check aria-hidden className="h-7 w-7 text-success sm:h-8 sm:w-8" />
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-text">Application received!</h3>
              <p className="text-[15px] text-text-secondary">We&apos;ll reach out within 1 business day with your API credentials and onboarding guide.</p>
              <Link href="/ai-engine" className="link-accent mt-5 inline-flex items-center gap-2 text-sm">
                Back to AI Engine <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5 p-5 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="api-name" className="field-label">Full Name *</label>
                  <input id="api-name" required name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="field" />
                </div>
                <div>
                  <label htmlFor="api-email" className="field-label">Work Email *</label>
                  <input id="api-email" required type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className="field" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="api-company" className="field-label">Company *</label>
                  <input id="api-company" required name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Your company" className="field" />
                </div>
                <div>
                  <label htmlFor="api-role" className="field-label">Your Role</label>
                  <input id="api-role" name="role" autoComplete="organization-title" value={form.role} onChange={handleChange} placeholder="CTO, Developer, Product Lead…" className="field" />
                </div>
              </div>
              <div>
                <label htmlFor="api-tier" className="field-label">Plan you&apos;re interested in *</label>
                <select id="api-tier" required name="tier" value={form.tier} onChange={handleChange} className="field">
                  <option value="">Select a plan…</option>
                  <option>Starter — $299/mo</option>
                  <option>Growth — $999/mo</option>
                  <option>Enterprise — Custom</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="api-usecase" className="field-label">What will you use the API for? *</label>
                <select id="api-usecase" required name="useCase" value={form.useCase} onChange={handleChange} className="field">
                  <option value="">Select your use case…</option>
                  <option>Document analysis / OCR</option>
                  <option>Lead scoring / enrichment</option>
                  <option>Chatbot / conversational AI</option>
                  <option>Fraud detection / anomaly scoring</option>
                  <option>Content generation</option>
                  <option>Predictive analytics</option>
                  <option>Custom / other</option>
                </select>
              </div>
              <div>
                <label htmlFor="api-volume" className="field-label">Expected monthly call volume</label>
                <select id="api-volume" name="callVolume" value={form.callVolume} onChange={handleChange} className="field">
                  <option value="">Select volume…</option>
                  <option>Under 10,000</option>
                  <option>10,000 – 50,000</option>
                  <option>50,000 – 250,000</option>
                  <option>250,000 – 1M</option>
                  <option>1M+</option>
                </select>
              </div>
              <div>
                <label htmlFor="api-message" className="field-label">Anything else we should know?</label>
                <textarea id="api-message" name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tech stack, integration needs, timeline…" className="field resize-none" />
              </div>
              <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full">
                {state === "loading" ? "Submitting…" : "Apply for API Access"}
              </button>
              <p className="text-center text-sm text-text-muted">No commitment. We&apos;ll respond within 1 business day.</p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
