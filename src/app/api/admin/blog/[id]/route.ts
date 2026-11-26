import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-server";
import { isAdminRequest } from "@/lib/admin-auth";
import { BLOG_COLLECTION } from "@/lib/blog";
import { parsePost, revalidateBlog } from "@/lib/blog-admin";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const doc = await getDb().collection(BLOG_COLLECTION).doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...doc.data(), slug: doc.id });
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const post = parsePost(await request.json().catch(() => null));
  if (typeof post === "string") return NextResponse.json({ error: post }, { status: 400 });

  const col = getDb().collection(BLOG_COLLECTION);
  if (post.slug !== id) {
    // Renamed slug: the doc id is the slug, so move it. Note the RSS <guid> changes too, so feed readers
    // (and the LinkedIn automation) will treat it as a new post — the editor warns about this.
    if ((await col.doc(post.slug).get()).exists) {
      return NextResponse.json({ error: `A post with the slug "${post.slug}" already exists` }, { status: 409 });
    }
    await col.doc(post.slug).set(post);
    await col.doc(id).delete();
    revalidateBlog(id);
  } else {
    await col.doc(id).set(post);
  }
  revalidateBlog(post.slug);
  return NextResponse.json({ ok: true, slug: post.slug });
}

export async function DELETE(request: NextRequest, { params }: Ctx) {
  if (!(await isAdminRequest(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await getDb().collection(BLOG_COLLECTION).doc(id).delete();
  revalidateBlog(id);
  return NextResponse.json({ ok: true });
}
