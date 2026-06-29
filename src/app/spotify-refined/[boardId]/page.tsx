// src/app/spotify-refined/[boardId]/page.tsx
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
    fetchSpotifyProfile,
    refineEraWithSpotify,
    refreshSpotifyToken,
} from "@/lib/spotify";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import SpotifyRefinedClient from "@/components/spotify/SpotifyRefinedClient";

interface Props {
    params: Promise<{ boardId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { boardId } = await params;
    const supabase = await createClient();

    const { data: board } = await supabase
        .from("boards")
        .select("era_name, aesthetic_name")
        .eq("board_id", boardId)
        .single();

    if (!board) return { title: "Refined Era | EraBoard" };

    return {
        title: `${board.era_name} — Sonic Refined | EraBoard`,
        description: `A Spotify-refined aesthetic identity blending ${board.aesthetic_name} visuals with sonic soul.`,
    };
}

export default async function SpotifyRefinedPage({ params }: Props) {
    const { boardId } = await params;
    const supabase = await createClient();

    // Must be logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect(`/result/${boardId}`);

    // Fetch the board
    const { data: board } = await supabase
        .from("boards")
        .select("board_id, user_id, aesthetic_name, era_name, bio, tags, colors, images")
        .eq("board_id", boardId)
        .single();

    if (!board) notFound();

    // Only the board owner can access this page
    if (board.user_id !== user.id) redirect(`/result/${boardId}`);

    // Get Spotify tokens
    const { data: profile } = await supabase
        .from("profiles")
        .select("spotify_access_token, spotify_refresh_token, spotify_connected_at")
        .eq("id", user.id)
        .single();

    // Not connected — redirect back to result with a hint
    if (!profile?.spotify_access_token) {
        redirect(`/result/${boardId}?spotify=not-connected`);
    }

    // Fetch Spotify data — refresh if needed
    let accessToken = profile.spotify_access_token;
    let spotifyProfile = null;

    try {
        spotifyProfile = await fetchSpotifyProfile(accessToken);
    } catch {
        if (profile.spotify_refresh_token) {
            const newToken = await refreshSpotifyToken(profile.spotify_refresh_token);
            if (newToken) {
                accessToken = newToken;
                await supabase
                    .from("profiles")
                    .update({ spotify_access_token: newToken, updated_at: new Date().toISOString() })
                    .eq("id", user.id);
                try {
                    spotifyProfile = await fetchSpotifyProfile(accessToken);
                } catch {
                    redirect(`/result/${boardId}?spotify=error`);
                }
            }
        }
    }

    if (!spotifyProfile) redirect(`/result/${boardId}?spotify=error`);

    // Run Gemini refinement server-side so the page loads with data
    const refined = await refineEraWithSpotify(
        {
            era_name: board.era_name,
            aesthetic_name: board.aesthetic_name,
            bio: board.bio,
            tags: board.tags,
        },
        spotifyProfile
    );

    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen pt-24 pb-20 px-4">
                <SpotifyRefinedClient
                    board={board as any}
                    refined={refined}
                    spotify={{
                        topArtists: spotifyProfile.topArtists.slice(0, 8),
                        topGenres: spotifyProfile.topGenres.slice(0, 8),
                        mood: spotifyProfile.mood,
                    }}
                />
            </main>
            <Footer />
        </>
    );
}