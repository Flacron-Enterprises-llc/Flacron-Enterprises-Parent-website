export const ADMIN_COOKIE = "flacron_admin_token";

export async function generateToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET || "fallback-secret-change-me";
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode("flacron-admin-v1"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyToken(token: string): Promise<boolean> {
  const expected = await generateToken();
  return token === expected;
}
