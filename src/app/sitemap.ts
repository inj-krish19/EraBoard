import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Board } from "@/types/database";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Always use the canonical production domain
    const baseUrl = "https://eraboard.vercel.app";

    const supabase = await createClient();

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/quiz`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];

    // Public boards
    const { data: boards } = await supabase
        .from("boards")
        .select("board_id, created_at")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(1000);

    const boardRoutes: MetadataRoute.Sitemap =
        (boards ?? []).map((board: Pick<Board, "board_id" | "created_at">) => ({
            url: `${baseUrl}/result/${board.board_id}`,
            lastModified: new Date(board.created_at),
            changeFrequency: "never",
            priority: 0.6,
        }));

    // Public profiles
    const { data: profiles } = await supabase
    .from("profiles")
    .select("username, updated_at")
    .returns<{ username: string | null; updated_at: string | null }[]>();

    const profileRoutes: MetadataRoute.Sitemap = (profiles ?? [])
    .filter((profile) => profile.username)
    .map((profile) => ({
        url: `${baseUrl}/era/${profile.username!}`,
        lastModified: profile.updated_at
            ? new Date(profile.updated_at)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    return [
        ...staticRoutes,
        ...boardRoutes,
        ...profileRoutes,
    ];
}