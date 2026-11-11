import Link from "next/link";
import { ChevronDown } from "lucide-react";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocumentData = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  intro: LegalBlock[];
  sections: LegalSection[];
  footerSummary: LegalBlock[];
};

function sectionId(index: number, heading: string): string {
  const slug = heading
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${index + 1}-${slug || "section"}`;
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className="mt-4 text-[15px] leading-[1.75] text-text-secondary first:mt-0 sm:text-base">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="mt-4 space-y-2">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-[15px] leading-[1.7] text-text-secondary sm:text-base">
                <span aria-hidden className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

function TocLinks({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="space-y-0.5">
      {sections.map((section, i) => (
        <li key={i}>
          <a
            href={`#${sectionId(i, section.heading)}`}
            className="flex gap-2.5 rounded-lg px-3 py-1.5 text-sm leading-snug text-text-secondary transition-colors hover:bg-surface-muted hover:text-text"
          >
            <span className="w-5 shrink-0 tabular-nums text-text-muted">{i + 1}.</span>
            <span>{section.heading}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Cancellation & Refund Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookies Policy" },
];

export default function LegalDocument({ data }: { data: LegalDocumentData }) {
  const hasToc = data.sections.length > 1;
  return (
    <div className="relative isolate">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />
        <div className="container-page pb-10 pt-8 sm:pb-14 sm:pt-12">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-text">
            <span aria-hidden className="h-px w-6 bg-accent" />
            Legal
          </p>
          <h1 className="max-w-3xl font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] text-text sm:text-5xl">
            {data.title}
          </h1>
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-text-muted">
            <div className="flex gap-1.5">
              <dt>Effective date:</dt>
              <dd className="font-medium text-text-secondary">{data.effectiveDate}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>Last updated:</dt>
              <dd className="font-medium text-text-secondary">{data.lastUpdated}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className={hasToc ? "container-page grid gap-10 py-10 sm:py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16" : "container-page py-10 sm:py-14"}>
        {hasToc && (
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
            {/* Mobile: collapsible */}
            <details className="group card lg:hidden">
              <summary className="flex list-none items-center justify-between gap-3 px-4 py-3.5 text-[15px] font-semibold text-text [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown aria-hidden className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border px-1 py-2">
                <TocLinks sections={data.sections} />
              </div>
            </details>
            {/* Desktop: sticky list */}
            <div className="hidden lg:block">
              <p className="mb-2 px-3 text-sm font-semibold text-text">On this page</p>
              <TocLinks sections={data.sections} />
            </div>
          </nav>
        )}

        <article className="min-w-0 max-w-[70ch]">
          <div className="mb-10">
            <Blocks blocks={data.intro} />
          </div>

          <div className="space-y-10">
            {data.sections.map((section, i) => (
              <section key={i} id={sectionId(i, section.heading)} className="scroll-mt-24 border-t border-border pt-8 first:border-t-0 first:pt-0">
                <h2 className="mb-4 font-display text-xl font-semibold tracking-[-0.02em] text-text sm:text-2xl">
                  <span className="mr-2 tabular-nums text-text-muted">{i + 1}.</span>
                  {section.heading}
                </h2>
                <Blocks blocks={section.blocks} />
              </section>
            ))}
          </div>

          <aside className="mt-14 rounded-[1.25rem] border border-border bg-surface-muted p-5 sm:p-7" aria-label="Summary">
            <h2 className="mb-3 font-display text-lg font-semibold text-text">Summary</h2>
            <Blocks blocks={data.footerSummary} />
            <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-text-muted">
              Questions? See our{" "}
              {legalLinks.map((l, i) => (
                <span key={l.href}>
                  <Link href={l.href} className="font-medium text-accent-text underline-offset-4 hover:underline">{l.label}</Link>
                  {i < legalLinks.length - 2 ? ", " : i === legalLinks.length - 2 ? ", or " : "."}
                </span>
              ))}
            </p>
          </aside>
        </article>
      </div>
    </div>
  );
}
