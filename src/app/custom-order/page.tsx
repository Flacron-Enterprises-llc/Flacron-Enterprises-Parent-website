"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import { fcgeFormSubmitted } from "@/lib/growth-engine";

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
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) fcgeFormSubmitted("custom_order", { email: form.email, name: form.name, company: form.company });
    } catch { /* silent */ }
    setState("success");
  }

  return (
    <>
      <PageHero
        eyebrow="Custom order"
        title="Need something built for you?"
        description="Enterprise plans, white-label deployments, or a workflow that doesn't fit our standard tiers — tell us what you need and we'll put together a custom quote."
      >
        <Link href="/ai-engine" className="mt-6 inline-flex items-center gap-2 rounded-md text-sm font-medium text-text-secondary transition-colors hover:text-text">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Back to AI Engine
        </Link>
      </PageHero>

      <section className="container-page pb-20 sm:pb-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text sm:text-3xl">Request a custom quote.</h2>
          <p className="mb-8 mt-2 text-[15px] text-text-secondary">Tell us about your project.</p>

          {state === "success" ? (
            <div role="status" className="flex flex-col items-center justify-center rounded-[1.25rem] border border-border bg-success-soft p-8 text-center sm:p-12">
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                <Check aria-hidden className="h-7 w-7 text-success" />
              </span>
              <h3 className="font-display text-xl font-semibold text-text">Request received!</h3>
              <p className="mt-2 text-[15px] text-text-secondary">Our team will review your request and follow up with a custom quote shortly.</p>
              <Link href="/ai-engine" className="link-accent mt-5 inline-flex items-center gap-1.5 text-sm">
                Back to AI Engine <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card space-y-5 p-5 sm:p-8" aria-label="Custom quote request">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-name" className="field-label">Full name <span className="text-accent-text">*</span></label>
                  <input id="co-name" required name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className="field" />
                </div>
                <div>
                  <label htmlFor="co-email" className="field-label">Work email <span className="text-accent-text">*</span></label>
                  <input id="co-email" required type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className="field" />
                </div>
              </div>
              <div>
                <label htmlFor="co-company" className="field-label">Company</label>
                <input id="co-company" name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Your company" className="field" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-type" className="field-label">Project type</label>
                  <select id="co-type" name="projectType" value={form.projectType} onChange={handleChange} className="field">
                    <option value="">Select…</option>
                    <option>Enterprise AI Engine plan</option>
                    <option>White-label deployment</option>
                    <option>Custom app / integration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="co-budget" className="field-label">Estimated budget</label>
                  <select id="co-budget" name="budget" value={form.budget} onChange={handleChange} className="field">
                    <option value="">Select…</option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $25,000</option>
                    <option>$25,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="co-description" className="field-label">Tell us about your project <span className="text-accent-text">*</span></label>
                <textarea id="co-description" required name="description" value={form.description} onChange={handleChange} rows={6} placeholder="What are you trying to build or solve?" className="field resize-y" />
              </div>
              <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full">
                {state === "loading" ? "Submitting…" : "Submit request"}
              </button>
              <p className="text-center text-sm text-text-muted">No commitment. We&apos;ll respond within 1-2 business days.</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
