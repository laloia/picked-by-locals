"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { supabase } from "@/lib/supabase";
import { Place, PlaceCategory } from "@/lib/types";

const CATEGORIES: PlaceCategory[] = [
  "beach",
  "restaurant",
  "park",
  "coffee_shop",
  "brewery",
];

const DEFAULT_CENTER: [number, number] = [-80.35, 27.2];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | "all">(
    "all"
  );

  // Init map once
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: DEFAULT_CENTER,
      zoom: 9,
    });
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Fetch places whenever the filter changes
  useEffect(() => {
    async function fetchPlaces() {
      let query = supabase.from("places_with_coords").select("*")
        .eq("county", "martin");
      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }
      const { data, error } = await query;
      if (error) {
        console.error(error);
        return;
      }
      setPlaces((data as Place[]) ?? []);
    }
    fetchPlaces();
  }, [activeCategory]);

  // Add markers when places change
  useEffect(() => {
    if (!mapRef.current) return;
    const markers: mapboxgl.Marker[] = [];

    places.forEach((place: any) => {
      const coords =
        typeof place.lng === "number" && typeof place.lat === "number"
          ? ([place.lng, place.lat] as [number, number])
          : null;
      if (!coords) return;

      const popupHtml = `
        <div style="max-width: 280px; font-size: 13px;">
          <strong style="font-size: 15px; display: block; margin-bottom: 8px;">
            <a href="/places/${place.id}" style="color: #1d9e75; text-decoration: none;">
              ${place.name}
            </a>
          </strong>
          <p style="margin: 0 0 8px 0; line-height: 1.4;">${place.dog_policy}</p>
          ${place.hours ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Hours:</strong> ${place.hours}</p>` : ""}
          ${place.phone ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Phone:</strong> <a href="tel:${place.phone}">${place.phone}</a></p>` : ""}
          ${place.website ? `<p style="margin: 4px 0; font-size: 12px;"><strong>Website:</strong> <a href="${place.website}" target="_blank" rel="noreferrer">Visit</a></p>` : ""}
          <a href="/places/${place.id}" style="display: inline-block; margin-top: 8px; padding: 6px 12px; background: #1d9e75; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">
            View full details
          </a>
        </div>
      `;

      const marker = new mapboxgl.Marker({ color: "#1d9e75" })
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup({ offset: 24 }).setHTML(popupHtml))
        .addTo(mapRef.current!);

      markers.push(marker);
    });

    return () => markers.forEach((m) => m.remove());
  }, [places]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <button
          onClick={() => setActiveCategory("all")}
          style={{
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid #ccc",
            background: activeCategory === "all" ? "#1d9e75" : "white",
            color: activeCategory === "all" ? "white" : "inherit",
            cursor: "pointer",
          }}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #ccc",
              background: activeCategory === cat ? "#1d9e75" : "white",
              color: activeCategory === cat ? "white" : "inherit",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {cat === "coffee_shop" ? "Coffee" : cat}
          </button>
        ))}
      </div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: 500, borderRadius: 12 }}
      />
    </div>
  );
}