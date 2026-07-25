import axios from "axios";

// Points at the standalone FlacronAPIEngine backend (Express + Prisma),
// which is a separate deployable from this Next.js app. Run it locally
// on a port other than 3000 to avoid clashing with `next dev`.
const API_ENGINE_URL = process.env.NEXT_PUBLIC_API_ENGINE_URL || "http://localhost:4000";
const TOKEN_KEY = "flacron_api_engine_admin_token";

export const apiEngineTokenKey = TOKEN_KEY;

const apiEngineClient = axios.create({
  baseURL: API_ENGINE_URL,
  headers: { "Content-Type": "application/json" },
});

apiEngineClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiEngineClient.interceptors.response.use(
  (res) => {
    if (res.data && res.data.status === "success" && "data" in res.data) {
      res.data = res.data.data;
    }
    return res;
  },
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(err);
  }
);

export default apiEngineClient;
