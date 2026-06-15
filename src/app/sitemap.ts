import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://eraboard.vercel.app";
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

  // Dynamic public board pages
  const { data: boards } = await supabase
    .from("boards")
    .select("board_id, created_at")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(1000);

  const boardRoutes: MetadataRoute.Sitemap = (boards ?? []).map((b) => ({
    url: `${baseUrl}/result/${b.board_id}`,
    lastModified: new Date(b.created_at),
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  // Dynamic public era profile pages
  const { data: profiles } = await supabase
    .from("profiles")
    .select("username, updated_at")
    .not("username", "is", null);

  const profileRoutes: MetadataRoute.Sitemap = (profiles ?? [])
    .filter((p) => p.username)
    .map((p) => ({
      url: `${baseUrl}/era/${p.username}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...boardRoutes, ...profileRoutes];
}