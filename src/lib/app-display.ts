import {
  Briefcase,
  Building2,
  HeartHandshake,
  Landmark,
  Lock,
  Megaphone,
  Shield,
  Sparkles,
  Trophy,
  Leaf,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { APP_CATEGORIES, type AppCategory, type AppDefinition } from "@/data/apps";
import { productWebsites } from "@/data/product-websites";

/** Only absolute http(s) URLs are rendered as links/images; anything else is ignored. */
export function safeHttpUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

/** The product's live website: the catalog's `websiteUrl`, else the legacy per-slug list. */
export function getAppWebsite(app: Pick<AppDefinition, "slug" | "websiteUrl">): string | undefined {
  return safeHttpUrl(app.websiteUrl) ?? safeHttpUrl(productWebsites[app.slug]);
}

/** Display host for a website link, e.g. "flacronai.com". */
export function websiteHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CATEGORY_ICONS: Record<AppCategory, LucideIcon> = {
  Construction: Building2,
  Insurance: Shield,
  Business: Briefcase,
  Marketing: Megaphone,
  Finance: Landmark,
  Energy: Zap,
  Security: Lock,
  Sports: Trophy,
  Growth: Leaf,
  Community: HeartHandshake,
};

/** Icon for a category; unknown categories (e.g. a new one added in the CMS) get a neutral icon. */
export function categoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category as AppCategory] ?? Sparkles;
}

/** Categories present in the given product list, known ones first in display order, then any unknown ones. */
export function categoriesIn(apps: Pick<AppDefinition, "category">[]): string[] {
  const present = new Set(apps.map((a) => a.category as string).filter(Boolean));
  const known = APP_CATEGORIES.filter((c) => present.has(c));
  const unknown = [...present].filter((c) => !(APP_CATEGORIES as string[]).includes(c)).sort();
  return [...known, ...unknown];
}

export const STATUS_LABELS: Record<AppDefinition["status"], string> = {
  live: "Live",
  beta: "Beta",
  "coming-soon": "Coming soon",
  internal: "Internal",
};
