"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  appName: string;
  appSlug: string;
}

type FormState = "idle" | "loading" | "success";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function WaitlistForm({ appName, appSlug }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValidationError("");
    if (!isValidEmail(email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }
    setState("loading");
    await new Promise((r) => setTimeout(r, 800));
    console.log("Waitlist signup:", { email, app: appSlug });
    setState("success");
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
          <Mail className="h-5 w-5 text-[#FE4705]" />
        </div>
        <div>
          <p className="text-sm text-slate-500">Get early access</p>
          <h3 className="font-semibold text-flacron-navy">{appName} Waitlist</h3>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-200"
            >
              <Check className="h-7 w-7 text-green-600" />
            </motion.div>
            <p className="text-lg font-semibold text-flacron-navy">{"You're on the list!"}</p>
            <p className="text-sm text-slate-500">{"We'll notify you when"} {appName} launches.</p>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={state === "loading"}
                className={cn(
                  "w-full rounded-xl border px-4 py-3 text-sm text-flacron-navy placeholder:text-slate-400",
                  "focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]",
                  "transition-colors bg-white",
                  validationError ? "border-red-400" : "border-slate-200"
                )}
              />
              {validationError && <p className="mt-1 text-xs text-red-500">{validationError}</p>}
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              className="shrink-0 rounded-xl bg-[#FE4705] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D83C04] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Joining...
                </span>
              ) : "Join Waitlist"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
