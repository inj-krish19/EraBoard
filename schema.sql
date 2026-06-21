-- ─────────────────────────────────────────
-- EraBoard — Supabase SQL Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────

-- ── 1. PROFILES ──────────────────────────
-- Auto-created when a user signs up via Google OAuth

create table if not exists public.profiles (
  id            uuid primary key references auth.users (id) on delete cascade,
  username      text unique,
  display_name  text,
  avatar_url    text,
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

-- Auto-insert profile on new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Trigger: fires after every new auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on profile changes
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();


-- ── 2. BOARDS ────────────────────────────

create table if not exists public.boards (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles (id) on delete set null,
  board_id        text unique not null,       -- nanoid, used in /result/:board_id
  aesthetic_name  text not null,
  era_name        text not null,
  bio             text not null,
  colors          text[] not null default '{}',
  images          text[] not null default '{}',
  tags            text[] not null default '{}',
  quiz_answers    jsonb not null default '{}',
  is_public       boolean not null default true,
  created_at      timestamptz default now() not null
);

-- Index: look up boards by user
create index if not exists boards_user_id_idx on public.boards (user_id);
-- Index: look up boards by board_id (share URL)
create index if not exists boards_board_id_idx on public.boards (board_id);


-- ── 3. ROW LEVEL SECURITY ────────────────

alter table public.profiles enable row level security;
alter table public.boards   enable row level security;

-- Profiles: users can read their own; public read of display_name/avatar/username
create policy "profiles: own read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: own update"
  on public.profiles for update
  using (auth.uid() = id);

-- Boards: anyone can read public boards
create policy "boards: public read"
  on public.boards for select
  using (is_public = true);

-- Boards: owner can read all their boards (including private)
create policy "boards: own read"
  on public.boards for select
  using (auth.uid() = user_id);

-- Boards: authenticated users can insert
create policy "boards: authenticated insert"
  on public.boards for insert
  with check (auth.uid() = user_id);

-- Boards: anon boards (user_id IS NULL) can be inserted by anyone
create policy "boards: anon insert"
  on public.boards for insert
  with check (user_id is null);

-- Boards: owner can update their boards
create policy "boards: own update"
  on public.boards for update
  using (auth.uid() = user_id);

-- Boards: owner can delete their boards
create policy "boards: own delete"
  on public.boards for delete
  using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────
-- EraBoard — Migration 1: add affirmation, era_month, playlist
-- Run in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────
 
alter table public.boards
  add column if not exists affirmation  text,
  add column if not exists era_month    text,
  add column if not exists playlist     text;
 

-- ─────────────────────────────────────────────────────────
-- EraBoard — Migration 2: 
-- Add view_count column to boards
-- Run in: Supabase Dashboard → SQL Editor
-- ─────────────────────────────────────────────────────────

ALTER TABLE public.boards ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;

-- Create index for sorting by popularity
CREATE INDEX IF NOT EXISTS boards_view_count_idx ON public.boards (view_count DESC NULLS LAST);

-- RPC function for atomic view count increment
CREATE OR REPLACE FUNCTION increment_view_count(p_board_id text)
RETURNS void AS $$
  UPDATE public.boards
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE board_id = p_board_id;
$$ LANGUAGE sql SECURITY DEFINER;

-- Grant execute to anon + authenticated
GRANT EXECUTE ON FUNCTION increment_view_count(text) TO anon, authenticated;


-- ============================================================
-- EraBoard — Migration 3 (RLS Fix Migration)
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ============================================================

-- ── 1. PROFILES: allow anyone to read public profile fields ──────────────────
-- Drop the restrictive owner-only read policy if it exists
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Allow anyone (anon + authenticated) to read profiles
CREATE POLICY "profiles_public_read"
  ON public.profiles
  FOR SELECT
  USING (true);

-- Keep owner-only UPDATE (don't change this)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

CREATE POLICY "profiles_owner_update"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Keep owner-only INSERT (triggered on signup)
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;

CREATE POLICY "profiles_owner_insert"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);


-- ── 2. BOARDS: make sure anon can read all public boards ─────────────────────
-- Drop any overly restrictive select policies
DROP POLICY IF EXISTS "Public boards are viewable by everyone" ON public.boards;
DROP POLICY IF EXISTS "boards_select_public" ON public.boards;
DROP POLICY IF EXISTS "Anyone can view public boards" ON public.boards;

-- Allow anyone to read boards where is_public = true
CREATE POLICY "boards_public_read"
  ON public.boards
  FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

-- Allow anon insert (quiz results saved before login)
DROP POLICY IF EXISTS "boards_anon_insert" ON public.boards;
DROP POLICY IF EXISTS "Anyone can insert boards" ON public.boards;

CREATE POLICY "boards_anon_insert"
  ON public.boards
  FOR INSERT
  WITH CHECK (true);

-- Owner can update/delete their own boards
DROP POLICY IF EXISTS "boards_owner_update" ON public.boards;
DROP POLICY IF EXISTS "boards_owner_delete" ON public.boards;

CREATE POLICY "boards_owner_update"
  ON public.boards
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "boards_owner_delete"
  ON public.boards
  FOR DELETE
  USING (auth.uid() = user_id);


-- ── 3. Make sure RLS is actually enabled on both tables ──────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;


-- ── 4. Grant SELECT to anon role (needed for unauthenticated reads) ──────────
GRANT SELECT ON public.profiles TO anon;
GRANT SELECT ON public.boards TO anon;
GRANT SELECT ON public.profiles TO authenticated;
GRANT SELECT ON public.boards TO authenticated;


-- ── 5. Verify — run these SELECTs after applying to confirm ─────────────────
-- SELECT username, display_name FROM public.profiles LIMIT 5;
-- SELECT board_id, aesthetic_name, profiles(username) FROM public.boards WHERE is_public = true LIMIT 5;


-- ============================================================
-- EraBoard — Migration 4 (RLS Fix Migration)
-- Custom Avatar Migration
-- ============================================================


-- Add avatar_type to profiles
-- NULL = using Google OAuth avatar (default)
-- One of: 'cottagecore' | 'darkacademia' | 'y2k' | 'softgirl' | 'ethereal' | 'grunge' | 'coquette'
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_type text DEFAULT NULL;

-- Optional: add a check constraint so only valid values are stored
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_avatar_type_check
  CHECK (
    avatar_type IS NULL OR
    avatar_type IN ('cottagecore', 'darkacademia', 'y2k', 'softgirl', 'ethereal', 'grunge', 'coquette')
  );