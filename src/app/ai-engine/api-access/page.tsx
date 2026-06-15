"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Code2, BarChart3, Lock, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

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
    features: ["All 12 AI model endpoints", "Priority inference (<200ms)", "Streaming + webhook output", "Slack & email support", "99.9% uptime SLA", "Custom prompt tuning"],
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
  { icon: Zap,      title: "Real-time Inference", desc: "Sub-200ms responses for completions, classification, scoring." },
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

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flacron-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-colors";

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-flacron-navy px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link href="/ai-engine" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5 transition-colors sm:mb-7">
            <ArrowLeft className="h-4 w-4" /> Back to AI Engine
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-[#F97316] mb-4 sm:px-4 sm:text-sm sm:mb-5">
            <Code2 className="h-3.5 w-3.5" />
            Option 2 — API Platform Access
          </div>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Add AI to your product.<br />
            <span className="text-[#F97316]">Without building it.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 leading-relaxed sm:mt-5 sm:text-base lg:text-lg">
            Call our AI endpoints directly from your codebase. Industry-trained models for language, vision, prediction, and scoring — all via a simple REST API. You ship the feature, we run the intelligence.
          </p>

          {/* Capability cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-col sm:items-start">
                <Icon className="h-5 w-5 text-[#F97316] shrink-0 sm:mb-2" />
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="text-xs text-slate-400 leading-snug mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Pricing" title="Pick the plan that fits." centered />
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl border p-5 sm:p-6 ${
                  tier.highlight
                    ? "bg-[#F97316] border-[#F97316] shadow-[0_8px_32px_rgba(249,115,22,0.3)]"
                    : "bg-white border-slate-200"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${tier.highlight ? "text-orange-100" : "text-[#F97316]"}`}>
                  {tier.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <p className={`text-3xl font-black sm:text-4xl ${tier.highlight ? "text-white" : "text-flacron-navy"}`} style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    {tier.price}
                  </p>
                  {tier.per && <p className={`text-sm mb-1 ${tier.highlight ? "text-orange-100" : "text-slate-400"}`}>{tier.per}</p>}
                </div>
                <p className={`text-xs font-semibold mb-2 ${tier.highlight ? "text-orange-100" : "text-[#F97316]"}`}>{tier.calls}</p>
                <p className={`text-sm mb-4 leading-relaxed ${tier.highlight ? "text-orange-50" : "text-slate-500"}`}>{tier.desc}</p>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${tier.highlight ? "text-orange-100" : "text-[#F97316]"}`} />
                      <span className={tier.highlight ? "text-white" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application form ── */}
      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="Request Access"
            title="Apply for API access."
            description="Fill in your details and we'll get you set up with credentials and docs within 1 business day."
            centered
          />

          {state === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mb-4 sm:h-16 sm:w-16">
                <Check className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold text-flacron-navy mb-2 sm:text-xl">Application received!</h3>
              <p className="text-slate-500 text-sm">We&apos;ll reach out within 1 business day with your API credentials and onboarding guide.</p>
              <Link href="/ai-engine" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:text-[#EA580C]">
                Back to AI Engine <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Work Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className={inputClass} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Company *</label>
                  <input required name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Your Role</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="CTO, Developer, Product Lead…" className={inputClass} />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Plan you&apos;re interested in *</label>
                <select required name="tier" value={form.tier} onChange={handleChange} className={inputClass}>
                  <option value="">Select a plan…</option>
                  <option>Starter — $299/mo</option>
                  <option>Growth — $999/mo</option>
                  <option>Enterprise — Custom</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">What will you use the API for? *</label>
                <select required name="useCase" value={form.useCase} onChange={handleChange} className={inputClass}>
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
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Expected monthly call volume</label>
                <select name="callVolume" value={form.callVolume} onChange={handleChange} className={inputClass}>
                  <option value="">Select volume…</option>
                  <option>Under 10,000</option>
                  <option>10,000 – 50,000</option>
                  <option>50,000 – 250,000</option>
                  <option>250,000 – 1M</option>
                  <option>1M+</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Anything else we should know?</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tech stack, integration needs, timeline…" className={inputClass + " resize-none"} />
              </div>
              <button type="submit" disabled={state === "loading"}
                className="w-full rounded-xl bg-[#F97316] py-3.5 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors disabled:opacity-60 shadow-[0_4px_16px_rgba(249,115,22,0.25)]">
                {state === "loading" ? "Submitting…" : "Apply for API Access"}
              </button>
              <p className="text-center text-xs text-slate-400">No commitment. We&apos;ll respond within 1 business day.</p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
