import { cn } from "@/lib/utils";

type Status = "live" | "beta" | "coming-soon" | "internal";

interface StatusBadgeProps {
  status: Status;
  className?: string;
  /** Smaller pill for dense lists (menus). */
  compact?: boolean;
}

const config: Record<Status, { label: string; dot: string; badge: string }> = {
  live: { label: "Live", dot: "bg-success", badge: "bg-success-soft text-success" },
  beta: { label: "Beta", dot: "bg-accent", badge: "bg-accent-soft text-accent-text" },
  "coming-soon": { label: "Coming soon", dot: "bg-text-muted", badge: "bg-surface-muted text-text-secondary" },
  internal: { label: "Internal", dot: "bg-info", badge: "bg-info-soft text-info" },
};

export default function StatusBadge({ status, className, compact = false }: StatusBadgeProps) {
  const { label, dot, badge } = config[status] ?? config["coming-soon"];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full font-semibold",
        compact ? "px-1.5 py-0.5 text-[10.5px]" : "px-2.5 py-1 text-xs",
        badge,
        className
      )}
    >
      <span aria-hidden className={cn("inline-flex h-1.5 w-1.5 rounded-full", dot)} />
      {label}
    </span>
  );
}
