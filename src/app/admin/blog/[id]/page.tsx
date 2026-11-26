"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import type { BlogPost } from "@/lib/blog";

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then((r) => r.json())
      .then((data) => (data.error ? setError(data.error) : setPost(data)))
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-64">
        <Loader2 size={24} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-600">{error || "Post not found"}</div>
      </div>
    );
  }

  return <BlogPostForm initial={{ ...post, tags: post.tags ?? [], author: post.author || "Flacron Enterprises" }} />;
}
