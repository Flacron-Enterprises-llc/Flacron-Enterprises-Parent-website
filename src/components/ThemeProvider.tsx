"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { THEME_STORAGE_KEY, isForcedLightPath, type Theme } from "@/lib/theme";

interface ThemeContextValue {
  /** The theme currently applied to the page. */
  theme: Theme;
  /** True when the visitor picked a theme explicitly (stored); false while following the system preference. */
  isExplicit: boolean;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const LOCAL_CHANGE = "flacron-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// Fallback when localStorage is blocked: the choice lasts for this page view.
let memoryChoice: Theme | null = null;

function readStored(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY);
    return v === "light" || v === "dark" ? v : memoryChoice;
  } catch {
    return memoryChoice;
  }
}

/**
 * The visitor's preference as an external store: the stored choice, else the OS setting. Updates on an explicit
 * choice (this tab), on a choice made in another tab (storage event) and on an OS theme change.
 */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  const onStorage = (e: StorageEvent) => { if (e.key === THEME_STORAGE_KEY) onChange(); };
  mq.addEventListener("change", onChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCAL_CHANGE, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCAL_CHANGE, onChange);
  };
}
const getPreferred = (): Theme => readStored() ?? (window.matchMedia(DARK_QUERY).matches ? "dark" : "light");
const getExplicit = (): boolean => readStored() !== null;
// The server cannot know the visitor's theme; the inline head script has already painted the right one.
const getServerPreferred = (): Theme => "light";
const getServerExplicit = () => false;

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  if (root.getAttribute("data-theme") === theme) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduce) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
  }
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const forcedLight = isForcedLightPath(pathname);
  const preferred = useSyncExternalStore(subscribe, getPreferred, getServerPreferred);
  const isExplicit = useSyncExternalStore(subscribe, getExplicit, getServerExplicit);
  const theme: Theme = forcedLight ? "light" : preferred;

  // Keep <html data-theme> in sync (route changes into/out of the forced-light areas, OS changes, other tabs).
  // Reads the live preference rather than `theme`: during hydration `theme` is still the server value ("light"),
  // and applying that would flash a dark page to light.
  useEffect(() => {
    applyTheme(forcedLight ? "light" : getPreferred(), false);
  }, [theme, forcedLight]);

  const setTheme = useCallback((next: Theme) => {
    memoryChoice = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice still applies for this page view */
    }
    applyTheme(next, true);
    window.dispatchEvent(new Event(LOCAL_CHANGE));
  }, []);

  const toggle = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [setTheme, theme]);

  const value = useMemo(() => ({ theme, isExplicit, setTheme, toggle }), [theme, isExplicit, setTheme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) return { theme: "light", isExplicit: false, setTheme: () => {}, toggle: () => {} };
  return ctx;
}
