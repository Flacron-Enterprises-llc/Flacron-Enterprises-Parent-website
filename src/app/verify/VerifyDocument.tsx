"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BadgeCheck, CircleAlert, Loader2, Search, ShieldX } from "lucide-react";

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
      <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
        <span aria-hidden className="h-px w-6 bg-accent" />
        Document verification
      </p>
      <h1 className="font-display text-[2.375rem] font-semibold leading-[1.04] tracking-[-0.035em] text-text sm:text-5xl">Verify a document</h1>
      <p className="mb-10 mt-5 text-lg leading-relaxed text-text-secondary">
        Enter the code printed at the bottom of a letter or salary slip issued by Flacron Enterprises LLC to confirm it is genuine.
      </p>

      <form onSubmit={submit} className="card flex flex-col gap-3 p-3 sm:flex-row sm:p-2.5">
        <label htmlFor="verify-code" className="sr-only">Verification code</label>
        <input
          id="verify-code"
          value={input}
          onChange={(e) => setInput(clean(e.target.value))}
          placeholder="e.g. 7S7SE4C3LB"
          autoComplete="off"
          spellCheck={false}
          className="field min-w-0 font-mono text-base tracking-widest placeholder:tracking-normal"
        />
        <button
          type="submit"
          disabled={state.phase === "loading"}
          className="btn btn-primary shrink-0 px-6"
        >
          {state.phase === "loading" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Search aria-hidden className="h-4 w-4" />}
          Verify
        </button>
      </form>

      <div className="mt-8" aria-live="polite">
        {state.phase === "done" && <ResultCard code={state.code} result={state.result} />}
        {state.phase === "error" && (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border border-border bg-warning-soft p-5 text-[15px] text-text">
            <CircleAlert aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <p>{state.message}</p>
          </div>
        )}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-text-muted">
        Only the document type, number, holder&apos;s name, dates and status are shown. For any question about a document,
        contact <a className="font-medium text-text underline underline-offset-4 hover:text-accent-text" href="mailto:Contact@flacronenterprises.com">Contact@flacronenterprises.com</a>.
      </p>
    </>
  );
}

function ResultCard({ code, result }: { code: string; result: Result }) {
  if (!result.issued_at) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-danger-soft p-5">
        <ShieldX aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-danger" />
        <div>
          <p className="font-semibold text-text">No document found</p>
          <p className="mt-1 text-[15px] text-text-secondary">
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
    <div className={"card overflow-hidden"}>
      <div className={`flex items-center gap-3 px-5 py-4 ${withdrawn ? "bg-danger-soft" : "bg-success-soft"}`}>
        {withdrawn ? <ShieldX aria-hidden className="h-6 w-6 shrink-0 text-danger" /> : <BadgeCheck aria-hidden className="h-6 w-6 shrink-0 text-success" />}
        <div>
          <p className={"font-semibold text-text"}>
            {withdrawn ? "This document has been withdrawn" : "Genuine document"}
          </p>
          <p className={"text-sm text-text-secondary"}>
            {withdrawn ? "It was issued by Flacron Enterprises LLC but is no longer valid." : "Issued by Flacron Enterprises LLC and still valid."}
          </p>
        </div>
      </div>
      <dl className="divide-y divide-border">
        {rows.filter(([, v]) => v).map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-1 px-5 py-3 text-sm sm:grid-cols-3 sm:gap-4">
            <dt className="text-text-muted">{label}</dt>
            <dd className={`break-words font-medium text-text sm:col-span-2 ${label === "Verification code" || label === "Reference" ? "font-mono" : ""}`}>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
