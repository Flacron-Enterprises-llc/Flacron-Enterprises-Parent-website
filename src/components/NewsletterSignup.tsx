"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { track } from "@/lib/analytics";

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
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter subscriber", email, source: "newsletter_footer" }),
      });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    track("newsletter_signup");
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400">
        <Check className="h-4 w-4" />
        You&apos;re subscribed.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xs gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/40 focus:border-[#FE4705] transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex shrink-0 items-center justify-center rounded-lg bg-[#FE4705] px-3 text-white hover:bg-[#D83C04] transition-colors disabled:opacity-60"
        aria-label="Subscribe"
      >
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
