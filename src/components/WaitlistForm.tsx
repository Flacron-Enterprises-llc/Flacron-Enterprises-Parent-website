"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fcgeIdentify, fcgeTrack } from "@/lib/growth-engine";

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
  const reduce = useReducedMotion();

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
    // The Growth Engine is where this signup is actually recorded (identify + form_submitted with the product).
    fcgeIdentify({ email });
    fcgeTrack("form_submitted", { form: "waitlist", app: appSlug });
    setState("success");
  }

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
          <Mail aria-hidden className="h-5 w-5 text-accent-text" />
        </span>
        <div>
          <p className="text-sm text-text-muted">Get early access</p>
          <h3 className="font-display text-lg font-semibold text-text">{appName} Waitlist</h3>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 py-4 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
              <Check aria-hidden className="h-7 w-7 text-success" />
            </span>
            <p className="font-display text-lg font-semibold text-text">{"You're on the list!"}</p>
            <p className="text-sm text-text-secondary">{"We'll notify you when"} {appName} launches.</p>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <label htmlFor={`waitlist-${appSlug}`} className="sr-only">Email address</label>
              <input
                id={`waitlist-${appSlug}`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={state === "loading"}
                aria-invalid={validationError ? true : undefined}
                aria-describedby={validationError ? `waitlist-${appSlug}-error` : undefined}
                className={cn("field", validationError && "border-danger")}
              />
              {validationError && <p id={`waitlist-${appSlug}-error`} className="mt-1.5 text-sm text-danger">{validationError}</p>}
            </div>
            <button type="submit" disabled={state === "loading"} className="btn btn-primary shrink-0">
              {state === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg aria-hidden className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
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
