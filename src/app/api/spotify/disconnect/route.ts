import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await supabase
    .from("profiles")
    .update({
      spotify_access_token:  null,
      spotify_refresh_token: null,
      spotify_connected_at:  null,
      updated_at:            new Date().toISOString(),
    })
    .eq("id", user.id);

  return NextResponse.json({ ok: true });
}