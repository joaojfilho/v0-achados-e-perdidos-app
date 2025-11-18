-- Create profiles table for user information
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  telefone text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- Profile policies
create policy "profiles_select_all"
  on public.profiles for select
  using (true); -- Anyone can view profiles

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);

-- Create categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  nome text not null unique,
  created_at timestamp with time zone default now()
);

alter table public.categories enable row level security;

-- Category policies (read-only for users)
create policy "categories_select_all"
  on public.categories for select
  using (true);

-- Insert default categories
insert into public.categories (nome) values
  ('Documentos'),
  ('Eletrônicos'),
  ('Chaves'),
  ('Carteira'),
  ('Celular'),
  ('Bolsa/Mochila'),
  ('Roupas'),
  ('Joias/Acessórios'),
  ('Animais de Estimação'),
  ('Outros')
on conflict (nome) do nothing;

-- Create lost_items table
create table if not exists public.lost_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  descricao text not null,
  categoria_id uuid references public.categories(id),
  local_perdido text not null,
  data_perdido date not null,
  imagem_url text,
  status text not null default 'perdido' check (status in ('perdido', 'encontrado', 'resolvido')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.lost_items enable row level security;

-- Lost items policies
create policy "lost_items_select_all"
  on public.lost_items for select
  using (true); -- Anyone can view lost items

create policy "lost_items_insert_own"
  on public.lost_items for insert
  with check (auth.uid() = user_id);

create policy "lost_items_update_own"
  on public.lost_items for update
  using (auth.uid() = user_id);

create policy "lost_items_delete_own"
  on public.lost_items for delete
  using (auth.uid() = user_id);

-- Create found_items table
create table if not exists public.found_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  descricao text not null,
  categoria_id uuid references public.categories(id),
  local_encontrado text not null,
  data_encontrado date not null,
  imagem_url text,
  status text not null default 'disponivel' check (status in ('disponivel', 'devolvido')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.found_items enable row level security;

-- Found items policies
create policy "found_items_select_all"
  on public.found_items for select
  using (true); -- Anyone can view found items

create policy "found_items_insert_own"
  on public.found_items for insert
  with check (auth.uid() = user_id);

create policy "found_items_update_own"
  on public.found_items for update
  using (auth.uid() = user_id);

create policy "found_items_delete_own"
  on public.found_items for delete
  using (auth.uid() = user_id);

-- Create matches table to track potential matches between lost and found items
create table if not exists public.matches (
  id uuid primary key default gen_random_uuid(),
  lost_item_id uuid references public.lost_items(id) on delete cascade,
  found_item_id uuid references public.found_items(id) on delete cascade,
  notified boolean default false,
  created_at timestamp with time zone default now(),
  unique(lost_item_id, found_item_id)
);

alter table public.matches enable row level security;

-- Matches policies
create policy "matches_select_all"
  on public.matches for select
  using (true);

create policy "matches_insert_authenticated"
  on public.matches for insert
  with check (auth.uid() is not null);
