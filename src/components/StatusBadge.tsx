import { cn } from "@/lib/utils";

type Status = "live" | "beta" | "coming-soon" | "internal";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const config: Record<Status, { label: string; dot: string; badge: string; pulse: boolean }> = {
  live: {
    label: "Live",
    dot: "bg-green-500",
    badge: "bg-green-50 border border-green-200 text-green-700",
    pulse: true,
  },
  beta: {
    label: "Beta",
    dot: "bg-[#FE4705]",
    badge: "bg-orange-50 border border-orange-200 text-orange-700",
    pulse: false,
  },
  "coming-soon": {
    label: "Coming Soon",
    dot: "bg-slate-400",
    badge: "bg-slate-100 border border-slate-200 text-slate-600",
    pulse: false,
  },
  internal: {
    label: "Internal",
    dot: "bg-blue-500",
    badge: "bg-blue-50 border border-blue-200 text-blue-700",
    pulse: false,
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, dot, badge, pulse } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
        badge,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", dot)} />
        )}
        <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", dot)} />
      </span>
      {label}
    </span>
  );
}
