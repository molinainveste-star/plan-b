-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  bio text,
  location text,
  niche text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create metrics table
create table public.metrics (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) not null,
  label text not null,
  value text not null,
  trend text,
  trend_direction text check (trend_direction in ('up', 'down', 'neutral')),
  icon text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.metrics enable row level security;

create policy "Metrics are viewable by everyone."
  on metrics for select
  using ( true );

create policy "Users can update own metrics."
  on metrics for all
  using ( auth.uid() = profile_id );

-- Create social accounts table
create table public.social_accounts (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) not null,
  platform text not null,
  handle text not null,
  url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.social_accounts enable row level security;

create policy "Social accounts are viewable by everyone."
  on social_accounts for select
  using ( true );

create policy "Users can update own social accounts."
  on social_accounts for all
  using ( auth.uid() = profile_id );
