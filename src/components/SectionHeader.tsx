import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
  /** For use on the navy band. */
  light?: boolean;
  className?: string;
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2";
}

/** Section title block. Left-aligned by default; the eyebrow is a short sentence-case kicker in the accent colour. */
export default function SectionHeader({ eyebrow, title, description, centered = false, light = false, className, as = "h2" }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={cn("mb-12 max-w-2xl sm:mb-14", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-4 text-sm font-medium", light ? "text-[#ff8a55]" : "text-accent-text")}>{eyebrow}</p>
      )}
      <Heading
        className={cn(
          "font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2.3rem]",
          light ? "text-white" : "text-text"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-4 text-[16.5px] leading-7", centered && "mx-auto max-w-2xl", light ? "text-white/75" : "text-text-secondary")}>
          {description}
        </p>
      )}
    </div>
  );
}
