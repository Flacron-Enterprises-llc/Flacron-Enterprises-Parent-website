import { App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let app: App;

// Some hosts (e.g. Amplify) truncate multi-line env vars at the first newline,
// so the private key is stored base64-encoded (single line) in production and
// decoded here. Local dev keeps using the raw multi-line FIREBASE_PRIVATE_KEY.
function resolvePrivateKey(): string | undefined {
  const b64 = process.env.FIREBASE_PRIVATE_KEY_B64;
  if (b64) return Buffer.from(b64, "base64").toString("utf8").trim();

  return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function getApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = resolvePrivateKey();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (or FIREBASE_PRIVATE_KEY_B64) in .env.local");
  }

  app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return app;
}

export function getDb(): Firestore {
  return getFirestore(getApp());
}

export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    (process.env.FIREBASE_PRIVATE_KEY_B64 || process.env.FIREBASE_PRIVATE_KEY)
  );
}
