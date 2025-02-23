create table weight_tracking (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  weight numeric not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);