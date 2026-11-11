import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Flacron mark + wordmark. Both mark variants are in the markup and CSS shows the one for the active theme, so the
 * right logo is there on first paint (no swap after hydration).
 */
export default function BrandLogo({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <Link href="/" aria-label="Flacron Enterprises — home" className={cn("group flex shrink-0 items-center gap-2.5", className)}>
      {/* eslint-disable @next/next/no-img-element -- tiny local images; next/image adds nothing here */}
      {/* The official FE mark (cut from /logo.png); the dark variant has the navy strokes in white. */}
      {inverse ? (
        <img src="/brand/fe-mark-dark-128.png" alt="" width={32} height={35} className="h-[35px] w-auto" />
      ) : (
        <>
          <img src="/brand/fe-mark-128.png" alt="" width={32} height={35} className="h-[35px] w-auto dark:hidden" />
          <img src="/brand/fe-mark-dark-128.png" alt="" width={32} height={35} className="hidden h-[35px] w-auto dark:block" />
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
