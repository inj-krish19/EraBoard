// src/app/api/compare-user/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Use a plain fetch against Supabase REST API with the anon key.
// This bypasses any session-cookie requirement and works for all public profiles.
// After the RLS migration (profiles_public_read policy), anon can SELECT profiles.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

async function supabaseGet(path: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0] ?? null : data;
}

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  if (!username) return NextResponse.json(null, { status: 400 });

  // Fetch profile by username
  const profile = await supabaseGet(
    `profiles?username=eq.${encodeURIComponent(username)}&select=id,username,display_name,avatar_url,avatar_type&limit=1`
  );

  if (!profile) {
    return NextResponse.json(null, { status: 404 });
  }

  // Fetch their latest public board
  const board = await supabaseGet(
    `boards?user_id=eq.${profile.id}&is_public=eq.true&select=board_id,aesthetic_name,era_name,bio,colors,images,tags&order=created_at.desc&limit=1`
  );

  return NextResponse.json({
    username: profile.username,
    display_name: profile.display_name,
    avatar_url: profile.avatar_url,
    avatar_type: profile.avatar_type,
    latest_board: board ?? null,
  });
}