"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Loader2, PencilLine, Save, ExternalLink } from "lucide-react";
import { BLOG_CATEGORIES, slugify, type BlogPost } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";

const input =
  "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]";
const label = "block text-sm font-medium text-slate-700 mb-1.5";

/** ISO -> value for <input type="datetime-local"> in the browser's local time. */
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const EMPTY: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "news",
  tags: [],
  author: "Flacron Enterprises",
  coverImage: "",
  status: "draft",
  publishedAt: new Date().toISOString(),
  excludeFromFeed: false,
};

export default function BlogPostForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const isNew = !initial;
  const [post, setPost] = useState<BlogPost>(initial ?? EMPTY);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(", "));
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) => setPost((p) => ({ ...p, [key]: value }));
  const html = useMemo(() => (preview ? renderMarkdown(post.content) : ""), [preview, post.content]);
  const scheduled = post.status === "published" && Date.parse(post.publishedAt) > Date.now();
  const slugChanged = !isNew && initial && post.slug !== initial.slug;

  async function save(status: BlogPost["status"]) {
    setSaving(true);
    setError("");
    const body = { ...post, status, tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      const res = await fetch(isNew ? "/api/admin/blog" : `/api/admin/blog/${initial!.slug}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/admin/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"><ArrowLeft size={18} /></Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{isNew ? "New post" : "Edit post"}</h1>
            {!isNew && post.status === "published" && (
              <a href={`/blog/${initial!.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#FE4705] inline-flex items-center gap-1 hover:underline">
                View live <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50"
          >
            Save draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("published")}
            className="flex items-center gap-2 px-4 py-2 bg-[#FE4705] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg disabled:opacity-50"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {scheduled ? "Schedule" : post.status === "published" && !isNew ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main */}
        <div className="space-y-5 bg-white rounded-xl border border-slate-200 p-5 sm:p-6">
          <div>
            <label className={label}>Title</label>
            <input
              className={`${input} text-base font-semibold`}
              value={post.title}
              onChange={(e) => {
                const title = e.target.value;
                setPost((p) => ({ ...p, title, slug: slugTouched ? p.slug : slugify(title) }));
              }}
              placeholder="Introducing FlacronBuild 2.0"
            />
          </div>
          <div>
            <label className={label}>URL slug</label>
            <div className="flex items-center rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-[#FE4705]/30 focus-within:border-[#FE4705]">
              <span className="pl-3 text-sm text-slate-400 whitespace-nowrap">/blog/</span>
              <input
                className="flex-1 min-w-0 bg-transparent px-1 py-2 text-sm focus:outline-none"
                value={post.slug}
                onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
              />
            </div>
            {slugChanged && (
              <p className="mt-1.5 text-xs text-amber-600">Changing the slug breaks old links, and the RSS feed (and LinkedIn automation) will treat it as a new post.</p>
            )}
          </div>
          <div>
            <label className={label}>
              Summary <span className="font-normal text-slate-400">— shown on cards, in search results and as the LinkedIn post text ({post.excerpt.length}/300)</span>
            </label>
            <textarea className={input} rows={3} maxLength={300} value={post.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">Content</label>
              <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-medium">
                <button type="button" onClick={() => setPreview(false)} className={`flex items-center gap-1 px-2.5 py-1 rounded-md ${!preview ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}>
                  <PencilLine size={12} /> Write
                </button>
                <button type="button" onClick={() => setPreview(true)} className={`flex items-center gap-1 px-2.5 py-1 rounded-md ${preview ? "bg-slate-100 text-slate-900" : "text-slate-500"}`}>
                  <Eye size={12} /> Preview
                </button>
              </div>
            </div>
            {preview ? (
              <div className="blog-prose min-h-[420px] rounded-lg border border-slate-200 p-5" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <textarea
                className={`${input} font-mono leading-relaxed min-h-[420px]`}
                value={post.content}
                onChange={(e) => set("content", e.target.value)}
                placeholder={"Write in Markdown.\n\n## A heading\n\nA paragraph with **bold**, *italic* and a [link](https://…).\n\n- A list item\n- Another\n\n![Image description](https://…/image.jpg)"}
              />
            )}
            <p className="mt-1.5 text-xs text-slate-400">
              Markdown: <code>## heading</code> · <code>**bold**</code> · <code>*italic*</code> · <code>[link](url)</code> · <code>- list</code> · <code>&gt; quote</code> · <code>![alt](image-url)</code>
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div>
              <label className={label}>Category</label>
              <select className={input} value={post.category} onChange={(e) => set("category", e.target.value as BlogPost["category"])}>
                {BLOG_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Publish date</label>
              <input
                type="datetime-local"
                className={input}
                value={toLocalInput(post.publishedAt)}
                onChange={(e) => e.target.value && set("publishedAt", new Date(e.target.value).toISOString())}
              />
              <p className="mt-1.5 text-xs text-slate-400">A future date schedules the post: it goes live (and into the RSS feed) at that time.</p>
            </div>
            <div>
              <label className={label}>Author</label>
              <input className={input} value={post.author} onChange={(e) => set("author", e.target.value)} />
            </div>
            <div>
              <label className={label}>Tags <span className="font-normal text-slate-400">(comma separated)</span></label>
              <input className={input} value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="AI, Construction" />
            </div>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input type="checkbox" className="mt-0.5 accent-[#FE4705]" checked={!!post.excludeFromFeed} onChange={(e) => set("excludeFromFeed", e.target.checked)} />
              <span>Keep out of the RSS feed <span className="block text-xs text-slate-400">It will not be posted to LinkedIn.</span></span>
            </label>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <label className={label}>Cover image URL</label>
            <input className={input} value={post.coverImage ?? ""} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://… (1200×630 works best)" />
            {post.coverImage && /^(https:\/\/|\/)/.test(post.coverImage) && (
              // eslint-disable-next-line @next/next/no-img-element -- admin preview of an arbitrary URL
              <img src={post.coverImage} alt="" className="mt-3 aspect-[1200/630] w-full rounded-lg object-cover bg-slate-100" />
            )}
            <p className="mt-1.5 text-xs text-slate-400">Used on the blog, in link previews and as the image of the LinkedIn post.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
