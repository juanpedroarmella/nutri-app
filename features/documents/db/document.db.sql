create table documents (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  url text not null,
  s3_key text not null,
  size integer not null,
  type text not null,
  is_public boolean default false,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Políticas RLS
alter table documents enable row level security;

create policy "Documents are viewable by admin and owner"
  on documents for select
  using (
    auth.role() = 'admin' or
    user_id = auth.uid() or
    is_public = true
  );

create policy "Documents are insertable by admin"
  on documents for insert
  with check (auth.role() = 'admin');

create policy "Documents are deletable by admin"
  on documents for delete
  using (auth.role() = 'admin');