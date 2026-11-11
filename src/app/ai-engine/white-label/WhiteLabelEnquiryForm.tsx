"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

type State = "idle" | "loading" | "success";

/** White-label enquiry form. `productOptions` come from the product catalog (whatever getApps() returns). */
export default function WhiteLabelEnquiryForm({ productOptions }: { productOptions: string[] }) {
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

  if (state === "success") {
    return (
      <div role="status" className="card flex flex-col items-center justify-center p-8 text-center sm:p-12">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-soft sm:h-16 sm:w-16">
          <Check aria-hidden className="h-7 w-7 text-success sm:h-8 sm:w-8" />
        </div>
        <h3 className="mb-2 font-display text-xl font-semibold text-text">Enquiry submitted!</h3>
        <p className="text-[15px] text-text-secondary">Our enterprise team will review your project and reach out within 2 business days to schedule a scoping call.</p>
        <Link href="/ai-engine" className="link-accent mt-5 inline-flex items-center gap-2 text-sm">
          Back to AI Engine <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wl-name" className="field-label">Full Name *</label>
          <input id="wl-name" required name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="John Smith" className="field" />
        </div>
        <div>
          <label htmlFor="wl-email" className="field-label">Work Email *</label>
          <input id="wl-email" required type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wl-company" className="field-label">Company *</label>
          <input id="wl-company" required name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Your company" className="field" />
        </div>
        <div>
          <label htmlFor="wl-role" className="field-label">Your Role *</label>
          <input id="wl-role" required name="role" autoComplete="organization-title" value={form.role} onChange={handleChange} placeholder="CEO, CTO, Partnerships…" className="field" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wl-industry" className="field-label">Industry *</label>
          <select id="wl-industry" required name="industry" value={form.industry} onChange={handleChange} className="field">
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
          <label htmlFor="wl-size" className="field-label">Organisation Size *</label>
          <select id="wl-size" required name="teamSize" value={form.teamSize} onChange={handleChange} className="field">
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
        <label htmlFor="wl-product" className="field-label">Which product(s) to white-label? *</label>
        <select id="wl-product" required name="product" value={form.product} onChange={handleChange} className="field">
          <option value="">Select a product…</option>
          {productOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
          <option>Multiple products</option>
          <option>Custom build (new product)</option>
        </select>
      </div>
      <div>
        <label htmlFor="wl-budget" className="field-label">Estimated project budget</label>
        <select id="wl-budget" name="budget" value={form.budget} onChange={handleChange} className="field">
          <option value="">Select budget range…</option>
          <option>$25,000 – $50,000</option>
          <option>$50,000 – $100,000</option>
          <option>$100,000 – $250,000</option>
          <option>$250,000+</option>
          <option>Ongoing revenue share preferred</option>
        </select>
      </div>
      <div>
        <label htmlFor="wl-message" className="field-label">Describe your project *</label>
        <textarea id="wl-message" required name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="What product do you want to build? Who are your end users? What's your timeline?"
          className="field resize-none" />
      </div>
      <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full">
        {state === "loading" ? "Submitting…" : "Submit White-Label Enquiry"}
      </button>
      <p className="text-center text-sm text-text-muted">Enterprise team responds within 2 business days.</p>
    </form>
  );
}
