import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSpotifyAuthUrl } from "@/lib/spotify";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // State = user id — we verify this in the callback to prevent CSRF
  const state = Buffer.from(user.id).toString("base64url");
  const authUrl = getSpotifyAuthUrl(state);

  return NextResponse.redirect(authUrl);
}