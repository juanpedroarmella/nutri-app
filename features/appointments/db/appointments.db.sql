create table appointments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id) not null,
  id_auth uuid references auth.users(id) not null,
  date date not null,
  time time not null,
  is_first_consultation boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);