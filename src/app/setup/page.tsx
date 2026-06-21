// src/app/setup/page.tsx
// DROP-IN REPLACEMENT
// Adds avatar selection as step 2 of the setup flow.
// Step 1: claim username  →  Step 2: pick avatar  →  redirect to /era/[username]

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {GlowBackground} from "@/components/shared/GlowBackground";
import {Navbar} from "@/components/shared/Navbar";
import SetupClient from "@/components/auth/SetupClient";

export default async function SetupPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/");

    const { data: profile } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

    // Already set up
    if (profile?.username) redirect(`/era/${profile.username}`);

    return (
        <>
            <GlowBackground />
            <Navbar />
            <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
                <SetupClient
                    googleAvatarUrl={profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null}
                />
            </main>
        </>
    );
}