"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useToast } from "@/components/ToastProvider";

type State = "idle" | "loading";

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
    try {
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact" }),
      });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    setState("idle");
    setForm({ name: "", email: "", company: "", subject: "", message: "" });
    toast("Message sent! We'll get back to you within 24 hours.", "success");
  }

  const inputBase = "peer w-full rounded-xl border border-slate-200 bg-white px-4 pt-5 pb-2 text-sm text-flacron-navy placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-colors";
  const labelBase = "absolute left-4 top-3.5 text-sm text-slate-400 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#F97316] peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-xs";

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-4">
        <SectionHeader eyebrow="Contact Us" title="Let's start a conversation." description="Whether you have a question, want a demo, or are ready to start — we're here." centered />

        <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "Contact@flacronenterprises.com" },
              { icon: Phone, label: "Phone", value: "929-444-1275" },
              { icon: MapPin, label: "Headquarters", value: "410 E 95th St, Brooklyn, NY 11212" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50">
                  <Icon className="h-5 w-5 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-flacron-navy">{value}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <p className="text-sm font-bold text-flacron-navy mb-2">Looking for a demo?</p>
              <p className="text-sm text-slate-500 mb-4">Book a personalised walkthrough of any Flacron product with our team.</p>
              <a href="/book-demo" className="text-sm font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors">
                Book a Demo →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Floating label: Name */}
                <div className="relative">
                  <input required name="name" id="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={inputBase} />
                  <label htmlFor="name" className={labelBase}>Full Name *</label>
                </div>
                {/* Floating label: Email */}
                <div className="relative">
                  <input required type="email" name="email" id="email" value={form.email} onChange={handleChange} placeholder="Email Address" className={inputBase} />
                  <label htmlFor="email" className={labelBase}>Email Address *</label>
                </div>
              </div>

              {/* Floating label: Company */}
              <div className="relative">
                <input name="company" id="company" value={form.company} onChange={handleChange} placeholder="Company" className={inputBase} />
                <label htmlFor="company" className={labelBase}>Company</label>
              </div>

              {/* Subject (select — static label) */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-flacron-navy">Subject *</label>
                <select required name="subject" value={form.subject} onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-flacron-navy focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-colors">
                  <option value="">Select a topic...</option>
                  <option>Product Demo Request</option>
                  <option>Sales Inquiry</option>
                  <option>Partnership Opportunity</option>
                  <option>Technical Support</option>
                  <option>General Inquiry</option>
                  <option>Press / Media</option>
                </select>
              </div>

              {/* Floating label: Message */}
              <div className="relative">
                <textarea required name="message" id="message" value={form.message} onChange={handleChange} rows={5} placeholder="Message" className={inputBase + " resize-none"} />
                <label htmlFor="message" className={labelBase}>Message *</label>
              </div>

              <button type="submit" disabled={state === "loading"}
                className="ripple-btn w-full rounded-xl bg-[#F97316] py-3.5 text-sm font-semibold text-white hover:bg-[#EA580C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {state === "loading" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
