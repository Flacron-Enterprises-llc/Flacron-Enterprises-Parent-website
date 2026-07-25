import apiEngineClient from "./client";

/* ─── Types ────────────────────────────────────────────────────── */
export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface AuditLog {
  id: string;
  action: string;
  admin_id: string;
  timestamp: string;
  details?: string;
}

export interface Client {
  id: string;
  company_name: string;
  email: string;
  plan_name: string;
  billing_status: "active" | "trialing" | "past_due" | "cancelled" | "paused";
  enabled_features: string[];
  monthly_api_limit: number;
  rate_limit_per_minute: number;
  current_usage?: number;
  api_key?: string;
  created_at: string;
  overage_enabled?: boolean;
  audit_logs?: AuditLog[];
}

export interface UsageStats {
  total_requests: number;
  by_feature?: Record<string, number>;
  by_status?: Record<string, number>;
  period?: string;
}

export interface ProviderCost {
  provider: string;
  total_cost: number;
  request_count: number;
}

/* ─── Auth ─────────────────────────────────────────────────────── */
export const login = (email: string, password: string) =>
  apiEngineClient.post<{ token: string; admin: AdminUser }>("/admin/auth/login", { email, password });

export const getMe = () => apiEngineClient.get<AdminUser>("/admin/auth/me");

/* ─── Clients ──────────────────────────────────────────────────── */
export const getClients = () => apiEngineClient.get<Client[]>("/admin/clients");

export const getClient = (id: string) => apiEngineClient.get<Client>(`/admin/clients/${id}`);

export const updateFeatures = (id: string, enabled_features: string[]) =>
  apiEngineClient.patch(`/admin/clients/${id}/features`, { enabled_features });

export const updatePlan = (
  id: string,
  body: { plan_name: string; monthly_api_limit?: number; rate_limit_per_minute?: number }
) => apiEngineClient.patch(`/admin/clients/${id}/plan`, body);

export const updateLimits = (
  id: string,
  body: { monthly_api_limit?: number; rate_limit_per_minute?: number; overage_enabled?: boolean }
) => apiEngineClient.patch(`/admin/clients/${id}/limits`, body);

export const pauseClient = (id: string) => apiEngineClient.post(`/admin/clients/${id}/pause`);

export const reactivateClient = (id: string) => apiEngineClient.post(`/admin/clients/${id}/reactivate`);

export const rotateKey = (id: string) =>
  apiEngineClient.post<{ api_key: string }>(`/admin/clients/${id}/rotate-key`);

export interface CreateClientBody {
  company_name: string;
  contact_email: string;
  plan_name: string;
  monthly_api_limit?: number;
  rate_limit_per_minute?: number;
  overage_enabled?: boolean;
}

export const createClient = (body: CreateClientBody) =>
  apiEngineClient.post<{ client_id: string; company_name: string; api_key: string; prefix: string }>(
    "/admin/clients",
    body
  );

/* ─── Stats ────────────────────────────────────────────────────── */
export const getUsageStats = () => apiEngineClient.get<UsageStats>("/admin/clients/stats/usage");

export const getProviderCosts = () => apiEngineClient.get<ProviderCost[]>("/admin/clients/stats/provider-costs");
