// src/app/explore/page.tsx
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";
import {GlowBackground} from "@/components/shared/GlowBackground";
import {Navbar} from "@/components/shared/Navbar";
import {Footer} from "@/components/shared/Footer";

export const metadata: Metadata = {
    title: "Explore Era Boards — EraBoard",
    description:
        "Browse and discover aesthetic era boards from the EraBoard community. Filter by aesthetic, search by era name, and find your next moodboard inspo.",
    openGraph: {
        title: "Explore Era Boards — EraBoard",
        description:
            "Browse and discover aesthetic era boards from the EraBoard community.",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/explore`,
    },
};

async function getInitialBoards() {
    const supabase = await createClient();

    const { data, count } = await supabase
        .from("boards")
        .select(
            `
      id,
      board_id,
      aesthetic_name,
      era_name,
      bio,
      colors,
      images,
      tags,
      created_at,
      view_count,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      )
    `,
            { count: "exact" }
        )
        .eq("is_public", true)
        .order("view_count", { ascending: false, nullsFirst: false })
        .range(0, 17);

    return {
        boards: data || [],
        total: count || 0,
    };
}

export default async function ExplorePage() {
    const { boards, total } = await getInitialBoards();

    return (
        <>
            <GlowBackground />
            <Navbar />
            <main>
                <ExploreClient
                    initialBoards={boards as any}
                    initialTotal={total}
                />
            </main>
            <Footer />
        </>
    );
}