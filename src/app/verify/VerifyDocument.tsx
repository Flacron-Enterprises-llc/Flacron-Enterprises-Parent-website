"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, CircleAlert, Loader2, Search, ShieldX } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

// Public, read-only verification of documents issued through Flacron HR (Flacron Chat backend). The endpoint returns
// only non-sensitive fields: document type, number, holder's name, dates, status and issuer — never salaries.
const VERIFY_API = (process.env.NEXT_PUBLIC_DOCUMENT_VERIFY_API || "https://dv6b7yn8a1arw.cloudfront.net/v1/hr/verify/").replace(/\/?$/, "/");

type Result = {
  valid: boolean;
  kind: string | null;
  number: string | null;
  employee_name: string | null;
  issued_at: string | null;
  document_date: string | null;
  status: string | null;
  issuer: string | null;
};

type State =
  | { phase: "idle" }
  | { phase: "loading"; code: string }
  | { phase: "done"; code: string; result: Result }
  | { phase: "error"; code: string; message: string };

const KIND_LABEL: Record<string, string> = {
  payslip: "Salary slip",
  offer_letter: "Offer letter",
  appointment_letter: "Appointment letter",
  experience_letter: "Experience letter",
  employment_certificate: "Employment certificate",
  salary_certificate: "Salary certificate",
  relieving_letter: "Relieving letter",
  warning_letter: "Warning letter",
  promotion_letter: "Promotion letter",
  increment_letter: "Increment letter",
  custom: "Letter",
};

const kindLabel = (k: string | null) =>
  k ? KIND_LABEL[k] ?? k.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()) : "Document";

function formatDate(value: string | null) {
  if (!value) return null;
  const d = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

const clean = (raw: string) => raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 32);

export default function VerifyDocument() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = clean(params.get("code") ?? "");
  const [input, setInput] = useState(initial);
  const [state, setState] = useState<State>({ phase: "idle" });

  const check = useCallback(async (code: string) => {
    if (code.length < 6) {
      setState({ phase: "error", code, message: "Enter the verification code printed at the bottom of the document." });
      return;
    }
    setState({ phase: "loading", code });
    try {
      const res = await fetch(`${VERIFY_API}${encodeURIComponent(code)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      if (res.status === 429) {
        setState({ phase: "error", code, message: "Too many checks from this connection. Please try again in a few minutes." });
        return;
      }
      if (!res.ok && res.status !== 404) throw new Error(`status ${res.status}`);
      const result = (res.ok ? await res.json() : { valid: false, issued_at: null }) as Result;
      setState({ phase: "done", code, result });
    } catch {
      setState({ phase: "error", code, message: "The verification service could not be reached. Please check your connection and try again." });
    }
  }, []);

  useEffect(() => {
    if (initial) void check(initial);
  }, [initial, check]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const code = clean(input);
    router.replace(code ? `/verify?code=${code}` : "/verify", { scroll: false });
    void check(code);
  }

  return (
    <>
      <SectionHeader
        eyebrow="Document verification"
        title="Verify a document"
        description="Enter the code printed at the bottom of a letter or salary slip issued by Flacron Enterprises LLC to confirm it is genuine."
        centered
      />

      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="verify-code" className="sr-only">Verification code</label>
        <input
          id="verify-code"
          value={input}
          onChange={(e) => setInput(clean(e.target.value))}
          placeholder="e.g. 7S7SE4C3LB"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-base tracking-widest text-flacron-navy placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#FE4705] focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30"
        />
        <button
          type="submit"
          disabled={state.phase === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FE4705] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D83C04] disabled:opacity-60"
        >
          {state.phase === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Verify
        </button>
      </form>

      <div className="mt-8" aria-live="polite">
        {state.phase === "done" && <ResultCard code={state.code} result={state.result} />}
        {state.phase === "error" && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <p>{state.message}</p>
          </div>
        )}
      </div>

      <p className="mt-10 text-center text-xs leading-relaxed text-slate-500">
        Only the document type, number, holder&apos;s name, dates and status are shown. For any question about a document,
        contact <a className="font-medium text-flacron-navy underline" href="mailto:Contact@flacronenterprises.com">Contact@flacronenterprises.com</a>.
      </p>
    </>
  );
}

function ResultCard({ code, result }: { code: string; result: Result }) {
  if (!result.issued_at) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
        <ShieldX className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
        <div>
          <p className="font-semibold text-red-800">No document found</p>
          <p className="mt-1 text-sm text-red-700">
            No document issued by Flacron Enterprises LLC has the code <span className="font-mono">{code}</span>. Check the code
            and try again — if it still does not match, the document should not be relied on.
          </p>
        </div>
      </div>
    );
  }
  const withdrawn = !result.valid;
  const rows: Array<[string, string | null]> = [
    ["Document", kindLabel(result.kind)],
    ["Reference", result.number],
    ["Issued to", result.employee_name],
    ["Dated", formatDate(result.document_date)],
    ["Issued by", result.issuer ?? "Flacron Enterprises LLC"],
    ["Verification code", code],
  ];
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${withdrawn ? "border-red-200" : "border-emerald-200"}`}>
      <div className={`flex items-center gap-3 px-5 py-4 ${withdrawn ? "bg-red-50" : "bg-emerald-50"}`}>
        {withdrawn ? <ShieldX className="h-6 w-6 text-red-600" /> : <BadgeCheck className="h-6 w-6 text-emerald-600" />}
        <div>
          <p className={`font-semibold ${withdrawn ? "text-red-800" : "text-emerald-800"}`}>
            {withdrawn ? "This document has been withdrawn" : "Genuine document"}
          </p>
          <p className={`text-sm ${withdrawn ? "text-red-700" : "text-emerald-700"}`}>
            {withdrawn ? "It was issued by Flacron Enterprises LLC but is no longer valid." : "Issued by Flacron Enterprises LLC and still valid."}
          </p>
        </div>
      </div>
      <dl className="divide-y divide-slate-100">
        {rows.filter(([, v]) => v).map(([label, value]) => (
          <div key={label} className="grid grid-cols-3 gap-4 px-5 py-3 text-sm">
            <dt className="text-slate-500">{label}</dt>
            <dd className={`col-span-2 font-medium text-flacron-navy ${label === "Verification code" || label === "Reference" ? "font-mono" : ""}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
