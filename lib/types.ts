export type PlaceCategory = "beach" | "restaurant" | "park" | "brewery" | "coffee_shop";

export type CountyName = "martin" | "st_lucie" | "indian_river";
export type RegionName = "treasure_coast";

export interface Place {
  id: string;
  name: string;
  category: PlaceCategory;
  county: CountyName;
  region: RegionName; 
  address: string;
  logo_url?: string;

  // Supabase returns geography as GeoJSON when selected with ->> or via RPC
  location: { type: "Point"; coordinates: [number, number] } | string;

  description: string | null;

  dog_policy: string;
  leash_required: boolean | null;
  dogs_allowed_indoors?: boolean;
  size_restrictions: string | null;
  water_access: string | null;
  fenced: boolean | null;
  fee: string | null;

  hours: string | null;
  phone: string | null;
  website: string | null;

  last_verified_date: string | null;
  source: string | null;

  created_at: string;
  updated_at: string;
  lng?: number;  // Add this
  lat?: number;  // Add this
  featured?: boolean;  // Add this line
}

export interface PlacePhoto {
  id: string;
  place_id: string;
  url: string;
  caption: string | null;
  sort_order: number;
}
