/**
 * Flacron Growth Engine (FCGE): analytics, lead forms/popups and the support chat for this site, all configured in
 * the Growth Engine dashboard — nothing about the popup or chat lives in this codebase.
 *
 * Install, in two steps (same as the other Flacron apps):
 *   1. `installGrowthEngineQueue()` creates `window.FCGE` as an in-memory queue (no request is made).
 *   2. `loadGrowthEngineSdk()` appends `fcge.min.js` once; the SDK drains the queue, tracks SPA navigations by itself,
 *      and brings the chat widget and any forms configured in the dashboard.
 *
 * There is no cookie-consent banner on this site today, so `canLoadGrowthEngine()` only checks the kill switch and the
 * path. If a consent banner is added later, gate it there (and call `loadGrowthEngineSdk()` again when consent lands).
 *
 * Every helper is a no-op when disabled and never throws: analytics must never be why a form submit fails.
 */

// The key is the Growth Engine's *publishable* key: it is meant to ship to the browser (like a Stripe pk) and grants
// no server-side access.
export const GROWTH_ENGINE = {
  appId: "cmujp1y2s01qrjx1i7b8n5p0y",
  key: "pk_live_7a54bbd65028b44091bae648255feeabf5cc2f92daccc3a4", // gitleaks:allow
  endpoint: "https://dleleyb9ufrgz.cloudfront.net",
  sdkUrl: "https://dleleyb9ufrgz.cloudfront.net/sdk/fcge.min.js",
} as const;

/** `NEXT_PUBLIC_FCGE_DISABLED=true` keeps a local or staging build from reporting into the live app. */
export const growthEngineEnabled = process.env.NEXT_PUBLIC_FCGE_DISABLED !== "true";

const METHODS = ["identify", "track", "registerWebinar", "page", "showForm", "reset"] as const;
type Method = (typeof METHODS)[number];

type FcgeClient = {
  appId: string;
  key: string;
  endpoint: string;
  q: Array<[Method, IArguments]>;
} & Record<Method, (...args: unknown[]) => void>;

declare global {
  interface Window {
    FCGE?: FcgeClient;
  }
}

/** Internal areas where the Growth Engine must not load (no tracking, no chat, no popups). */
export function isGrowthEngineExcludedPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/** The one place to add a consent gate later. */
export function canLoadGrowthEngine(pathname: string | null | undefined): boolean {
  return growthEngineEnabled && typeof window !== "undefined" && !isGrowthEngineExcludedPath(pathname);
}

/** Config plus a stub per method that queues its call until the SDK arrives. */
export function installGrowthEngineQueue(): void {
  if (!growthEngineEnabled || typeof window === "undefined" || window.FCGE) return;
  const client = { appId: GROWTH_ENGINE.appId, key: GROWTH_ENGINE.key, endpoint: GROWTH_ENGINE.endpoint, q: [] } as unknown as FcgeClient;
  for (const m of METHODS) {
    client[m] = function queued() {
      // eslint-disable-next-line prefer-rest-params
      client.q.push([m, arguments]);
    };
  }
  window.FCGE = client;
}

/** Append the SDK to <head>, once. */
export function loadGrowthEngineSdk(): void {
  if (!growthEngineEnabled || typeof document === "undefined") return;
  if (document.querySelector(`script[src="${GROWTH_ENGINE.sdkUrl}"]`)) return;
  const script = document.createElement("script");
  script.src = GROWTH_ENGINE.sdkUrl;
  script.async = true;
  document.head.appendChild(script);
}

function client(): FcgeClient | null {
  if (!growthEngineEnabled || typeof window === "undefined") return null;
  if (isGrowthEngineExcludedPath(window.location.pathname)) return null;
  const c = window.FCGE;
  return c && typeof c.track === "function" ? c : null;
}

export interface FcgeIdentity {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
}

/** Tell the Growth Engine who this visitor is (after they gave us their details in a form). Never throws. */
export function fcgeIdentify(identity: FcgeIdentity): void {
  try {
    const c = client();
    const email = identity.email?.trim();
    if (!c || !email) return;
    const traits: Record<string, string> = { email };
    const name = identity.name?.trim();
    const company = identity.company?.trim();
    const phone = identity.phone?.trim();
    if (name) traits.name = name;
    if (company) traits.company = company;
    if (phone) traits.phone = phone;
    c.identify(traits);
  } catch {
    // Analytics must never be the reason an action fails.
  }
}

/** Send a custom event to the Growth Engine. Never throws. */
export function fcgeTrack(event: string, properties?: Record<string, unknown>): void {
  try {
    client()?.track(event, properties ?? {});
  } catch {
    // As above.
  }
}

/** Identify + `form_submitted` in one call, for use right after a successful form submit. */
export function fcgeFormSubmitted(form: string, identity: Partial<FcgeIdentity>): void {
  if (identity.email) fcgeIdentify(identity as FcgeIdentity);
  fcgeTrack("form_submitted", { form });
}
