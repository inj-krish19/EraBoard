import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { boardId } = await req.json();
    if (!boardId) return NextResponse.json({ ok: false }, { status: 400 });

    const supabase = await createClient();

    // Increment view count using RPC to avoid race conditions
    const { error } = await supabase.rpc("increment_view_count", {
      p_board_id: boardId,
    });

    if (error) {
      // Fallback: manual increment
      const { data: board } = await supabase
        .from("boards")
        .select("view_count")
        .eq("board_id", boardId)
        .single();

      await supabase
        .from("boards")
        .update({ view_count: (board?.view_count || 0) + 1 })
        .eq("board_id", boardId);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}