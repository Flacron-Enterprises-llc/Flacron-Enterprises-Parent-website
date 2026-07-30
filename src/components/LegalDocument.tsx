import Link from "next/link";

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

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base first:mt-0">
            {block.text}
          </p>
        ) : (
          <ul key={i} className="mt-3 space-y-1.5">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#FE4705]" />
                {item}
              </li>
            ))}
          </ul>
        )
      )}
    </>
  );
}

export default function LegalDocument({ data }: { data: LegalDocumentData }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-slate-100 bg-slate-50 px-4 pt-8 pb-10 sm:px-6 sm:pt-12 sm:pb-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FE4705]">Legal</p>
          <h1
            className="mt-2 text-3xl font-black leading-tight text-flacron-navy sm:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk, sans-serif)" }}
          >
            {data.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 sm:text-sm">
            <span>Effective Date: {data.effectiveDate}</span>
            <span>Last Updated: {data.lastUpdated}</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Blocks blocks={data.intro} />
          </div>

          <div className="space-y-8">
            {data.sections.map((section, i) => (
              <div key={i} className="scroll-mt-24">
                <h2 className="text-lg font-bold text-flacron-navy sm:text-xl">
                  {i + 1}. {section.heading}
                </h2>
                <Blocks blocks={section.blocks} />
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Summary</p>
            <Blocks blocks={data.footerSummary} />
            <p className="mt-4 text-xs text-slate-400">
              Questions? See our{" "}
              <Link href="/privacy" className="font-medium text-[#FE4705] hover:underline">Privacy Policy</Link>,{" "}
              <Link href="/terms" className="font-medium text-[#FE4705] hover:underline">Terms &amp; Conditions</Link>,{" "}
              <Link href="/refund-policy" className="font-medium text-[#FE4705] hover:underline">Cancellation &amp; Refund Policy</Link>,{" "}
              <Link href="/disclaimer" className="font-medium text-[#FE4705] hover:underline">Disclaimer</Link>, or{" "}
              <Link href="/cookies" className="font-medium text-[#FE4705] hover:underline">Cookies Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
