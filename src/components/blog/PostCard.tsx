import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { categoryLabel, readingMinutes, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function PostCover({ post, className }: { post: BlogPost; className?: string }) {
  if (post.coverImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- cover images are arbitrary URLs entered in the admin
      <img src={post.coverImage} alt="" loading="lazy" className={cn("h-full w-full object-cover", className)} />
    );
  }
  return (
    <div className={cn("band relative flex h-full w-full items-end overflow-hidden p-5", className)}>
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
      <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-accent/35 blur-3xl" />
      <span className="relative text-xs font-semibold uppercase tracking-[0.14em] text-band-muted">{categoryLabel(post.category)}</span>
    </div>
  );
}

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] text-text-muted", className)}>
      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-text">{categoryLabel(post.category)}</span>
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      <span className="flex items-center gap-1"><Clock aria-hidden className="h-3.5 w-3.5" />{readingMinutes(post.content)} min read</span>
    </div>
  );
}

export default function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("card card-interactive group flex overflow-hidden", featured ? "flex-col lg:flex-row" : "flex-col")}
    >
      <div className={cn("shrink-0 overflow-hidden bg-surface-muted", featured ? "aspect-[16/9] lg:aspect-auto lg:w-1/2" : "aspect-[16/9]")}>
        <PostCover post={post} className="transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6")}>
        <PostMeta post={post} />
        <h3
          className={cn(
            "mt-3 font-display font-semibold leading-snug tracking-[-0.015em] text-text transition-colors group-hover:text-accent-text",
            featured ? "text-2xl sm:text-[1.75rem]" : "text-lg"
          )}
        >
          {post.title}
        </h3>
        <p className={cn("mt-2 leading-relaxed text-text-secondary", featured ? "line-clamp-4 text-base" : "line-clamp-3 text-sm")}>{post.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-text transition-colors group-hover:text-accent-text">
          Read article <ArrowUpRight aria-hidden className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
