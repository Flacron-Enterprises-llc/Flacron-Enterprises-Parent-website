import { cn } from "@/lib/utils";

interface PageHeroProps {
  /** @deprecated kept for call-site compatibility; the breadcrumbs above the hero replace eyebrow labels (as on Flacron Intel). */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons / links under the description. */
  actions?: React.ReactNode;
  /** Optional right-hand column on large screens (stats, an image, a card). */
  aside?: React.ReactNode;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/** Standard top-of-page header for inner pages: the page's single h1, a lead and optional actions. */
export default function PageHero({ title, description, actions, aside, centered = false, className, children }: PageHeroProps) {
  const center = centered && !aside;
  return (
    <section className={cn("relative", className)}>
      <div className={cn("container-page pb-14 pt-8 sm:pt-10 lg:pb-20", aside && "lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-16")}>
        <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
          <h1 className="font-display text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-text sm:text-[2.9rem]">
            {title}
          </h1>
          {description && (
            <p className={cn("mt-5 max-w-2xl text-[17px] leading-8 text-text-secondary", center && "mx-auto")}>{description}</p>
          )}
          {actions && <div className={cn("mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap", center && "sm:justify-center")}>{actions}</div>}
          {children}
        </div>
        {aside && <div className="mt-10 lg:mt-0">{aside}</div>}
      </div>
    </section>
  );
}
