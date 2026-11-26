"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Search, Trash2, Pencil, Loader2, Rss } from "lucide-react";
import { categoryLabel, isLive, type BlogPost } from "@/lib/blog";

function statusOf(post: BlogPost): { label: string; cls: string } {
  if (post.status === "draft") return { label: "Draft", cls: "bg-slate-100 text-slate-700" };
  if (!isLive(post)) return { label: "Scheduled", cls: "bg-blue-100 text-blue-700" };
  return { label: "Published", cls: "bg-emerald-100 text-emerald-700" };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Failed to load posts");
        setPosts(data);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(post: BlogPost) {
    if (!confirm(`Delete "${post.title}"? This is permanent.`)) return;
    setDeleting(post.slug);
    const res = await fetch(`/api/admin/blog/${post.slug}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.slug !== post.slug));
    setDeleting(null);
  }

  const q = filter.toLowerCase();
  const filtered = posts.filter((p) => !q || p.title.toLowerCase().includes(q) || categoryLabel(p.category).toLowerCase().includes(q));

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog</h1>
          <p className="text-sm text-slate-500 mt-1">
            Published posts appear on <Link href="/blog" target="_blank" className="text-[#FE4705] hover:underline">/blog</Link> and in the{" "}
            <a href="/rss.xml" target="_blank" className="text-[#FE4705] hover:underline">RSS feed</a> that posts to LinkedIn.
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/rss.xml" target="_blank" className="flex items-center gap-2 px-3 py-2 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50">
            <Rss size={15} /> Feed
          </a>
          <Link href="/admin/blog/new" className="flex items-center gap-2 px-4 py-2 bg-[#FE4705] hover:bg-[#ea6b0e] text-white text-sm font-semibold rounded-lg transition-colors">
            <Plus size={16} /> New post
          </Link>
        </div>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search posts…"
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FE4705]/30 focus:border-[#FE4705]"
        />
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 size={22} className="animate-spin text-slate-400" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500">
            {posts.length === 0 ? "No posts yet. Write the first one." : "No posts match your search."}
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((post) => {
              const s = statusOf(post);
              return (
                <li key={post.slug} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                  <div className="min-w-0 flex-1">
                    <Link href={`/admin/blog/${post.slug}`} className="font-semibold text-slate-900 hover:text-[#FE4705] line-clamp-1">{post.title}</Link>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${s.cls}`}>{s.label}</span>
                      <span>{categoryLabel(post.category)}</span>
                      <span>{new Date(post.publishedAt).toLocaleString()}</span>
                      {post.excludeFromFeed && <span className="text-amber-600">Not in RSS</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {s.label === "Published" && (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" title="View" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                        <ExternalLink size={15} />
                      </a>
                    )}
                    <Link href={`/admin/blog/${post.slug}`} title="Edit" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                      <Pencil size={15} />
                    </Link>
                    <button onClick={() => handleDelete(post)} disabled={deleting === post.slug} title="Delete" className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-50">
                      {deleting === post.slug ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
