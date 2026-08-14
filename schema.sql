-- Run in Supabase SQL editor

create table leadership (
  id text primary key,
  name text not null,
  role text not null,
  title text not null,
  motto text not null,
  badge text not null,
  avatar text not null,
  sort_order int default 0
);

create table knights (
  id text primary key,
  name text not null,
  nickname text not null,
  squad text not null,
  role text not null,
  motto text not null,
  avatar text not null,
  rpg_stats jsonb not null default '{}',
  sort_order int default 0
);

create table gallery (
  id text primary key,
  title text not null,
  category text not null,
  image text not null,
  description text not null,
  sort_order int default 0
);

-- Public read, no public write (writes go through /api/* with service key)
alter table leadership enable row level security;
alter table knights enable row level security;
alter table gallery enable row level security;

create policy "public read" on leadership for select using (true);
create policy "public read" on knights for select using (true);
create policy "public read" on gallery for select using (true);
