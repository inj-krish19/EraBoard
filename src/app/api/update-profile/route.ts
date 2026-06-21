// src/app/api/update-profile/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const VALID_AVATAR_TYPES = [
  "cottagecore",
  "darkacademia",
  "y2k",
  "softgirl",
  "ethereal",
  "grunge",
  "coquette",
  null,
] as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, display_name, avatar_type } = body;

    // avatar_type-only updates are valid (no username required)
    const isAvatarOnlyUpdate = avatar_type !== undefined && username === undefined;

    if (!isAvatarOnlyUpdate && !username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (s) =>
            s.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            ),
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Build update payload dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    // ── Username + display_name ───────────────────────────────────────────────
    if (username !== undefined) {
      const cleaned = username.toLowerCase().trim();

      if (!/^[a-z0-9_]{2,30}$/.test(cleaned)) {
        return NextResponse.json(
          { error: "Username must be 2-30 characters: lowercase letters, numbers, underscores only." },
          { status: 400 }
        );
      }

      // Race-condition safety: check uniqueness server-side
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", cleaned)
        .neq("id", user.id)
        .single();

      if (existing) {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }

      updates.username = cleaned;
    }

    if (display_name !== undefined) {
      updates.display_name = display_name?.trim() || null;
    }

    // ── Avatar type ───────────────────────────────────────────────────────────
    if (avatar_type !== undefined) {
      if (!VALID_AVATAR_TYPES.includes(avatar_type)) {
        return NextResponse.json({ error: "Invalid avatar type." }, { status: 400 });
      }
      // null = revert to Google avatar
      updates.avatar_type = avatar_type ?? null;
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) {
      console.error("[update-profile] Error:", error.message);
      // Unique constraint violation
      if (error.code === "23505") {
        return NextResponse.json({ error: "Username already taken" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      username: updates.username,
    });
  } catch (err) {
    console.error("[update-profile] Unexpected error:", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}