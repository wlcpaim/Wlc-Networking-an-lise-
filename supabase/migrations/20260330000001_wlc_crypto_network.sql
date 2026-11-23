create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  likes_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  coin_id text not null,
  symbol text not null,
  amount numeric not null,
  buy_price numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.ai_insights (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  prompt text not null,
  response text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.portfolios enable row level security;
alter table public.ai_insights enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

create policy "Posts are viewable by everyone." on public.posts for select using (true);
create policy "Users can insert their own posts." on public.posts for insert with check (auth.uid() = user_id);

create policy "Portfolios viewable by owner." on public.portfolios for select using (auth.uid() = user_id);
create policy "Portfolios insert by owner." on public.portfolios for insert with check (auth.uid() = user_id);

create policy "AI insights viewable by owner." on public.ai_insights for select using (auth.uid() = user_id);
create policy "AI insights insert by owner." on public.ai_insights for insert with check (auth.uid() = user_id);
