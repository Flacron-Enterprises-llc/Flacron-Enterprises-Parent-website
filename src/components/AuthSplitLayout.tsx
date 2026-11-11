import Link from "next/link";
import { Check } from "lucide-react";

const highlights = [
  "Industry-tuned AI models for construction, insurance, and sales",
  "Fast inference with usage-based or flat-rate plans",
  "Personalized outputs — your region, units, currency, and markup",
  "SOC 2-ready infrastructure with zero data retention",
];

/**
 * Two-column sign-in shell: navy brand panel (large screens) + form panel. Uses theme tokens, so it follows the
 * site theme on /ai-engine/login and renders light on /dashboard/login (which is forced light).
 */
export default function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left — branding panel */}
      <div className="band relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 -z-10" />

        <div>
          <Link href="/" className="inline-flex items-baseline gap-2 rounded-md">
            <span className="font-display text-2xl font-bold tracking-[0.04em] text-white">FLACRON</span>
            <span className="text-sm font-medium text-[#ffb08a]">AI Engine</span>
          </Link>
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white xl:text-4xl">
            The intelligence behind everything.
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-band-muted">
            One dashboard to manage your API keys, usage, and personalization across the entire Flacron AI ecosystem.
          </p>
          <ul className="mt-7 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-white/85">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8a55]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-band-muted">© 2026 Flacron Enterprises. All rights reserved.</p>
      </div>

      {/* Right — form panel */}
      <div className="flex min-h-screen flex-col justify-center bg-surface px-4 py-12 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto mb-8 w-full max-w-sm text-center lg:hidden">
          <span className="font-display text-2xl font-bold tracking-[0.04em] text-text">FLACRON</span>
          <span className="ml-2 text-sm font-medium text-text-muted">AI Engine</span>
        </div>
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
