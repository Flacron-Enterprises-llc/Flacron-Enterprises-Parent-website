"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/analytics";
import { fcgeFormSubmitted } from "@/lib/growth-engine";

type State = "idle" | "loading" | "success";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    setState("loading");
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter subscriber", email, source: "newsletter_footer" }),
      });
      if (res.ok) fcgeFormSubmitted("newsletter", { email });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    track("newsletter_signup");
    setState("success");
  }

  if (state === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-[#7ee2a8]">
        <Check className="h-4 w-4" />
        You&apos;re subscribed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="h-11 w-full min-w-0 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 text-sm text-white placeholder:text-band-muted/80 transition-colors focus:border-[#ff8a55] focus:outline-none focus:ring-4 focus:ring-[#ff8a55]/20"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-cta px-4 text-sm font-semibold text-on-cta transition-colors hover:bg-cta-hover disabled:opacity-60"
      >
        Subscribe
        <ArrowRight aria-hidden className="h-4 w-4" />
      </button>
    </form>
  );
}
