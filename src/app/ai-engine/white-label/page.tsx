"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Layers, Palette, Server, Users, Shield, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

type State = "idle" | "loading" | "success";

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

export default function WhiteLabelPage() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "",
    industry: "", teamSize: "", budget: "",
    product: "", message: "",
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
          subject: `White-Label Enquiry – ${form.product || "General"}`,
          source: "white-label",
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_50%,rgba(37,99,235,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <Link href="/ai-engine" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-5 transition-colors sm:mb-7">
            <ArrowLeft className="h-4 w-4" /> Back to AI Engine
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-[#F97316] mb-4 sm:px-4 sm:text-sm sm:mb-5">
            <Layers className="h-3.5 w-3.5" />
            Option 3 — White-Label Deployment
          </div>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            Our AI platform.<br />
            <span className="text-[#F97316]">Your product.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 leading-relaxed sm:mt-5 sm:text-base lg:text-lg">
            License the full Flacron AI stack — rebranded as your own, deployed on your infrastructure, and tailored to your industry and workflows. You keep the client relationship and revenue. We provide the intelligence.
          </p>
          <div className="mt-6 sm:mt-8">
            <a href="#enquiry-form"
              className="ripple-btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors sm:w-auto sm:px-7 sm:py-3.5">
              Start Your Enquiry <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── What you get ── */}
      <section className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="What's Included" title="Everything you need to launch your AI product." centered />
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {whatYouGet.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#F97316]/30 hover:shadow-md transition-all sm:p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 sm:mb-4 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 text-[#F97316]" />
                </div>
                <h3 className="text-sm font-bold text-flacron-navy mb-1.5 sm:text-base sm:mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed sm:text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who this is for ── */}
      <section className="bg-slate-50 py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-y border-slate-100">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Who It's For" title="Built for partners and enterprises." centered />
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {useCases.map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Check className="h-4 w-4 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-flacron-navy mb-1">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed sm:text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry form ── */}
      <section id="enquiry-form" className="py-10 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            eyebrow="Start the Conversation"
            title="Tell us about your project."
            description="White-label engagements start at $25,000. We'll review your enquiry and schedule a scoping call within 2 business days."
            centered
          />

          {state === "success" ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 mb-4 sm:h-16 sm:w-16">
                <Check className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8" />
              </div>
              <h3 className="text-lg font-bold text-flacron-navy mb-2 sm:text-xl">Enquiry submitted!</h3>
              <p className="text-slate-500 text-sm">Our enterprise team will review your project and reach out within 2 business days to schedule a scoping call.</p>
              <Link href="/ai-engine" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:text-[#EA580C]">
                Back to AI Engine <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Full Name *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Work Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={inputClass} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Company *</label>
                  <input required name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Your Role *</label>
                  <input required name="role" value={form.role} onChange={handleChange} placeholder="CEO, CTO, Partnerships…" className={inputClass} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Industry *</label>
                  <select required name="industry" value={form.industry} onChange={handleChange} className={inputClass}>
                    <option value="">Select industry…</option>
                    <option>Construction & Real Estate</option>
                    <option>Insurance & Claims</option>
                    <option>Cybersecurity</option>
                    <option>Business & Sales</option>
                    <option>Sports & Media</option>
                    <option>Healthcare</option>
                    <option>Financial Services</option>
                    <option>Government & Public Sector</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Organisation Size *</label>
                  <select required name="teamSize" value={form.teamSize} onChange={handleChange} className={inputClass}>
                    <option value="">Select size…</option>
                    <option>1–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>201–1,000</option>
                    <option>1,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Which product(s) to white-label? *</label>
                <select required name="product" value={form.product} onChange={handleChange} className={inputClass}>
                  <option value="">Select a product…</option>
                  <option>FlacronBuild (Construction AI)</option>
                  <option>FlacronConnect AI (Lead Gen)</option>
                  <option>RapidClaimPro (Insurance)</option>
                  <option>FlacronSecure AI (Cybersecurity)</option>
                  <option>FlacronSport (Sports & Media)</option>
                  <option>Tchitaka Growth (Personal Dev)</option>
                  <option>Multiple products</option>
                  <option>Custom build (new product)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Estimated project budget</label>
                <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
                  <option value="">Select budget range…</option>
                  <option>$25,000 – $50,000</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000 – $250,000</option>
                  <option>$250,000+</option>
                  <option>Ongoing revenue share preferred</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Describe your project *</label>
                <textarea required name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="What product do you want to build? Who are your end users? What's your timeline?"
                  className={inputClass + " resize-none"} />
              </div>
              <button type="submit" disabled={state === "loading"}
                className="w-full rounded-xl bg-[#F97316] py-3.5 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors disabled:opacity-60 shadow-[0_4px_16px_rgba(249,115,22,0.25)]">
                {state === "loading" ? "Submitting…" : "Submit White-Label Enquiry"}
              </button>
              <p className="text-center text-xs text-slate-400">Enterprise team responds within 2 business days.</p>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
