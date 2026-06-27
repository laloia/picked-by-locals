"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Place, PlaceCategory } from "@/lib/types";
import PlaceCard from "./PlaceCard";

const CATEGORIES: PlaceCategory[] = [
  "beach",
  "restaurant",
  "park",
  "coffee_shop",
  "brewery",
];

export default function PlacesDirectory() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") as PlaceCategory | null;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [places, setPlaces] = useState<Place[]>([]);
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | "all">(
    categoryFromUrl || "all"
  );

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
      // Scroll using window.scrollTo
      setTimeout(() => {
        if (containerRef.current) {
          const yOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: yOffset, behavior: "smooth" });
        }
      }, 200);
    }
  }, [categoryFromUrl]);

  // Fetch places whenever the filter changes
  useEffect(() => {
    async function fetchPlaces() {
      let query = supabase
        .from("places_with_coords")
        .select("*")
        .eq("county", "martin")
        .order("name", { ascending: true });
      
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

  return (
    <div ref={containerRef}>
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
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {places.length === 0 && (
        <p style={{ textAlign: "center", opacity: 0.6 }}>
          No places found in this category.
        </p>
      )}
    </div>
  );
}