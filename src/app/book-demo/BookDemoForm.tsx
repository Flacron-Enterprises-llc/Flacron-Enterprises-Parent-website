"use client";

import { useState } from "react";
import { Check, Calendar } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import SectionHeader from "@/components/SectionHeader";

type State = "idle" | "loading" | "success";

export default function BookDemoForm({ apps }: { apps: AppDefinition[] }) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", product: "", teamSize: "", message: "" });

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
        body: JSON.stringify({ ...form, source: "book-demo" }),
      });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    setState("success");
  }

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flacron-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-colors";

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              eyebrow="Book a Demo"
              title="See Flacron in action."
              description="Get a personalised walkthrough of any product in our ecosystem. Our team will tailor the demo to your specific use case."
            />
            <div className="space-y-4">
              {[
                { title: "Personalised to your use case", desc: "We tailor every demo to your industry, team size, and specific challenges." },
                { title: "30-minute focused session", desc: "No fluff. You'll see exactly what matters to you in a focused, efficient session." },
                { title: "Q&A with our team", desc: "Bring your questions — our product specialists will answer every one." },
                { title: "No commitment required", desc: "A demo is just a conversation. There's no pressure or obligation." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F97316]">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-flacron-navy">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 p-5">
              <Calendar className="h-8 w-8 shrink-0 text-[#F97316]" />
              <div>
                <p className="text-sm font-bold text-flacron-navy">Average response time: under 24 hours</p>
                <p className="text-xs text-slate-500">We confirm every demo request within one business day.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-8 sm:p-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-flacron-navy mb-2">Demo request received!</h3>
                <p className="text-slate-500">{"Our team will reach out within 24 hours to schedule your session."}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Full Name *</label>
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="John Smith" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Work Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className={inputClass} />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Company *</label>
                    <input required name="company" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Which product interests you? *</label>
                  <select required name="product" value={form.product} onChange={handleChange} className={inputClass}>
                    <option value="">Select a product...</option>
                    {apps.map((a) => <option key={a.id || a.slug} value={a.slug}>{a.name}</option>)}
                    <option value="multiple">Multiple products</option>
                    <option value="general">General overview</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Team size</label>
                  <select name="teamSize" value={form.teamSize} onChange={handleChange} className={inputClass}>
                    <option value="">Select team size...</option>
                    <option>Just me</option>
                    <option>2–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>200+</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Anything specific you want to see?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your use case or specific questions..." className={inputClass + " resize-none"} />
                </div>
                <button type="submit" disabled={state === "loading"}
                  className="w-full rounded-xl bg-[#F97316] py-4 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors disabled:opacity-60 shadow-[0_4px_16px_rgba(249,115,22,0.25)]">
                  {state === "loading" ? "Submitting..." : "Request My Demo"}
                </button>
                <p className="text-center text-xs text-slate-400">No spam. No commitment. Just a conversation.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
