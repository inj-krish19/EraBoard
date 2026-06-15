import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { ProfileClient } from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
    title: "My Profile | EraBoard",
};

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const { data: boards } = await supabase
        .from("boards")
        .select("id, board_id, aesthetic_name, era_name, bio, colors, images, tags, created_at, is_public")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen pt-24 pb-20 px-4">
                <ProfileClient
                    user={user}
                    profile={profile}
                    boards={boards ?? []}
                />
            </main>
        </>
    );
}