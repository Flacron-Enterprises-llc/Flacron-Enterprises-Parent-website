/**
 * Server-only client for Flacron Central's public website API: the product catalog (source of truth for the
 * app grid and app pages) and lead intake (contact / book-demo forms). Both are unauthenticated, rate-limited
 * endpoints meant for exactly this site — see Flacron Central's `docs/AWS_DEPLOYMENT.md` and
 * `src/modules/website/public.controller.ts`. Never imported from a "use client" component: it runs server-side
 * only (Server Components, Route Handlers), so there is no browser exposure and no CORS to configure.
 */

function baseUrl(): string | null {
  const url = process.env.CENTRAL_API_URL;
  return url ? url.replace(/\/+$/, "") : null;
}

export function isCentralConfigured(): boolean {
  return !!baseUrl();
}

async function get<T>(path: string): Promise<T | null> {
  const base = baseUrl();
  if (!base) return null;
  try {
    const res = await fetch(`${base}${path}`, {
      // The catalog changes rarely; a short cache keeps every page load from calling out, while still picking
      // up a newly published product within a minute (matches Central's own `Cache-Control: max-age=60`).
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // unreachable: callers fall back to the next source rather than break the page
  }
}

/** The published product catalog, already shaped exactly like `AppDefinition`. Empty/unreachable -> null (caller falls back). */
export async function getCentralCatalog<T>(): Promise<T[] | null> {
  const items = await get<T[]>("/v1/public/catalog");
  return Array.isArray(items) && items.length ? items : null;
}

export async function getCentralCatalogItem<T>(slug: string): Promise<T | null> {
  return get<T>(`/v1/public/catalog/${encodeURIComponent(slug.toLowerCase())}`);
}

export type CentralFormType = "contact" | "book-demo" | "api-access" | "white-label" | "custom-order";

export interface CentralFormInput {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  product?: string;
  team_size?: string;
  message?: string;
  project_type?: string;
  budget?: string;
  marketing_opt_in?: boolean;
  page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Submits a form straight into Flacron Central: it becomes a Contact + Lead in the CRM. Returns whether Central
 * accepted it; callers should still keep their own record of the submission (e.g. send the confirmation email)
 * even when this fails, so a visitor's message is never silently lost because Central was briefly unreachable.
 */
export async function submitToCentral(form: CentralFormType, input: CentralFormInput): Promise<boolean> {
  const base = baseUrl();
  if (!base) return false;
  try {
    const res = await fetch(`${base}/v1/public/forms/${form}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store",
    });
    return res.status === 202;
  } catch {
    return false;
  }
}
