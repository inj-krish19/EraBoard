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