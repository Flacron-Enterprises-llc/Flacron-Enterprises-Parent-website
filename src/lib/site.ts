const DEFAULT_SITE_URL = "https://www.flacronenterprises.com";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

export const SITE_NAME = "Flacron Enterprises";

export const LEGAL_NAME = "Flacron Enterprises LLC";

export const SITE_DESCRIPTION =
  "Flacron Enterprises builds AI-powered apps that transform business across construction, insurance, sales, cybersecurity, sports, and personal growth.";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/profile.php?id=61579538447653",
  "https://www.linkedin.com/company/109062090",
  "https://www.instagram.com/flacronenterprisesllc/",
  "https://x.com/flacron14958",
  "https://www.youtube.com/@FlacronEnterprises",
  "https://www.pinterest.com/rodrigue0435",
  "https://www.tiktok.com/@flacronenterprises",
  "https://bsky.app/profile/flacronenterprises.bsky.social",
  // "https://www.crunchbase.com/organization/flacron-enterprises",
];

export const OG_IMAGE = "/og-image.png";

export const LOGO_PATH = "/logo.png";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
