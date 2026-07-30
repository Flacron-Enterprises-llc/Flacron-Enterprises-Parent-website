"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const SESSION_KEY = "flacron_lead_popup_shown";
const SCROLL_TRIGGER_RATIO = 0.5;
const EXIT_INTENT_DELAY_MS = 8000;

type FormState = "idle" | "loading" | "success";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<FormState>("idle");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const shownRef = useRef(false);
  const pathname = usePathname();

  const reveal = useCallback((trigger: string) => {
    if (shownRef.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;
    shownRef.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(true);
    track("lead_popup_shown", { trigger });
  }, []);

  useEffect(() => {
    // Don't show on admin pages
    if (pathname?.startsWith("/admin")) return;

    function onScroll() {
      const ratio = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      if (ratio >= SCROLL_TRIGGER_RATIO) reveal("scroll_depth");
    }
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) reveal("exit_intent");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    const fallback = setTimeout(() => reveal("time_delay"), EXIT_INTENT_DELAY_MS);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(fallback);
    };
  }, [pathname, reveal]);

  function close() {
    setOpen(false);
    track("lead_popup_dismissed");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return;
    setState("loading");
    try {
      await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || "Website visitor", email, source: "popup" }),
      });
    } catch {
      // silent — don't block UX if Firestore is down
    }
    track("lead_popup_submit");
    setState("success");
    setTimeout(() => setOpen(false), 2200);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60"
            onClick={close}
          />
          <div className="pointer-events-none fixed inset-0 z-[61] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
            <button
              onClick={close}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              {state === "success" ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
                    <Check className="h-7 w-7 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-slate-900">You&apos;re in.</p>
                  <p className="text-sm text-slate-500">Our team will follow up with a tailored next step shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#FE4705]" />
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#FE4705]">Before you go</p>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 sm:text-2xl" style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}>
                    Get a free AI readiness audit.
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    Tell us where to send it — we&apos;ll show you exactly where AI can save your team the most time.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/40 focus:border-[#FE4705] transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Work email"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FE4705]/40 focus:border-[#FE4705] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className={cn(
                        "w-full rounded-xl bg-[#FE4705] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors disabled:opacity-60"
                      )}
                    >
                      {state === "loading" ? "Sending..." : "Send Me the Audit"}
                    </button>
                  </form>
                  <p className="mt-3 text-center text-xs text-slate-400">No spam. Unsubscribe anytime.</p>
                </>
              )}
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
