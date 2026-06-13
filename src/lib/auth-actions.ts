"use server";

// ─────────────────────────────────────────────────────────
// auth-actions.ts
//
// IMPORTANT: This file uses "use server" and next/headers.
// It must NEVER be imported into a Client Component.
// Only import it in:
//   - Server Components
//   - Route Handlers (app/api/...)
//   - Other Server Actions
//
// Client Components should use createClient() from
// @/lib/supabase/client directly for auth operations.
// ─────────────────────────────────────────────────────────

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}