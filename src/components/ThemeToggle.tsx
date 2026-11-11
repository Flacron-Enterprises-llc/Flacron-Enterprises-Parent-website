"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

/** Sun/moon button that flips between light and dark and remembers the choice. */
export default function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg text-text-secondary transition-colors hover:bg-surface-muted hover:text-text",
        withLabel ? "h-11 px-3 text-sm font-medium" : "h-9 w-9",
        className
      )}
    >
      <span className="relative inline-flex h-[18px] w-[18px]">
        <Sun
          aria-hidden
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-[var(--ease)]",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          )}
        />
        <Moon
          aria-hidden
          className={cn(
            "absolute inset-0 h-[18px] w-[18px] transition-all duration-300 ease-[var(--ease)]",
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          )}
        />
      </span>
      {withLabel && <span>{isDark ? "Light theme" : "Dark theme"}</span>}
    </button>
  );
}
