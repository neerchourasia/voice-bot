-- Run this once in Supabase: SQL Editor > New query > paste > Run.
-- One row per signed-in user, holding their notes, to-dos, reminders and settings.

create table if not exists public.user_data (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  notes      jsonb not null default '[]'::jsonb,
  todo       jsonb not null default '[]'::jsonb,
  reminders  jsonb not null default '[]'::jsonb,
  settings   jsonb not null default '{}'::jsonb,
  memory     jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Already ran an earlier version of this file? Add the new column (safe to run again):
alter table public.user_data add column if not exists memory jsonb not null default '{}'::jsonb;

-- Row-level security: each person can only ever read or change their own row.
alter table public.user_data enable row level security;

drop policy if exists "read own row" on public.user_data;
create policy "read own row" on public.user_data
  for select using (auth.uid() = user_id);

drop policy if exists "insert own row" on public.user_data;
create policy "insert own row" on public.user_data
  for insert with check (auth.uid() = user_id);

drop policy if exists "update own row" on public.user_data;
create policy "update own row" on public.user_data
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
