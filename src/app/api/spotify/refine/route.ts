import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  fetchSpotifyProfile,
  refineEraWithSpotify,
  refreshSpotifyToken,
} from "@/lib/spotify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the board to refine + spotify tokens
  const { boardId } = await req.json();
  if (!boardId) {
    return NextResponse.json({ error: "boardId required" }, { status: 400 });
  }

  // Fetch profile tokens (use service-level select so tokens aren't exposed publicly)
  const { data: profile } = await supabase
    .from("profiles")
    .select("spotify_access_token, spotify_refresh_token, spotify_connected_at")
    .eq("id", user.id)
    .single();

  if (!profile?.spotify_access_token) {
    return NextResponse.json({ error: "Spotify not connected" }, { status: 400 });
  }

  // Fetch the board
  const { data: board } = await supabase
    .from("boards")
    .select("era_name, aesthetic_name, bio, tags")
    .eq("board_id", boardId)
    .single();

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  // Try fetching Spotify data — refresh token if expired
  let accessToken = profile.spotify_access_token;
  let spotifyProfile = null;

  try {
    spotifyProfile = await fetchSpotifyProfile(accessToken);
  } catch {
    // Token likely expired — try refresh
    if (profile.spotify_refresh_token) {
      const newToken = await refreshSpotifyToken(profile.spotify_refresh_token);
      if (newToken) {
        accessToken = newToken;
        // Save refreshed token
        await supabase
          .from("profiles")
          .update({ spotify_access_token: newToken, updated_at: new Date().toISOString() })
          .eq("id", user.id);
        spotifyProfile = await fetchSpotifyProfile(accessToken);
      }
    }
  }

  if (!spotifyProfile) {
    return NextResponse.json(
      { error: "Failed to fetch Spotify data. Try reconnecting." },
      { status: 502 }
    );
  }

  // Refine with Gemini
  try {
    const refined = await refineEraWithSpotify(board, spotifyProfile);
    return NextResponse.json({
      refined,
      spotify: {
        topArtists: spotifyProfile.topArtists.slice(0, 6),
        topGenres:  spotifyProfile.topGenres.slice(0, 6),
        mood:       spotifyProfile.mood,
      },
    });
  } catch (err) {
    console.error("[spotify/refine] Gemini error:", err);
    return NextResponse.json({ error: "Refinement failed" }, { status: 500 });
  }
}