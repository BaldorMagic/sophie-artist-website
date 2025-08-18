// src/app/api/image/[id]/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 60;

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL!;
const TOKEN = process.env.DIRECTUS_ACCESS_TOKEN!;

// 1x1 transparent PNG
const FALLBACK = Uint8Array.from([
  137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,1,0,0,0,1,8,6,0,0,0,31,21,196,137,
  0,0,0,12,73,68,65,84,120,156,99,0,1,0,0,5,0,1,13,10,42,186,0,0,0,0,73,69,78,68,174,66,96,130
]).buffer;

// strict UUID v4 check (matches Directus file IDs)
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  // Guard: ignore anything that’s not a UUID (e.g., "installHook.js.map")
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid file id" }, { status: 400 });
  }

  const upstream = await fetch(`${DIRECTUS_URL}/assets/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });

  if (!upstream.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Directus asset fetch failed:", upstream.status, upstream.statusText, `id=${id}`);
    }
    return new NextResponse(FALLBACK, {
      status: 200,
      headers: {
        "content-type": "image/png",
        "cache-control": "no-store",
        "content-length": String((FALLBACK as ArrayBuffer).byteLength),
      },
    });
  }

  const ct = upstream.headers.get("content-type") || "";
  if (!ct.startsWith("image/")) {
    if (process.env.NODE_ENV !== "production") {
      const text = await upstream.text().catch(() => "");
      console.error("Directus returned non-image:", ct, text.slice(0, 120), `id=${id}`);
    }
    return new NextResponse(FALLBACK, {
      status: 200,
      headers: {
        "content-type": "image/png",
        "cache-control": "no-store",
        "content-length": String((FALLBACK as ArrayBuffer).byteLength),
      },
    });
  }

  const buf = await upstream.arrayBuffer();
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "content-type": ct,
      "content-length": upstream.headers.get("content-length") || String(buf.byteLength),
      "cache-control": upstream.headers.get("cache-control") || "public, max-age=60",
      "accept-ranges": "bytes",
      ...(upstream.headers.get("etag") ? { etag: upstream.headers.get("etag")! } : {}),
    },
  });
}
