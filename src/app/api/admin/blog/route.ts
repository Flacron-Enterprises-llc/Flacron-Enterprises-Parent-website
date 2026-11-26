import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { BLOG_COLLECTION } from "@/lib/blog";
import { getAllPostsRaw } from "@/lib/blog-data";
import { parsePost, revalidateBlog } from "@/lib/blog-admin";

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await getAllPostsRaw();
  if (!posts) return NextResponse.json({ error: "Firestore is not configured or unreachable" }, { status: 503 });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = parsePost(await request.json().catch(() => null));
  if (typeof post === "string") return NextResponse.json({ error: post }, { status: 400 });

  const ref = getDb().collection(BLOG_COLLECTION).doc(post.slug);
  if ((await ref.get()).exists) {
    return NextResponse.json({ error: `A post with the slug "${post.slug}" already exists` }, { status: 409 });
  }
  await ref.set(post);
  revalidateBlog(post.slug);
  return NextResponse.json({ ok: true, slug: post.slug }, { status: 201 });
}
