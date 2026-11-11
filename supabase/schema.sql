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

-- ---------------------------------------------------------------------------
-- Admin stats and feedback (added later; safe to run again).
-- usage_events holds ONLY which ability ran (e.g. "weather"), never what anyone said.
-- Signed-in users can add their own rows but cannot read any; admins read them through the server (service key).
-- ---------------------------------------------------------------------------
create table if not exists public.usage_events (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  ability    text not null,
  lang       text,
  created_at timestamptz not null default now()
);
create index if not exists usage_events_created_at_idx on public.usage_events (created_at);
alter table public.usage_events enable row level security;
drop policy if exists "insert own usage" on public.usage_events;
create policy "insert own usage" on public.usage_events for insert with check (auth.uid() = user_id);

create table if not exists public.feedback (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  message    text not null check (char_length(message) <= 1000),
  created_at timestamptz not null default now()
);
alter table public.feedback enable row level security;
drop policy if exists "insert own feedback" on public.feedback;
create policy "insert own feedback" on public.feedback for insert with check (auth.uid() = user_id);
