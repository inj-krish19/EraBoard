import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { result, answers } = body;

    if (!result) {
      return NextResponse.json({ error: "No result provided" }, { status: 400 });
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) =>
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            ),
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    const board_id = nanoid(10);

    const { data, error } = await supabase
      .from("boards")
      .insert({
        board_id,
        user_id: user?.id ?? null,
        aesthetic_name: result.aesthetic_name,
        era_name:       result.era_name,
        bio:            result.bio,
        affirmation:    result.affirmation  ?? null,
        era_month:      result.era_month    ?? null,
        playlist:       result.playlist     ?? null,
        colors:         result.colors,
        images:         result.images,
        tags:           result.tags,
        quiz_answers:   answers ?? {},
        is_public:      true,
      })
      .select("board_id")
      .single();

    if (error) {
      console.error("[save-board] Supabase error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ board_id: data.board_id });
  } catch (err) {
    console.error("[save-board] Error:", err);
    return NextResponse.json({ error: "Failed to save board" }, { status: 500 });
  }
}