create table if not exists store_locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  pincode text not null,
  address text not null,
  phone text,
  lat double precision,
  lng double precision,
  google_maps_url text,
  rating double precision default 4.5,
  hours text,
  products text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table store_locations enable row level security;

-- Create policies

-- Everyone can view store locations (public)
create policy "Public locations are viewable by everyone"
  on store_locations for select
  using ( true );

-- Only admins can insert/update/delete (assuming you have an auth setup where admins can be distinguished, or for now, authenticated users can edit if that fits your model. 
-- For strict admin-only, additional setup is needed. Here we'll allow authenticated users to simulate admin for simplicity, or just public read-only and service_role write if manually managing via dashboard)
-- For this user request context, let's assume authenticated users (admins) can manage it.

create policy "Admins can insert locations"
  on store_locations for insert
  with check ( auth.role() = 'authenticated' );

create policy "Admins can update locations"
  on store_locations for update
  using ( auth.role() = 'authenticated' );

create policy "Admins can delete locations"
  on store_locations for delete
  using ( auth.role() = 'authenticated' );
