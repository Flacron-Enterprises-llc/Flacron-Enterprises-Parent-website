"use client";

import { useState } from "react";
import { Check, Calendar } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import PageHero from "@/components/PageHero";
import CalendarEmbed from "@/components/CalendarEmbed";
import { fcgeFormSubmitted, fcgeTrack } from "@/lib/growth-engine";

type State = "idle" | "loading" | "success";

const promises = [
  { title: "Personalised to your use case", desc: "We tailor every demo to your industry, team size, and specific challenges." },
  { title: "30-minute focused session", desc: "No fluff. You'll see exactly what matters to you in a focused, efficient session." },
  { title: "Q&A with our team", desc: "Bring your questions — our product specialists will answer every one." },
  { title: "No commitment required", desc: "A demo is just a conversation. There's no pressure or obligation." },
];

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
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "book-demo" }),
      });
      if (res.ok) {
        fcgeFormSubmitted("book_demo", { email: form.email, name: form.name, company: form.company, phone: form.phone });
        fcgeTrack("demo_requested", { form: "book_demo" });
      }
    } catch {
      // silent — don't block UX if Firestore is down
    }
    setState("success");
  }

  return (
    <>
      <PageHero
        eyebrow="Book a demo"
        title="See Flacron in action."
        description="Get a personalised walkthrough of any product in our ecosystem. Our team will tailor the demo to your specific use case."
      />

      <section className="container-page pb-20 sm:pb-28">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-16">
          {/* What to expect */}
          <div className="lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold text-text">What to expect</h2>
            <ul className="mt-5 space-y-5">
              {promises.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <Check aria-hidden className="h-3.5 w-3.5 text-accent-text" />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-text">{item.title}</p>
                    <p className="mt-0.5 text-[15px] leading-relaxed text-text-secondary">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 rounded-[1.25rem] border border-border bg-surface-muted p-5">
              <Calendar aria-hidden className="h-7 w-7 shrink-0 text-accent-text" />
              <div>
                <p className="text-[15px] font-semibold text-text">Average response time: under 24 hours</p>
                <p className="text-sm text-text-secondary">We confirm every demo request within one business day.</p>
              </div>
            </div>
          </div>

          {/* Calendar + form */}
          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-text">Pick a time that works for you</h2>
            <CalendarEmbed />
            <div className="my-8 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-border" />
              <span className="text-sm text-text-muted">or send a request</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            {state === "success" ? (
              <div role="status" className="flex flex-col items-center justify-center rounded-[1.25rem] border border-border bg-success-soft p-8 text-center sm:p-14">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                  <Check aria-hidden className="h-7 w-7 text-success" />
                </span>
                <h3 className="font-display text-xl font-semibold text-text">Demo request received!</h3>
                <p className="mt-2 text-text-secondary">Our team will reach out within 24 hours to schedule your session.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-5 p-5 sm:p-8" aria-label="Demo request form">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="demo-name" className="field-label">Full name <span className="text-accent-text">*</span></label>
                    <input id="demo-name" required name="name" autoComplete="name" value={form.name} onChange={handleChange} placeholder="John Smith" className="field" />
                  </div>
                  <div>
                    <label htmlFor="demo-email" className="field-label">Work email <span className="text-accent-text">*</span></label>
                    <input id="demo-email" required type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="john@company.com" className="field" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="demo-company" className="field-label">Company <span className="text-accent-text">*</span></label>
                    <input id="demo-company" required name="company" autoComplete="organization" value={form.company} onChange={handleChange} placeholder="Your company" className="field" />
                  </div>
                  <div>
                    <label htmlFor="demo-phone" className="field-label">Phone</label>
                    <input id="demo-phone" type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" className="field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="demo-product" className="field-label">Which product interests you? <span className="text-accent-text">*</span></label>
                  <select id="demo-product" required name="product" value={form.product} onChange={handleChange} className="field">
                    <option value="">Select a product...</option>
                    {apps.map((a) => <option key={a.id || a.slug} value={a.slug}>{a.name}</option>)}
                    <option value="multiple">Multiple products</option>
                    <option value="general">General overview</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="demo-team" className="field-label">Team size</label>
                  <select id="demo-team" name="teamSize" value={form.teamSize} onChange={handleChange} className="field">
                    <option value="">Select team size...</option>
                    <option>Just me</option>
                    <option>2–10</option>
                    <option>11–50</option>
                    <option>51–200</option>
                    <option>200+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="demo-message" className="field-label">Anything specific you want to see?</label>
                  <textarea id="demo-message" name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your use case or specific questions..." className="field resize-y" />
                </div>
                <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full">
                  {state === "loading" ? "Submitting..." : "Request my demo"}
                </button>
                <p className="text-center text-sm text-text-muted">No spam. No commitment. Just a conversation.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
