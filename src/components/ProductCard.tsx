import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { AppDefinition } from "@/data/apps";
import AppLogo from "./AppLogo";
import StatusBadge from "./StatusBadge";
import { getAppWebsite, websiteHost } from "@/lib/app-display";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  app: AppDefinition;
  className?: string;
  /** Show the tech-stack chips (the ecosystem grid does; compact lists don't). */
  showStack?: boolean;
  /** Show the app's headline metric if it has one. */
  showMetric?: boolean;
}

/**
 * One product in a grid. The whole card links to the product page (stretched link); "Visit site" sits above that
 * link layer so it stays independently clickable.
 */
export default function ProductCard({ app, className, showStack = false, showMetric = false }: ProductCardProps) {
  const website = getAppWebsite(app);
  return (
    <article className={cn("card card-interactive group relative flex h-full flex-col p-6", className)}>
      <div className="flex items-start justify-between gap-3">
        <AppLogo name={app.name} logoUrl={app.logoUrl} size={52} />
        <StatusBadge status={app.status} />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-[-0.02em] text-text">
        <Link href={`/apps/${app.slug}`} className="after:absolute after:inset-0 after:rounded-[1.25rem] after:content-[''] focus-visible:outline-none">
          {app.name}
        </Link>
      </h3>
      <p className="mt-0.5 text-[13px] font-medium text-text-muted">{app.category}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-text-secondary">{app.shortDescription}</p>

      {showMetric && app.metrics && (
        <div className="mt-4 flex items-baseline gap-2 rounded-xl bg-accent-soft px-3.5 py-2.5">
          <span className="font-display text-lg font-semibold text-accent-text">{app.metrics.value}</span>
          <span className="text-[13px] text-text-secondary">{app.metrics.label}</span>
        </div>
      )}

      {showStack && app.techStack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
          {app.techStack.slice(0, 3).map((tech) => (
            <li key={tech} className="chip">{tech}</li>
          ))}
          {app.techStack.length > 3 && <li className="chip text-text-muted">+{app.techStack.length - 3}</li>}
        </ul>
      )}

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
        <span className="inline-flex items-center gap-1.5 font-semibold text-accent-text">
          Learn more
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1 rounded-md font-medium text-text-secondary transition-colors hover:text-text"
            aria-label={`Visit ${app.name} website (${websiteHost(website)}, opens in a new tab)`}
          >
            Visit site
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
