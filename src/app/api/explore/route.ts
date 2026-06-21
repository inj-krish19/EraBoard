// src/app/api/explore/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  // Ask PostgREST to embed the count header
  Prefer: "count=exact",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const aesthetic = searchParams.get("aesthetic") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "popular";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 18;
  const offset = (page - 1) * limit;

  // Build query string
  const params = new URLSearchParams();
  params.set("is_public", "eq.true");
  params.set(
    "select",
    "board_id,aesthetic_name,era_name,bio,colors,images,tags,created_at,view_count,profiles:user_id(username,display_name,avatar_url,avatar_type)"
  );

  if (aesthetic && aesthetic !== "all") {
    params.set("aesthetic_name", `ilike.*${aesthetic}*`);
  }

  if (search) {
    // PostgREST OR filter
    params.set("or", `(era_name.ilike.*${search}*,bio.ilike.*${search}*)`);
  }

  if (sort === "popular") {
    params.set("order", "view_count.desc.nullslast");
  } else {
    params.set("order", "created_at.desc");
  }

  // Range header for pagination
  const rangeFrom = offset;
  const rangeTo = offset + limit - 1;

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/boards?${params.toString()}`,
    {
      headers: {
        ...HEADERS,
        Range: `${rangeFrom}-${rangeTo}`,
        "Range-Unit": "items",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  // PostgREST returns total count in Content-Range header: "0-17/342"
  const contentRange = res.headers.get("content-range") || "";
  const total = parseInt(contentRange.split("/")[1] ?? "0") || 0;

  const boards = await res.json();

  return NextResponse.json({
    boards: boards || [],
    total,
    page,
    hasMore: offset + limit < total,
  });
}