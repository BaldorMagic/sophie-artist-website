// src/app/api/whoami/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  const r = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/users/me`, {
    headers: { Authorization: `Bearer ${process.env.DIRECTUS_ACCESS_TOKEN!}` },
  });
  return NextResponse.json({ status: r.status, body: await r.json().catch(() => ({})) });
}
