const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  trialing: "Trialing",
  past_due: "Past Due",
  cancelled: "Cancelled",
  paused: "Paused",
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
  free: "Free",
};

export default function StatusBadge({ status, className = "" }: { status: string; className?: string }) {
  const key = status?.toLowerCase().replace(/ /g, "_");
  const label = STATUS_LABELS[key] ?? status;
  return <span className={`badge badge-${key} ${className}`}>{label}</span>;
}
