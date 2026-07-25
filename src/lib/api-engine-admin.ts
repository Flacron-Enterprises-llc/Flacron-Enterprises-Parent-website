// Server-only helper for provisioning API Engine clients from within the main
// site's admin (e.g. the Leads "Add to API Engine" action). Talks to the
// FlacronAPIEngine backend over plain HTTP using an admin account configured
// via API_ENGINE_ADMIN_EMAIL / API_ENGINE_ADMIN_PASSWORD.

const BASE_URL = process.env.NEXT_PUBLIC_API_ENGINE_URL || "http://localhost:4000";

export type ApiEnginePlan = "starter" | "professional" | "enterprise" | "white_label";

export class ApiEngineError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function getAdminToken(): Promise<string> {
  const email = process.env.API_ENGINE_ADMIN_EMAIL;
  const password = process.env.API_ENGINE_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new ApiEngineError("API_ENGINE_ADMIN_EMAIL / API_ENGINE_ADMIN_PASSWORD not configured", 500);
  }

  const res = await fetch(`${BASE_URL}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiEngineError(data?.message || "API Engine admin login failed", res.status, data?.error);
  }
  return data.token as string;
}

/** Infer an API Engine plan tier from what a lead actually asked about. */
export function guessApiEnginePlan(lead: {
  subject?: string;
  product?: string;
  teamSize?: string;
  source?: string;
}): ApiEnginePlan {
  const text = `${lead.subject || ""} ${lead.product || ""}`.toLowerCase();

  if (lead.source === "white-label" || text.includes("white-label") || text.includes("white label")) {
    return "white_label";
  }
  if (text.includes("enterprise")) return "enterprise";
  if (text.includes("professional") || text.includes("growth") || text.includes("pro")) return "professional";
  return "starter";
}

export interface CreatedApiEngineClient {
  client_id: string;
  company_name: string;
  api_key: string;
  prefix: string;
}

export async function createApiEngineClient(input: {
  company_name: string;
  contact_email: string;
  plan_name: ApiEnginePlan;
}): Promise<CreatedApiEngineClient> {
  const token = await getAdminToken();

  const res = await fetch(`${BASE_URL}/admin/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiEngineError(data?.message || "Failed to create API Engine client", res.status, data?.error);
  }

  return data as CreatedApiEngineClient;
}
