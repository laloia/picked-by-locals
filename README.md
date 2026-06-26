# Treasure Coast Dogs

A directory site for dog-friendly beaches, restaurants, and parks on Florida's Treasure Coast (Martin, St. Lucie, Indian River counties).

## Stack
- **Next.js 14** (App Router) — frontend + SSR for SEO
- **Supabase** (Postgres + PostGIS + Storage + Auth) — database, geospatial queries, photo storage
- **Mapbox GL JS** — interactive map view

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a free Supabase project at https://supabase.com, then run the schema:
   - Open the SQL editor in your Supabase dashboard
   - Paste and run `supabase/schema.sql`

3. Create a free Mapbox account at https://mapbox.com and grab a public access token.

4. Copy `.env.example` to `.env.local` and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```

5. Run the dev server:
   ```bash
   npm run dev
   ```

6. Visit http://localhost:3000

## Project structure

```
app/
  page.tsx              # Homepage — search + featured places
  map/page.tsx           # Browse/map view with filters
  places/[id]/page.tsx    # Individual place detail page
  submit/page.tsx         # Submit-a-place form (Phase 2 — stubbed)
lib/
  supabase.ts             # Supabase client setup
  types.ts                # TypeScript types matching the DB schema
components/
  PlaceCard.tsx            # Reusable listing card
supabase/
  schema.sql               # Full DB schema (places table + PostGIS)
```

## What's stubbed vs. real

This scaffold gives you:
- ✅ Working DB schema with PostGIS for "near me" queries
- ✅ Homepage, map page, and detail page wired to fetch from Supabase
- ✅ A place card component
- 🚧 Submit-a-place form (UI only, no auth/moderation yet — add Supabase Auth when ready)
- 🚧 No seed data yet — you'll add real listings via the Supabase table editor or a seed script

## Next steps once running
1. Add 10–20 real listings manually via Supabase's table editor to test the UI
2. Wire up the Mapbox map on `/map` with markers from your data
3. Add category/county filters
4. Consider Supabase Auth once you want public submissions
