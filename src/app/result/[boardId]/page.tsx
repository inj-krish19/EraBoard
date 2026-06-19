// src/app/result/[boardId]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { BoardDetailClient } from "@/components/era/BoardDetailClient";
import ViewTracker from "@/components/board/ViewTracker";

interface Props {
    params: Promise<{ boardId: string }>;
}

interface BoardMeta {
    era_name: string;
    bio: string;
    aesthetic_name: string;
}

interface BoardFull {
    board_id: string;
    aesthetic_name: string;
    era_name: string;
    bio: string;
    affirmation: string | null;
    era_month: string | null;
    playlist: string | null;
    colors: string[];
    images: string[];
    tags: string[];
    created_at: string;
    is_public: boolean;
    profiles: {
        username: string | null;
        display_name: string | null;
        avatar_url: string | null;
    } | null;
}

const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://eraboard.vercel.app";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { boardId } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("boards")
        .select("era_name, bio, aesthetic_name")
        .eq("board_id", boardId)
        .single();

    const board = data as BoardMeta | null;

    if (!board) return { title: "Board not found | EraBoard" };

    const ogImage = `${APP_URL}/api/og/board?id=${boardId}`;

    return {
        title: `${board.era_name} | EraBoard`,
        description: board.bio,
        openGraph: {
            title: board.era_name,
            description: `${board.aesthetic_name} · ${board.bio}`,
            url: `${APP_URL}/result/${boardId}`,
            images: [{ url: ogImage, width: 1200, height: 630, alt: board.era_name }],
        },
        twitter: {
            card: "summary_large_image",
            title: board.era_name,
            description: board.bio,
            images: [ogImage],
        },
    };
}

export default async function BoardDetailPage({ params }: Props) {
    const { boardId } = await params;
    const supabase = await createClient();

    const { data } = await supabase
        .from("boards")
        .select("*, profiles(username, display_name, avatar_url)")
        .eq("board_id", boardId)
        .eq("is_public", true)
        .single();

    const board = data as BoardFull | null;

    if (!board) notFound();

    return (
        <>
            <GlowBackground />
            <Navbar />
            <ViewTracker boardId={boardId} />
            <main className="relative z-10 min-h-screen pt-24 pb-20 px-4">
                <BoardDetailClient board={board} boardId={boardId} />
            </main>
        </>
    );
}