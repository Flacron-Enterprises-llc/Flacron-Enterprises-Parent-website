"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Layers } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

type State = "idle" | "loading" | "success";

export default function CustomOrderPage() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", company: "", projectType: "", budget: "", description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* silent */ }
    setState("success");
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flacron-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705] transition-colors";

  return (
    <div className="min-h-screen">
      <section className="bg-flacron-navy px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-16 lg:px-8 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 particle-grid opacity-10" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <Link href="/ai-engine" className="flex w-fit items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors sm:mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to AI Engine
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-[#FE4705] mb-5 sm:px-4 sm:text-sm sm:mb-6">
            <Layers className="h-3.5 w-3.5" />
            Custom Order
          </div>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Need something<br /><span className="text-[#FE4705]">built for you.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-slate-300 leading-relaxed sm:mt-5 sm:text-base">
            Enterprise plans, white-label deployments, or a workflow that doesn&apos;t fit our standard tiers — tell us what you need and we&apos;ll put together a custom quote.
          </p>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <SectionHeader eyebrow="Tell us about your project" title="Request a custom quote." centered />

          {state === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mb-4 sm:h-16 sm:w-16">
                <Check className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold text-flacron-navy mb-2 sm:text-xl">Request received!</h3>
              <p className="text-slate-500 text-sm">Our team will review your request and follow up with a custom quote shortly.</p>
              <Link href="/ai-engine" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#FE4705] hover:text-[#D83C04]">
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
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Company</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Project type</label>
                  <select name="projectType" value={form.projectType} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option>Enterprise AI Engine plan</option>
                    <option>White-label deployment</option>
                    <option>Custom app / integration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Estimated budget</label>
                  <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
                    <option value="">Select…</option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $25,000</option>
                    <option>$25,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Tell us about your project *</label>
                <textarea required name="description" value={form.description} onChange={handleChange} rows={5} placeholder="What are you trying to build or solve?" className={inputClass + " resize-none"} />
              </div>
              <button type="submit" disabled={state === "loading"}
                className="w-full rounded-xl bg-[#FE4705] py-3.5 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors disabled:opacity-60 shadow-[0_4px_16px_rgba(254, 71, 5,0.25)]">
                {state === "loading" ? "Submitting…" : "Submit Request"}
              </button>
              <p className="text-center text-xs text-slate-400">No commitment. We&apos;ll respond within 1-2 business days.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
