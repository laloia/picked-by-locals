-- Treasure Coast Dogs — database schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

-- Enable PostGIS for geospatial queries (find places near a point)
create extension if not exists postgis;

create type place_category as enum (
  'beach',
  'restaurant',
  'park',
  'trail',
  'hotel',
  'shop',
  'brewery'
);

create type county_name as enum (
  'martin',
  'st_lucie',
  'indian_river'
);

create table places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category place_category not null,
  county county_name not null,
  address text not null,
  -- PostGIS point for geospatial queries; lng/lat order
  location geography(point) not null,

  description text,

  -- Dog-specific fields — the core value of the site
  dog_policy text not null,
  leash_required boolean,
  size_restrictions text,
  water_access text,
  fenced boolean,
  fee text,

  -- Practical info
  hours text,
  phone text,
  website text,

  -- Trust signals
  last_verified_date date,
  source text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table place_photos (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references places(id) on delete cascade,
  url text not null,
  caption text,
  sort_order int default 0
);

-- Spatial index — makes "find places within N miles" queries fast
create index places_location_idx on places using gist (location);

-- Helper function: find places within a given radius (meters) of a point
create or replace function places_near(
  lng float,
  lat float,
  radius_meters float default 16093 -- ~10 miles
)
returns setof places
language sql
stable
as $$
  select *
  from places
  where st_dwithin(
    location,
    st_setsrid(st_makepoint(lng, lat), 4326)::geography,
    radius_meters
  )
  order by location <-> st_setsrid(st_makepoint(lng, lat), 4326)::geography;
$$;

-- Row Level Security — public can read, only authenticated/admin can write
-- (Tighten this once you add Supabase Auth for submissions)
alter table places enable row level security;
create policy "Public read access" on places for select using (true);

alter table place_photos enable row level security;
create policy "Public read access photos" on place_photos for select using (true);
