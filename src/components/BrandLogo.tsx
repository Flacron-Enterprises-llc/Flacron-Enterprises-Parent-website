import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Flacron mark + wordmark. Both mark variants are in the markup and CSS shows the one for the active theme, so the
 * right logo is there on first paint (no swap after hydration).
 */
export default function BrandLogo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link href="/" aria-label="Flacron Enterprises — home" className={cn("group flex shrink-0 items-center gap-2.5", className)}>
      {/* eslint-disable @next/next/no-img-element -- tiny local SVGs; next/image adds nothing here */}
      {inverse ? (
        <img src="/logo-mark-dark.svg" alt="" width={34} height={34} className="h-[34px] w-[34px]" />
      ) : (
        <>
          <img src="/logo-mark.svg" alt="" width={34} height={34} className="h-[34px] w-[34px] dark:hidden" />
          <img src="/logo-mark-dark.svg" alt="" width={34} height={34} className="hidden h-[34px] w-[34px] dark:block" />
        </>
      )}
      {/* eslint-enable @next/next/no-img-element */}
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[17px] font-bold tracking-[0.02em]", inverse ? "text-white" : "text-text")}>FLACRON</span>
        <span className={cn("mt-[3px] font-display text-[9.5px] font-medium tracking-[0.32em]", inverse ? "text-[#ff8a55]" : "text-accent-text")}>ENTERPRISES</span>
      </span>
    </Link>
  );
}
