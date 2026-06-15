import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { EraProfileClient } from "@/components/era/EraProfileClient";

interface Props {
    params: Promise<{ username: string }>;
}

interface ProfileRow {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://eraboard.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("username", username)
        .single();

    const profile = data as { display_name: string | null; username: string | null } | null;

    if (!profile) return { title: "Era not found | EraBoard" };

    const name = profile.display_name ?? username;

    // Use the latest public board OG image for this profile
    const { data: latestBoard } = await supabase
        .from("boards")
        .select("board_id")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    const ogImage = latestBoard
        ? `${APP_URL}/api/og/board?id=${(latestBoard as { board_id: string }).board_id}`
        : `${APP_URL}/og-image.png`;

    return {
        title: `${name}'s Era | EraBoard`,
        description: `See ${name}'s current aesthetic era and moodboard on EraBoard.`,
        openGraph: {
            title: `${name}'s Era Board`,
            description: `Check out ${name}'s current aesthetic era on EraBoard`,
            url: `${APP_URL}/era/${username}`,
            images: [{ url: ogImage, width: 1200, height: 630, alt: `${name}'s Era Board` }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${name}'s Era Board`,
            description: `Check out ${name}'s current aesthetic era on EraBoard`,
            images: [ogImage],
        },
    };
}

export default async function EraPage({ params }: Props) {
    const { username } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .eq("username", username)
        .single();

    const profile = data as ProfileRow | null;

    if (!profile) notFound();

    const { data: boards } = await supabase
        .from("boards")
        .select("id, board_id, aesthetic_name, era_name, bio, colors, images, tags, created_at")
        .eq("user_id", profile.id)
        .eq("is_public", true)
        .order("created_at", { ascending: false });

    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen pt-24 pb-20 px-4">
                <EraProfileClient
                    profile={profile}
                    boards={(boards ?? []) as any}
                    username={username}
                />
            </main>
        </>
    );
}