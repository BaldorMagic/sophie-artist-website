// src/app/api/test-file/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  const id = "46c85f73-d474-4358-a9e0-5e28ccf63b75"; // put failing id here
  const r = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/files/${id}`, {
    headers: { Authorization: `Bearer ${process.env.DIRECTUS_ACCESS_TOKEN!}` },
  });
  return NextResponse.json({ status: r.status, body: await r.json().catch(() => ({})) });
}
