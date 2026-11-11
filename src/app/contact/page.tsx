"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { useToast } from "@/components/ToastProvider";
import { fcgeFormSubmitted } from "@/lib/growth-engine";

type State = "idle" | "loading";

const contactDetails = [
  { icon: Mail, label: "Email", value: "Contact@flacronenterprises.com", href: "mailto:Contact@flacronenterprises.com" },
  { icon: Phone, label: "Phone", value: "929-444-1275", href: "tel:+19294441275" },
  { icon: MapPin, label: "Headquarters", value: "410 E 95th St, Brooklyn, NY 11212", href: undefined },
];

export default function ContactPage() {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const { toast } = useToast();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const submitted = form;
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
      if (res.ok) {
        fcgeFormSubmitted("contact", { email: submitted.email, name: submitted.name, company: submitted.company });
      }
    } catch {
      // silent — don't block UX if Firestore is down
    }
    setState("idle");
    setForm({ name: "", email: "", company: "", subject: "", message: "" });
    toast("Message sent! We'll get back to you within 24 hours.", "success");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's start a conversation."
        description="Whether you have a question, want a demo, or are ready to start — we're here."
      />

      <section className="container-page pb-20 sm:pb-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
          {/* Contact info */}
          <aside className="space-y-4" aria-label="Contact details">
            <ul className="card divide-y divide-border">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft">
                    <Icon aria-hidden className="h-5 w-5 text-accent-text" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="mt-0.5 block break-words text-[15px] font-medium text-text hover:text-accent-text">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-[15px] font-medium text-text">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[1.25rem] border border-accent-border bg-accent-soft p-6">
              <p className="font-display text-lg font-semibold text-text">Looking for a demo?</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">
                Book a personalised walkthrough of any Flacron product with our team.
              </p>
              <Link href="/book-demo" className="link-accent mt-4 inline-flex items-center gap-1.5 text-sm">
                Book a demo <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          {/* Form */}
          <form onSubmit={handleSubmit} className="card space-y-5 p-5 sm:p-8" aria-label="Contact form">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">Full name <span className="text-accent-text">*</span></label>
                <input required name="name" id="name" autoComplete="name" value={form.name} onChange={handleChange} className="field" />
              </div>
              <div>
                <label htmlFor="email" className="field-label">Email address <span className="text-accent-text">*</span></label>
                <input required type="email" name="email" id="email" autoComplete="email" value={form.email} onChange={handleChange} className="field" />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="field-label">Company</label>
              <input name="company" id="company" autoComplete="organization" value={form.company} onChange={handleChange} className="field" />
            </div>

            <div>
              <label htmlFor="subject" className="field-label">Subject <span className="text-accent-text">*</span></label>
              <select required id="subject" name="subject" value={form.subject} onChange={handleChange} className="field">
                <option value="">Select a topic...</option>
                <option>Product Demo Request</option>
                <option>Sales Inquiry</option>
                <option>Partnership Opportunity</option>
                <option>Technical Support</option>
                <option>General Inquiry</option>
                <option>Press / Media</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="field-label">Message <span className="text-accent-text">*</span></label>
              <textarea required name="message" id="message" value={form.message} onChange={handleChange} rows={6} className="field resize-y" />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-text-muted">Fields marked * are required.</p>
              <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full sm:w-auto">
                {state === "loading" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
