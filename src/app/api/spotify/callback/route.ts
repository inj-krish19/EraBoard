import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { exchangeSpotifyCode } from "@/lib/spotify";

export const runtime = "nodejs";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // User denied access
  if (error || !code || !state) {
    console.log({
    error,
    code,
    state,
});

    return NextResponse.redirect(
      `${APP_URL}/profile?tab=settings&spotify=denied`
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${APP_URL}/`);
  }

  // Verify state matches user id (CSRF protection)
  const expectedState = Buffer.from(user.id).toString("base64url");
  if (state !== expectedState) {
    return NextResponse.redirect(
      `${APP_URL}/profile?tab=settings&spotify=error`
    );
  }

  // Exchange code for tokens
  const tokens = await exchangeSpotifyCode(code);
  if (!tokens) {
    return NextResponse.redirect(
      `${APP_URL}/profile?tab=settings&spotify=error`
    );
  }

  // Store tokens on the profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      spotify_access_token:  tokens.access_token,
      spotify_refresh_token: tokens.refresh_token,
      spotify_connected_at:  new Date().toISOString(),
      updated_at:            new Date().toISOString(),
    })
    .eq("id", user.id);

  if (updateError) {
    console.error("[spotify/callback] Failed to save tokens:", updateError.message);
    return NextResponse.redirect(
      `${APP_URL}/profile?tab=settings&spotify=error`
    );
  }

  return NextResponse.redirect(
    `${APP_URL}/profile?tab=settings&spotify=connected`
  );
}