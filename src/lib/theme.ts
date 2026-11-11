export type Theme = "light" | "dark";

/** localStorage key holding an explicit visitor choice. No key = follow the system preference. */
export const THEME_STORAGE_KEY = "flacron-theme";

/** Internal areas that are not theme-aware yet; they always render light. */
export const FORCED_LIGHT_PREFIXES = ["/admin", "/dashboard"];

export function isForcedLightPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return FORCED_LIGHT_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Inline <head> script: applies the saved theme (or the system preference) to <html data-theme> before first paint,
 * so there is no flash of the wrong theme. Also enables scroll-reveal styles only when JS (and IntersectionObserver) run,
 * so content is always visible without JS. Kept dependency-free and tiny on purpose.
 */
export const themeInitScript = `(function(){var d=document.documentElement,t;try{var p=location.pathname,f=${JSON.stringify(FORCED_LIGHT_PREFIXES)},forced=false;for(var i=0;i<f.length;i++){if(p===f[i]||p.indexOf(f[i]+'/')===0)forced=true}if(forced){t='light'}else{t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}}}catch(e){t='light'}d.setAttribute('data-theme',t);d.style.colorScheme=t;if('IntersectionObserver' in window)d.classList.add('js-reveal')})();`;
