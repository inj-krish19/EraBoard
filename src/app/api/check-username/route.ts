import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.toLowerCase().trim();

  if (!username) {
    return NextResponse.json({ available: false, error: "No username provided" });
  }

  // Validation rules
  if (username.length < 3) {
    return NextResponse.json({ available: false, error: "Too short — min 3 characters" });
  }
  if (username.length > 24) {
    return NextResponse.json({ available: false, error: "Too long — max 24 characters" });
  }
  if (!/^[a-z0-9_\.]+$/.test(username)) {
    return NextResponse.json({
      available: false,
      error: "Only letters, numbers, _ and . allowed",
    });
  }

  // Reserved usernames
  const reserved = [
    "admin", "about", "quiz", "result", "era", "profile",
    "setup", "api", "login", "signup", "logout", "me",
    "eraboard", "support", "help", "home",
  ];
  if (reserved.includes(username)) {
    return NextResponse.json({ available: false, error: "This username is reserved" });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (s) => s.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  );

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return NextResponse.json({ available: !data, error: data ? "Already taken ✦ try another" : null });
}