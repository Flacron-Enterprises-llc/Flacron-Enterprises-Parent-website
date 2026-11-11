import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  priority?: "default" | "featured";
  /** Kept for API compatibility; the old tilt effect was removed. */
  tilt?: boolean;
}

/** Surface card with a calm hover lift. */
export default function GlassCard({ children, className, priority = "default" }: GlassCardProps) {
  return (
    <div className={cn("card card-interactive relative", priority === "featured" && "border-accent-border shadow-md", className)}>
      {children}
    </div>
  );
}
